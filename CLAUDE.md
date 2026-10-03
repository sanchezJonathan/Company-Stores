# Company Stores themes

This repo holds Company Stores (OrderMyGear / BrightStores) Liquid storefront themes, one folder per store, e.g. `16901 - Harvey Webstore/36496-canary-minimal-grid/`.

## Theme documentation is the coding standard

All theme work must follow the official Company Stores Liquid Theme Documentation.

- Local copy (search this first): `_docs/themes/`. Start at `_docs/themes/AGENTS.md`, the golden rules and index.
- Live source: https://omg.engineering/bsites_services/themes/. If the local copy seems out of date or a page is missing, check the live site.
- Refresh the local copy: `cd _docs/_tools && npm install && node mirror-theme-docs.js`. Never hand-edit `_docs/themes/`.

Before editing a page type, read its page doc in `_docs/themes/pages/` for its template, variables, forms and feature gates. Check `forms/fields.md` before writing any form input, and `drops/`, `filters.md` and `tags.md` before using an object, filter or tag you haven't verified.

## Golden rules (summary of `_docs/themes/AGENTS.md`)

1. The platform provides the pages, objects and forms; the theme provides markup and styling. Each page type renders one fixed template file (see `_docs/themes/pages/index.md`).
2. This is not Shopify: no sections, blocks, `{% schema %}`, metafields or app extensions.
3. Every submission (cart, login, checkout step, product configuration) goes through `{% form 'name', ... %}`, with input `name` attributes exactly as listed in `forms/fields.md`. Some names differ from the form tag's namespace.
4. Reuse markup with `{% render 'snippet' %}`. `{% include %}` is legacy, so don't add new uses. Globals (`site`, `settings`, `order`, URL helpers) are visible inside `render`; page-local variables (`product`, `form`, ...) must be passed explicitly. Exception: `{% view_logos %}` requires `snippets/view_logos.liquid`.
5. Gate optional features with object helpers, e.g. `{% if product.virtual_samples_enabled? %}`.
6. Settings are defined in `config/settings.html` (the schema is generated on upload) and read with `{{ settings.key }}`. Keys are snake_case and unique; checkbox values are the strings `"true"`/`"false"`; image settings go through `asset_url`. See `settings-authoring.md` and `settings-in-templates.md`.
7. Themes need `assets/`, `config/`, `layout/`, `snippets/` and `templates/`, plus `config/settings_data.json`. The default layout is `layout/theme.liquid` with `{{ content_for_layout }}`. Reference assets with `{{ 'file' | asset_url }}`. `templates/*.js.liquid` are AJAX partials rendered without a layout.

## Theme Sync: local edits go live

Themes are synced to live stores with Theme Sync (`ts.exe`; see `theme-sync-git-workflow.md`). While it is connected, saving a file pushes it to the store, and switching git branches changes the synced files. Before switching branches or making bulk or destructive edits, check `git branch` and `git status` and confirm with the user. Start client work on a branch off `main`.
