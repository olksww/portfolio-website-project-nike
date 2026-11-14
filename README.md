# ColoRawe

Responsive custom-sneaker concept built with plain HTML, CSS and JavaScript. Original artwork and blue/purple visual identity are preserved.

## Run

Open this folder in VS Code and use Live Server, or run:

```sh
python -m http.server 8943 --bind 127.0.0.1
```

Then open http://127.0.0.1:8943.

## Features

- Responsive layout, mobile navigation, section anchors and active navigation states.
- English/Ukrainian translation; only the language preference is saved locally.
- Three colour palettes, EU size selection and a live selection summary.
- Required-field validation and an accessible request-preview dialog.
- FAQ disclosures, keyboard focus styles and reduced-motion support.

## Scope

This is a frontend concept, not a checkout. Request details are never sent or stored. There is no backend, payment integration or actual order submission. The original sample testimonials and contact addresses are retained; verify them before a production launch. Product photography is the original artwork, not a representation of all palette variants. Fonts are loaded from Google Fonts with system fallbacks.

## Interactive 3D hero

The hero upgrades to a real glTF sneaker after loading. Drag with a mouse or finger to orbit, use a mouse wheel or pinch to zoom, select a colourway, or reset the view. The original hero is retained as a loading/error fallback. Mobile gestures reserve vertical page scrolling.

The local model is **Air Force 1** by kirilldrac78 (kiria_d), licensed under CC BY 4.0. See models/CREDITS.md for provenance. Adaptations include separate swoosh materials, recolouring and lighting. Aurora preserves the original blue/pink/turquoise direction; Violet and Sunset offer alternatives. Hero and request-form palettes stay synchronized.

The GLB is local (about 1.5 MB). Internet access is required for the pinned @google/model-viewer 4.1.0 module from jsDelivr and Google Fonts. Run through HTTP/Live Server; no build or package installation is needed.

- css/viewer.css: responsive 3D stage and controls.
- js/viewer.js: loading/fallback, palette synchronization, reset and translated guidance.
- models/air-force-1.glb: adapted model.
- tools/prepare-af1.js: adaptation source, retained for provenance; not loaded by the site.

## Main files

- `index.html`: sections and form.
- `css/styles.css`: desktop/mobile styling.
- `js/app.js`: translations, navigation, selection and preview.
- `images/`: original project assets.

## GitHub Pages

1. Create a GitHub repository, for example `project-nike`.
2. Upload the contents of this project folder. `index.html` must be at the repository root. Keep the `css`, `js`, `images` and `models` folders.
3. Open Settings → Pages → Deploy from a branch. Choose `main` and `/ (root)`, then Save.
4. GitHub will show the published URL once deployment completes.

No build command is needed. All local assets use relative paths, including the 3D model. Keep the model attribution in the footer and `models/CREDITS.md`. Describe this portfolio piece as an independent frontend concept; the request form is a preview and does not submit orders.
