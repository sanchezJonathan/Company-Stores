<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/apply-logo/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `apply_logo.js` — Logo Applied to Product Image

**Template:** `templates/apply_logo.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Updates the product image preview after a logo is applied to it (virtual logos: the platform composites the logo onto the product image at its configured location). Your JS swaps the preview image to the freshly composited one.

## Triggered by

-   Applying/selecting a logo on the product page (`POST /logos/apply_logo`, JS format)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `logo` | Logo object | The applied logo |
| `product_image` | Product image object | The image the logo was applied to |
| `image_src` | String | URL of the composited preview image |

## Example

```
document.getElementById('product-main-image').src = '{{ image_src }}';
```

## Related

-   [logos/new.js](logos-new.md) · [Product detail](../storefront/product.md) · [Logos and samples drops](../../drops/logos-and-samples.md)
