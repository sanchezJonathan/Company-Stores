<!-- Source: https://omg.engineering/bsites_services/themes/settings-schema/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Settings Schema (`settings_schema.json`)

The settings schema describes every configurable setting your theme exposes to store owners. The **store admin theme designer** reads this file and builds the settings editing UI from it — sections, checkboxes, color pickers, image uploads, and so on.

This page is the complete reference for the schema format and every control type the platform supports.

## Where the schema fits

```
settings_schema.json                ← describes available settings (structure only)
        ↓
Store admin theme designer          ← renders the editing form from the schema
        ↓
config/settings_data.json           ← stores the actual values (per preset)
        ↓
{{ settings.* }} in your templates  ← runtime access on every page
```

-   The **schema** defines _what can be configured_ (field names, labels, control types, sections).
-   The **data** file stores _what is configured_ (current values and named presets).
-   Templates only ever read values through `{{ settings.* }}` — see [settings-in-templates.md](settings-in-templates.md).

## Providing a schema for your theme

There are two supported ways to give the platform a schema:

1.  **Ship `config/settings_schema.json` in your theme zip (recommended).** The designer uses the file exactly as provided. You write and maintain the JSON yourself.
2.  **Ship `config/settings.html` instead.** When the designer first needs the schema and no `settings_schema.json` exists, the platform parses `settings.html` and generates `settings_schema.json` from it. This is the legacy authoring path — see [settings-authoring.md](settings-authoring.md) for the HTML patterns.

If a theme ships **both** files, the bundled `settings_schema.json` wins — the platform never regenerates a schema file that already exists.

Warning

If a theme has neither `settings_schema.json` nor `settings.html`, the designer cannot load theme settings. The theme still renders with the values already present in `settings_data.json`.

## Top-level structure

The schema is a **JSON array of sections**:

```
[
  {
    "title": "Colors",
    "form": [ /* field objects */ ],
    "children": [ /* nested sections, same shape */ ]
  },
  {
    "title": "Header",
    "form": [ /* ... */ ],
    "children": []
  }
]
```

| Key | Type | Meaning |
| --- | --- | --- |
| `title` | string | Section name shown in the designer |
| `form` | array | Field (control) objects in this section |
| `children` | array | Nested sub-sections — same `{title, form, children}` shape, nestable to any depth |

A section may have an empty `form` and only `children` (a pure grouping node), or fields only.

## Field objects

Every control in a `form` array is an object with a `type` key. The platform supports exactly the types listed below — nothing else is rendered by the designer.

### Common keys

| Key | Present on | Meaning |
| --- | --- | --- |
| `type` | all fields | Control type (see below) |
| `label.name` | inputs | **The setting key** — becomes `{{ settings.<name> }}` |
| `label.text` | inputs | Human-readable label shown to the store owner |
| `input.name` | `text_input`, `checkbox`, `color`, `image` | The setting key (same as `label.name`) |
| `select.name` / `textarea.name` / `font.name` | respective types | The setting key |
| `help` | most fields | `{ "title": ..., "text": ... }` tooltip, or `null` |

Setting keys must be unique across the whole schema. Keys are plain strings, so prefer `snake_case` names without spaces.

### `text_input` — single-line text

```
{
  "type": "text_input",
  "label": { "name": "footer_text", "text": "Footer text" },
  "input": { "name": "footer_text" },
  "help": null
}
```

Use for short strings: headings, button labels, phone numbers, tracking IDs. The runtime value is a string (empty string when never set).

### `checkbox` — on/off toggle

```
{
  "type": "checkbox",
  "label": { "name": "show_search", "text": "Show search bar" },
  "input": { "name": "show_search" },
  "help": null
}
```

Use for feature toggles. At runtime the value is the string `"true"` / `"false"`; Liquid conditionals treat these correctly:

```
{% if settings.show_search %} ... {% endif %}
```

### `color` — color picker

```
{
  "type": "color",
  "label": { "name": "primary_color", "text": "Primary color" },
  "input": { "name": "primary_color" },
  "help": null
}
```

