<!-- Source: https://omg.engineering/bsites_services/themes/settings-authoring/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Settings Authoring

How to define configurable theme settings using the legacy `config/settings.html` format. When a theme ships `settings.html` but no `settings_schema.json`, the platform parses this file into `settings_schema.json` the first time the store admin designer needs it.

Note

Shipping `config/settings_schema.json` directly is the recommended path — see [settings-schema.md](settings-schema.md) for the full schema reference. This page covers the HTML source format and how each HTML pattern maps to a schema field.

**This doc covers format and field types only.** Setting key names and preset names are yours to define.

## Pipeline

```
config/settings.html  →  platform  →  settings_schema.json
                                                ↓
                                         Store admin UI
                                                ↓
                                         settings_data.json
                                                ↓
                                         {{ settings.* }} in templates
```

## settings.html structure

Settings are defined as HTML forms using nested `<fieldset>` elements:

```
<fieldset>
  <legend>Colors</legend>
  <table>
    <tr>
      <td><label>Primary color</label></td>
      <td><input class="color" name="primary_color" type="text" value="#336699"></td>
    </tr>
    <tr>
      <td><label>Show search bar</label></td>
      <td><input name="show_search" type="checkbox" value="true" checked></td>
    </tr>
  </table>
</fieldset>
```

Each `<fieldset>` becomes a section in the admin UI with a title and list of fields.

Nested `<fieldset>` elements create sub-sections.

## Supported field types

| Type | HTML pattern | Use for |
| --- | --- | --- |
| `color` | `<input class="color" name="...">` | Color pickers |
| `checkbox` | `<input type="checkbox" name="...">` | On/off toggles |
| `text_input` | `<input type="text" name="...">` or bare `<input name="...">` | Single-line text |
| `image` | `<input type="file" name="...">` | Image uploads |
| `textarea` | `<textarea name="...">` | Multi-line text |
| `select` | `<select name="...">` (non-font) | Dropdown choices |
| `font` | `<select class="font" name="...">` | Font family picker |
| `tips` | `<span style="font-style:italic">` help text row | Help text (not a setting) |
| `table` | `<table class="standard-table">` | Grid-style repeating settings |
| `formlist` | Slideshow-style table with `#carousel_item_1_image` | Repeating item groups |

The `name` attribute becomes the setting key: `{{ settings.primary_color }}`.

## Field type examples

### Color

```
<tr>
  <td><label>Accent color</label></td>
  <td><input class="color" name="accent_color" type="text" value="#ff6600"></td>
</tr>
```

### Checkbox

```
<tr>
  <td><label>Enable dark mode</label></td>
  <td><input name="dark_mode" type="checkbox" value="true"></td>
</tr>
```

### Text input

```
<tr>
  <td><label>Footer text</label></td>
  <td><input name="footer_text" type="text" value="© My Store"></td>
</tr>
```

### Image

```
<tr>
  <td><label>Header logo</label></td>
  <td><input name="header_logo" type="file"></td>
</tr>
```

### Textarea

```
<tr>
  <td><label>Custom CSS</label></td>
  <td><textarea name="custom_css"></textarea></td>
</tr>
```

### Select

```
<tr>
  <td><label>Products per row</label></td>
  <td>
    <select name="products_per_row">
      <option value="3">3</option>
      <option value="4" selected>4</option>
    </select>
  </td>
</tr>
```

### Font

```
<tr>
  <td><label>Heading font</label></td>
  <td><select class="font" name="heading_font"></select></td>
</tr>
```

### Tips (help text)

```
<tr>
  <td colspan="2"><span style="font-style:italic">This setting controls the homepage banner.</span></td>
</tr>
```

## Presets

Define default values in `settings_data.json`:

```
{
  "current": "Default",
  "presets": {
    "Default": {
      "customer_layout": "theme",
      "primary_color": "#336699",
      "show_search": true
    }
  }
}
```

Preset names and keys are entirely theme-defined.

## customer\_layout

Include `customer_layout` in your presets to control which layout wraps pages. This is the only setting with platform-defined behavior (selects `layout/{value}.liquid`).

## Related docs

-   [settings-schema.md](settings-schema.md) — the generated `settings_schema.json` format and every supported control
-   [settings-in-templates.md](settings-in-templates.md) — using `{{ settings.* }}` in templates
-   [theme-structure.md](theme-structure.md) — `config/` folder requirements
