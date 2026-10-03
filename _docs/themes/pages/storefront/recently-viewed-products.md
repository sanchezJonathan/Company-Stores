<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/recently-viewed-products/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Recently Viewed Products

**Template:** `templates/recently_viewed_products.liquid` · **Layout:** none · **Route:** `/recently_viewed_products` (HTML) and `.js.liquid` variant for AJAX

## Purpose

Renders the "recently viewed products" widget. The platform tracks products a visitor has opened and exposes them here as a fragment — themes typically embed it into product or home pages via AJAX so the widget updates without full page loads.

## Typical use cases

-   A "Recently viewed" strip at the bottom of product pages
-   Homepage re-engagement block
-   AJAX-loaded widget that appears after the main content renders

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `recently_viewed_products` | Array | Recently viewed product objects |

## Variants

| Template | Format | When |
| --- | --- | --- |
| `recently_viewed_products.liquid` | HTML fragment | Direct render (no layout) |
| [`recently_viewed_products.js.liquid`](../partials/recently-viewed-products-js.md) | JavaScript | AJAX loading |

## Typical structure

```
{% if recently_viewed_products.size > 0 %}
  <section class="recently-viewed">
    <h3>Recently viewed</h3>
    {% for product in recently_viewed_products %}
      {% render 'product_card', product: product %}
    {% endfor %}
  </section>
{% endif %}
```

## Notes

-   No layout wraps this template — output only the fragment markup (or a full document if you use it standalone).
-   The AJAX variant should emit JS that injects the fragment; see the partial doc.

## Related

-   [AJAX partials](../partials/index.md) · [Product detail](product.md)