The runtime value is a CSS color string (e.g. `#336699`). Use it directly in styles, including compilable `.liquid` assets.

### `image` — image upload

```
{
  "type": "image",
  "label": { "name": "logo_image", "text": "Logo image" },
  "input": { "name": "logo_image" },
  "help": null
}
```

The designer uploads the image as a **theme asset**. The runtime value is the asset's file name — resolve it with the `asset_url` filter:

```
{% if settings.logo_image != blank %}
  <img src="{{ settings.logo_image | asset_url }}" alt="{{ site.name }}">
{% endif %}
```

Note

For image settings, the setting key doubles as the asset name (extensions included, e.g. `favicon.png`). Guard with `!= blank` — stores that never upload the image have an empty value.

### `textarea` — multi-line text

```
{
  "type": "textarea",
  "label": { "name": "custom_css", "text": "Custom CSS" },
  "textarea": { "name": "custom_css" },
  "help": null
}
```

Use for longer content: custom CSS blocks, announcement text, embedded snippets of HTML/JS.

### `select` — dropdown

```
{
  "type": "select",
  "label": { "name": "products_per_row", "text": "Products per row" },
  "select": {
    "name": "products_per_row",
    "options": [
      { "value": "3", "label": "3 columns" },
      { "value": "4", "label": "4 columns" }
    ]
  },
  "help": null
}
```

`options` is an ordered array of `{ "value", "label" }` pairs. The runtime value is the chosen option's `value` string. Use selects for enumerated choices: column counts, positions, image-fit modes, layout variants.

### `font` — font family picker

```
{
  "type": "font",
  "label": { "name": "heading_font", "text": "Heading font" },
  "font": {
    "name": "heading_font",
    "options": [
      { "value": "inherit", "label": "Use Site Font" },
      { "value": "'Lato', Helvetica, Arial, sans-serif", "label": "Lato" }
    ]
  },
  "size": null,
  "help": null
}
```

The runtime value is a full CSS `font-family` string — use it straight in CSS:

```
h1, h2 { font-family: {{ settings.heading_font }}; }
```

**Optional paired font size.** A font field may carry a second, related setting for the size, exposed under `size`:

```
"size": {
  "name": "heading_font_size",
  "options": [
    { "value": "14px", "label": "14px" },
    { "value": "16px", "label": "16px" }
  ]
}
```

This produces one additional setting key (`heading_font_size` in the example). The designer renders both controls together.

### `tips` — help text (not a setting)

```
{
  "type": "tips",
  "tips": [
    "These settings control the homepage slideshow.",
    "Leave a field empty to use the default."
  ]
}
```

`tips` renders explanatory text inside a section. It creates **no setting key** and produces no value.

### `table` — grid of settings

```
{
  "type": "table",
  "head": [
    { "type": "text", "text": "Label", "help": null },
    { "type": "text", "text": "Enabled", "help": null }
  ],
  "body": [
    [
      { "type": "label", "label": { "name": "badge_new_text", "text": "\"New\" badge" } },
      { "type": "checkbox", "input": { "name": "badge_new_enabled" } }
    ]
  ]
}
```

A `table` lays fixed rows out in columns. Body cells can be:

| Cell `type` | Meaning |
| --- | --- |
| `label` | Row label with a setting key (`label.name`) |
| `text` | Static text (no setting) |
| `checkbox` / `text_input` / `image` | An input cell with `input.name` as the setting key |

Use tables when several related settings form a natural grid (e.g. a row per badge with an enable toggle and a label).

### `formlist` — repeating group of items

```
{
  "type": "formlist",
  "children": [
    {
      "title": "Slide 1",
      "form": [
        { "type": "image", "label": { "name": "hero_1_image", "text": "Slide 1 image" }, "input": { "name": "hero_1_image" }, "help": null },
        { "type": "text_input", "label": { "name": "hero_1_title", "text": "Slide 1 title" }, "input": { "name": "hero_1_title" }, "help": null },
        { "type": "checkbox", "label": { "name": "hero_1_show", "text": "Show?" }, "input": { "name": "hero_1_show" }, "help": null }
      ]
    },
    { "title": "Slide 2", "form": [ /* same shape, hero_2_* keys */ ] }
  ]
}
```

