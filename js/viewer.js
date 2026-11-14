'use strict';
(() => {
  const hero = document.querySelector('.hero');
  const viewer = document.querySelector('#shoe-viewer');
  const status = document.querySelector('#viewer-status');
  const controls = document.querySelector('.viewer-controls');
  const reset = document.querySelector('#reset-view');
  let state = 'loading';
  const isUA = () => document.documentElement.lang === 'uk';
  function translate() {
    const ua = isUA();
    status.textContent =
      state === 'error'
        ? ua
          ? '3D недоступне. Показуємо оригінальне зображення.'
          : '3D unavailable. Showing the original artwork.'
        : ua
          ? 'Завантажуємо 3D-кросівок…'
          : 'Loading your 3D sneaker…';
    document.querySelector('#viewer-hint').textContent = ua
      ? 'Перетягуй, щоб обертати · зведи пальці для масштабу'
      : 'Drag to rotate · pinch to zoom';
    reset.querySelector('span').textContent = ua ? 'Скинути ракурс' : 'Reset view';
    reset.title = ua ? 'Скинути ракурс' : 'Reset view';
    viewer.alt = ua
      ? 'Інтерактивний 3D-кросівок. Перетягуй для обертання або використовуй стрілки клавіатури.'
      : 'Interactive 3D sneaker. Drag to rotate; use arrow keys when focused.';
  }
  function fail() {
    if (state === 'ready') return;
    state = 'error';
    hero.classList.add('viewer-failed');
    translate();
  }
  viewer.addEventListener('load', () => {
    state = 'ready';
    hero.classList.remove('viewer-failed');
    hero.classList.add('has-3d');

    applyPalette(document.querySelector('[name=palette]:checked').value);
    controls.hidden = false;
  });
  viewer.addEventListener('error', fail);
  const palettes = {
    Aurora: { upper: '#405579', accent: '#d82ca5', lining: '#39cbd5', sole: '#c5e7ee' },
    Violet: { upper: '#593694', accent: '#a16adf', lining: '#ddbcff', sole: '#e9def6' },
    Sunset: { upper: '#bf4d84', accent: '#ef8b83', lining: '#ffc775', sole: '#f6e9d9' },
  };
  function applyPalette(name) {
    const palette = palettes[name];
    if (!palette || !viewer.model) return;
    viewer.model.materials.forEach((material) => {
      let colour = palette.upper;
      if (/ColoRawe_Swoosh|Fabric_Pattern_06/.test(material.name)) colour = palette.accent;
      else if (/Hex_fabric_Cloth|^Fabric$/.test(material.name)) colour = palette.lining;
      else if (/Material\.00[126]|Material\.010|Plane\.003/.test(material.name))
        colour = palette.sole;
      material.pbrMetallicRoughness.setBaseColorFactor(colour);
    });
    document.querySelector('#viewer-colour-name').textContent = name;
    document
      .querySelectorAll('[data-variant]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.variant === name)),
      );
  }
  document.querySelectorAll('[data-variant]').forEach((button) =>
    button.addEventListener('click', () => {
      applyPalette(button.dataset.variant);
      const input = document.querySelector(
        '[name=palette][value="' + button.dataset.variant + '"]',
      );
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }),
  );
  document
    .querySelectorAll('[name=palette]')
    .forEach((input) => input.addEventListener('change', () => applyPalette(input.value)));
  reset.addEventListener('click', () => {
    viewer.cameraOrbit = '-35deg 75deg 85%';
    viewer.fieldOfView = '30deg';
    viewer.resetTurntableRotation();
  });
  new MutationObserver(translate).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
  translate();
  // Pinned upstream module; its failure leaves the original hero intact.
  import('https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js').catch(
    fail,
  );
  setTimeout(() => {
    if (state === 'loading') fail();
  }, 45000);
})();
