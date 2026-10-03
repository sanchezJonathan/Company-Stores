<!-- Source: https://omg.engineering/bsites_services/themes/settings-in-templates/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Settings in Templates

How to use theme settings in your Liquid templates.

## Accessing settings

`settings` is available on **every page**:

```
{{ settings.primary_color }}
{{ settings.header_logo }}

{% if settings.show_featured_products %}
  {% render 'featured_products' %}
{% endif %}
```

Setting key names are defined by you in `config/settings.html`.

## settings\_data.json shape

Runtime values are stored in `config/settings_data.json`:

```
{
  "current": "Default",
  "presets": {
    "Default": {
      "customer_layout": "theme",
      "primary_color": "#336699",
      "show_search": true
    },
    "Holiday": {
      "customer_layout": "theme",
      "primary_color": "#cc0000",
      "show_search": true
    }
  }
}
```

| Key | Purpose |
| --- | --- |
| `current` | Active preset name, or inline settings object |
| `presets` | Named setting bundles |

### Preset resolution

-   If `current` is a **preset name** (string) → uses that preset's values
-   If `current` is an **object** → uses those values directly
-   Missing preset → empty settings

## Boolean coercion

Checkbox settings work naturally in conditionals — `"true"` and `"false"` string values are treated as booleans:

```
{% if settings.enable_dark_mode %}
  <body class="dark">
{% else %}
  <body class="light">
{% endif %}
```

## Layout key

The setting `customer_layout` selects which layout wraps pages:

-   Value `"theme"` → `layout/theme.liquid`
-   Value `"minimal"` → `layout/minimal.liquid`

Defaults to `theme` when unset.

## Image settings

Image-type settings store the **theme asset file name** of an uploaded image. Resolve it to a URL with the `asset_url` filter, and guard against empty values:

```
{% if settings.header_logo != blank %}
  <img src="{{ settings.header_logo | asset_url }}" alt="{{ site.name }}">
{% endif %}
```

## Synthetic example

```
<style>
  :root {
    --primary: {{ settings.brand_color }};
    --text: {{ settings.body_text_color }};
  }
</style>

<header style="background: var(--primary)">
  {% if settings.header_logo %}
    <img src="{{ settings.header_logo }}" alt="{{ site.name }}">
  {% else %}
    <span>{{ site.name }}</span>
  {% endif %}
</header>
```

## Theme designer preview

When previewing unsaved changes in the theme designer, temporary setting values are applied so you can see edits before publishing. Live storefronts use the published `settings_data.json` only.

## Related docs

-   [settings-schema.md](settings-schema.md) — the `settings_schema.json` format and every supported control
-   [settings-authoring.md](settings-authoring.md) — legacy `config/settings.html` authoring
-   [assets.md](assets.md) — using settings in compilable `.liquid` assets
