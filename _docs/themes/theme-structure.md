<!-- Source: https://omg.engineering/bsites_services/themes/theme-structure/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Theme Structure

Platform requirements for theme folder layout and file types. Your theme's internal organization within these constraints is entirely up to you.

## Required folders

Theme upload validates that the zip contains all five top-level folders. Missing any folder causes installation to fail.

| Folder | Required | Purpose |
| --- | --- | --- |
| `assets/` | Yes | Static and compilable assets (CSS, JS, images) |
| `config/` | Yes | Theme configuration (`settings_data.json` required) |
| `layout/` | Yes | Page wrappers |
| `snippets/` | Yes | Reusable partials |
| `templates/` | Yes | Page-type templates |

## Required config files

| File | Required | Purpose |
| --- | --- | --- |
| `config/settings_data.json` | **Yes** | Runtime setting values (presets + current) |
| `config/settings_schema.json` | Recommended | Schema of configurable settings, read by the store admin designer. Ship it directly, or omit it and provide `settings.html` |
| `config/settings.html` | No\* | Legacy authoring source — parsed into `settings_schema.json` on demand when no schema file exists |

\* A theme needs **one** of `settings_schema.json` or `settings.html` for the designer to expose theme settings. Shipping `settings_schema.json` directly is the recommended path; see [settings-schema.md](settings-schema.md). `settings_data.json` is still required in all cases.

## File naming rules

| Location | Extension | Notes |
| --- | --- | --- |
| `templates/` | `.liquid` | One file per platform page type |
| `templates/account/` | `.liquid` | Account sub-pages |
| `templates/*.js.liquid` | `.js.liquid` | AJAX partial responses |
| `templates/sms/` | `.txt.liquid` | SMS text templates |
| `layout/` | `.liquid` | At least one layout (typically `theme.liquid`) |
| `snippets/` | `.liquid` | Snippet names are designer-defined |
| `assets/` | Any | `.css.liquid`, `.js.liquid` are compiled; others served as-is |
| Root | `thumbnail.jpg` | Optional preview image for theme gallery |

Hidden files (names starting with `.`) are skipped during installation.

## Platform templates

Every theme must provide template files for the page types the store uses. The platform does not ship default templates — your theme is the entire storefront UI.

See [pages/index.md](pages/index.md) for the complete list.

Common templates for a typical ecommerce store:

```
templates/
├── index.liquid
├── page.liquid
├── products.liquid
├── product.liquid
├── cart.liquid
├── checkout.liquid
├── order_confirmation.liquid
├── login.liquid
├── 404.liquid
├── unauthorized.liquid
└── account/
    ├── dashboard.liquid
    ├── register.liquid
    └── ...
```

Stores using bundles, gift certificates, wishlists, manager approval, or other features need the corresponding template files as well.

## Layout files

At minimum, provide a default layout referenced by `settings.customer_layout` (typically `layout/theme.liquid`). The platform falls back to `theme` when no layout key is set.

Additional layouts are allowed (e.g. `layout/blank.liquid` for minimal pages) — select them via the `customer_layout` setting.

## Installation flow

1.  Theme zip uploaded to store
2.  Platform validates folder structure and `settings_data.json`
3.  Files are installed on the store
4.  `.liquid` assets are compiled
5.  Theme is activated

See [settings-authoring.md](settings-authoring.md) for how settings schema is generated via the designer UI.

## What you control

| You define | Platform requires |
| --- | --- |
| Snippet names and count | `snippets/` folder must exist |
| Setting key names | `settings_data.json` must exist |
| Asset file names | `assets/` folder must exist |
| Visual design and CSS | Valid Liquid syntax |
| How templates compose snippets | Template files for active features |

## Related docs

-   [composition.md](composition.md) — how files work together
-   [settings-schema.md](settings-schema.md) — `settings_schema.json` format and supported controls
-   [settings-authoring.md](settings-authoring.md) — legacy `settings.html` format
-   [assets.md](assets.md) — asset compilation
