<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/logos-create/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `logos/create.js` — Product Logo Uploaded

**Template:** `templates/logos/create.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Response after a product logo upload succeeds. Usually refreshes the logo picker with the new logo selected, or closes the upload modal and updates the preview.

## Triggered by

-   AJAX submission of the `product_logo` form (`POST /logos`, JS format)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `logo` | Logo object | The newly created logo |

## Example

```
document.getElementById('current-logo-preview').src = '{{ logo.image_url }}';
document.getElementById('logo-modal').style.display = 'none';
```

## Notes

-   Upload failures return JSON errors (`logo.errors`) from the endpoint rather than this partial — handle them in your JS.

## Related

-   [logos/new.js](logos-new.md) · [apply\_logo.js](apply-logo.md)
