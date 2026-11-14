import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
export async function prepareAF1() {
  const gltf = await new GLTFLoader()
    .setMeshoptDecoder(MeshoptDecoder)
    .loadAsync(
      'https://raw.githubusercontent.com/hardikverma22/shoe-forge/bf58bac6cfb78e5ef3a79ca823f9b60bea861b9c/public/models/air-force-1.glb',
    );
  const diagnostics = [];
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((mesh) => {
    if (!mesh.isMesh) return;
    mesh.geometry.computeBoundingBox();
    const box = mesh.geometry.boundingBox;
    diagnostics.push({
      name: mesh.name,
      material: mesh.material.name,
      min: box.min.toArray(),
      max: box.max.toArray(),
      vertices: mesh.geometry.attributes.position.count,
    });
    if (mesh.material.name === 'Fine_leather_black') {
      const groups = components(mesh.geometry);
      document.querySelector('#shoe-viewer').dataset.components = JSON.stringify(
        groups.map((g, i) => ({ i, count: g.indices.length, min: g.min, max: g.max })),
      );
    }
    const material = mesh.material.clone();
    mesh.material = material;
    material.metalness = 0;
    material.roughness = 0.72;
    material.map = null;
    material.color.set('#546c92');
    if (
      ['Material.001', 'Material.002', 'Material.006', 'Material.010', 'Plane.003__0'].includes(
        material.name,
      )
    )
      material.color.set('#c5e7ee');
    if (['Fabric', 'Hex_fabric_Cloth'].includes(material.name)) material.color.set('#39d2db');
    if (material.name === 'Fabric_Pattern_06') material.color.set('#e13bb6');
    if (material.name === 'Material.004') material.color.set('#647c9e');
    if (material.name === 'Fine_leather_black') {
      const groups = components(mesh.geometry);
      const swoosh = material.clone();
      swoosh.name = 'ColoRawe_Swoosh';
      swoosh.color.set('#d82ca5');
      swoosh.roughness = 0.58;
      const indices = [];
      mesh.geometry.clearGroups();
      groups.forEach((group, index) => {
        const start = indices.length;
        indices.push(...group.indices);
        mesh.geometry.addGroup(start, group.indices.length, [6, 7].includes(index) ? 1 : 0);
      });
      mesh.geometry.setIndex(indices);
      mesh.material = [material, swoosh];
    }
  });
  document.querySelector('#shoe-viewer').dataset.meshes = JSON.stringify(diagnostics);
  const binary = await new GLTFExporter().parseAsync(gltf.scene, {
    binary: true,
    onlyVisible: true,
  });
  if (new URLSearchParams(location.search).has('build'))
    await fetch('/__save-af1', { method: 'POST', body: binary });
  return URL.createObjectURL(new Blob([binary], { type: 'model/gltf-binary' }));
}
function components(geometry) {
  const pos = geometry.attributes.position,
    idx = geometry.index;
  const n = pos.count,
    parent = Array.from({ length: n }, (_, i) => i);
  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  function union(a, b) {
    parent[find(a)] = find(b);
  }
  const at = (i) => (idx ? idx.getX(i) : i);
  const count = idx ? idx.count : n;
  const seen = new Map();
  for (let i = 0; i < n; i++) {
    const key = [pos.getX(i), pos.getY(i), pos.getZ(i)]
      .map((v) => Math.round(v * 100000))
      .join(',');
    if (seen.has(key)) union(i, seen.get(key));
    else seen.set(key, i);
  }
  for (let i = 0; i < count; i += 3) {
    union(at(i), at(i + 1));
    union(at(i), at(i + 2));
  }
  const map = new Map();
  for (let i = 0; i < count; i++) {
    const v = at(i),
      key = find(v);
    if (!map.has(key))
      map.set(key, {
        indices: [],
        min: [Infinity, Infinity, Infinity],
        max: [-Infinity, -Infinity, -Infinity],
      });
    const g = map.get(key);
    g.indices.push(v);
    [pos.getX(v), pos.getY(v), pos.getZ(v)].forEach((val, j) => {
      g.min[j] = Math.min(g.min[j], val);
      g.max[j] = Math.max(g.max[j], val);
    });
  }
  return [...map.values()].sort((a, b) => b.indices.length - a.indices.length);
}