A `formlist` is a fixed-length list of item groups — classically used for slideshows, social icon lists, and custom link lists. Each child has a `title` and its own `form` array. Items are positional and finite: declare one child per item (Slide 1…Slide N), each with its own setting keys (`hero_1_*`, `hero_2_*`, …). The designer renders each child as one repeatable block.

## Help tooltips

Any field can carry a `help` object:

```
"help": {
  "title": "Main container width",
  "text": "This is the width of the main section of the site."
}
```

The designer shows it as a small question-mark tooltip next to the control. Use tooltips to explain non-obvious settings (expected formats, units, interactions with other settings).

In the legacy `settings.html` path, tooltips come from a `.question-icon` element with `data-title` / `data-content` attributes; inline italic hints inside a `<label>` are folded into the label text as `(hint)`.

## What is NOT supported

The designer renders only the ten field types above. The following common control types have **no platform support** and must not appear in a schema:

-   Radio button groups (use a `select` instead)
-   Range / number sliders (use a `select` of predefined values or a `text_input`)
-   Numeric inputs with validation (use `text_input`; store values like `"1200px"`)
-   URL / page / product pickers (use `text_input` and type the URL manually)
-   Rich text editors (use `textarea`)
-   Unlimited repeaters / dynamic blocks (use a fixed `formlist` or `table`)

When the platform generates a schema from `settings.html`, any row it does not recognize is silently skipped. When you author `settings_schema.json` directly, unknown `type` values simply produce no control in the designer.

## Values at runtime

Schema fields define keys; values live in `config/settings_data.json`:

```
{
  "current": "Default",
  "presets": {
    "Default": {
      "customer_layout": "theme",
      "primary_color": "#336699",
      "show_search": true,
      "logo_image": "logo.png"
    }
  }
}
```

Resolution rules:

-   `current` is a **preset name** → that preset's values are used.
-   `current` is an **object** → those values are used directly (this is how designer edits are stored — under the implicit `current` preset).
-   Missing preset → empty settings.

Runtime value types:

| Field type | Runtime value |
| --- | --- |
| `text_input`, `textarea`, `select`, `color`, `font` | string |
| `checkbox` | `"true"` / `"false"` string — works directly in `{% if %}` |
| `image` | theme asset file name — resolve with `\| asset_url` |
| `tips` | no value |
| `table` / `formlist` | no own value — their individual cells/items produce the settings |

### The special `customer_layout` setting

One key has platform-defined behavior: `customer_layout` selects which layout file wraps storefront pages (`"theme"` → `layout/theme.liquid`). It defaults to `theme` when unset. Include it in your presets if your theme ships multiple layouts. See [settings-in-templates.md](settings-in-templates.md).

## Presets

Presets are named bundles of setting values — for example `Default` and `Holiday`. Store owners switch presets in the designer; switching swaps the whole value set. Preset names and the keys inside them are entirely theme-defined. Ship at least one preset and point `current` at it.

## Authoring checklist

1.  Decide your sections and keys first — keys are permanent once stores use them.
2.  Use the simplest control that works (`select` over free text whenever the value set is known).
3.  Add `help` tooltips to anything non-obvious.
4.  Keep `snake_case` keys; keep image keys looking like file names.
5.  Provide sensible defaults in your presets — stores inherit them on install.
6.  Validate your JSON before shipping (the designer fails on malformed files).

## Related docs

-   [settings-authoring.md](settings-authoring.md) — the legacy `config/settings.html` format and how it maps to this schema
-   [settings-in-templates.md](settings-in-templates.md) — reading `{{ settings.* }}`, presets, boolean coercion
-   [assets.md](assets.md) — resolving image settings with `asset_url`
