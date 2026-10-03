<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/recently-viewed-products-js/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `recently_viewed_products.js` — Recently Viewed Widget

**Template:** `templates/recently_viewed_products.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Loads the "recently viewed products" widget asynchronously. Product pages typically fetch this partial after first paint and inject the fragment, so the widget reflects the visit history including the current product.

## Triggered by

-   Your theme JS fetching `/recently_viewed_products` in JS format (the HTML variant is documented at [recently viewed products](../storefront/recently-viewed-products.md))

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `recently_viewed_products` | Array | Recently viewed product objects |

## Example

```
{% capture fragment %}{% render 'recently_viewed_fragment' %}{% endcapture %}
var container = document.getElementById('recently-viewed');
if (container) {
  container.innerHTML = '{{ fragment | escape_javascript }}';
}
```

(`recently_viewed_fragment` would be your own snippet rendering the product strip.)

## Related

-   [Recently viewed products](../storefront/recently-viewed-products.md) · [AJAX partials](index.md)
