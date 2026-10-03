<!-- Source: https://omg.engineering/bsites_services/themes/assets/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Assets

Theme assets, compilable `.liquid` assets, and asset filters.

## Asset folder

Files in `assets/` are served as theme static resources. The `assets/` folder is required for theme installation.

| File type | Behavior |
| --- | --- |
| `.css`, `.js`, images | Served directly |
| `.css.liquid`, `.js.liquid` | Processed through Liquid before serving |
| Other extensions | Served as-is |

## Referencing assets in templates

```
<link rel="stylesheet" href="{{ 'style.css' | asset_url }}">
<script src="{{ 'app.js' | asset_url }}"></script>
<img src="{{ 'logo.png' | asset_url }}" alt="Logo">

{{ 'style.css' | stylesheet_tag }}
{{ 'app.js' | script_tag }}
{{ 'logo.png' | img_tag: 'Logo' }}
```

`asset_url` and `asset_path` are aliases — both resolve to the theme asset URL.

## Compilable assets (`.liquid` assets)

Assets with a `.liquid` extension are compiled when the theme is installed or updated:

```
assets/style.css.liquid  →  compiled CSS served as style.css
assets/theme.js.liquid   →  compiled JS served as theme.js
```

### Available in compilable assets

| Available | Not available |
| --- | --- |
| `settings` | Page variables (`product`, `order`, etc.) |
| `{% render %}` / `{% include %}` of other asset partials | `{% form %}` and request-only tags |
| `asset_url` / `asset_path` | Layout/template context |
| `stylesheet_url`, `image_url`, `javascript_url` |  |
| Formatting filters (`money`, `json`, etc.) |  |

Example (invented setting keys):

```
/* assets/variables.css.liquid */
:root {
  --brand-color: {{ settings.brand_color }};
  --font-family: {{ settings.body_font }};
}

.btn-primary {
  background-color: var(--brand-color);
}
```

## Global CDN assets

Some filters resolve **platform-global** assets (not theme files):

| Filter | Use for |
| --- | --- |
| `stylesheet_url` | Shared platform stylesheets |
| `image_url` | Shared platform images |
| `javascript_url` | Shared platform scripts |

Use `asset_url` for theme-specific files; use `stylesheet_url` / `image_url` / `javascript_url` for shared platform resources.

## Filter reference

| Filter | Output |
| --- | --- |
| `asset_url` / `asset_path` | Theme asset URL |
| `stylesheet_tag` | `<link rel="stylesheet">` HTML |
| `script_tag` | `<script src="...">` HTML |
| `img_tag` | `<img>` HTML |
| `stylesheet_url` | Global CDN stylesheet URL |
| `image_url` | Global CDN image URL |
| `javascript_url` | Global CDN script URL |

Blank paths return empty string.

## Theme designer preview

When previewing in the theme designer, temporary asset uploads may be shown before publishing. Live storefronts serve the published assets only.

## Related docs

-   [settings-in-templates.md](settings-in-templates.md) — settings in compilable assets
-   [filters/index.md](filters.md) — full filter reference
