<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/catalog-product/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Catalog Product (External Catalog)

**Template:** `templates/catalog_product.liquid` · **Layout:** default · **Route:** `/catalog/2.0/:id-…`

## Purpose

Product detail page for **external-catalog products** (Catalog 2.0) — products sourced from an external catalog rather than authored in the store admin. Functionally it mirrors the [standard product page](product.md): same configuration and add-to-cart flow, same `form` object — with a reduced feature surface.

## Typical use cases

-   Stores mixing in-house products with an external supplier catalog
-   Buyable detail pages for supplier items that never appear in storefront listings (external-catalog products are typically reached by direct link or search, not category browsing)

## Variables

Same core set as the standard product page:

| Name | Type | Description |
| --- | --- | --- |
| `product` | Catalog product object | The external-catalog product |
| `form` | Product form | Configuration state, prices, errors |
| `related_products` | Array | Related products |
| `meta_data` | Hash | SEO metadata |
| `logos`, `logo_required`, `custom_logos_upload_enabled` | — | Logo settings (logo locations are always empty for catalog products) |
| `product_images` | Array, conditional | Images with hot spots for the virtual-logo modal |

## Differences from the standard product page

| Feature | Standard product | Catalog product |
| --- | --- | --- |
| Reviews (`new_review`, review forms/partials) | Yes | **No** |
| Logo locations | Yes | **No** (always empty) |
| Personalization groups | Yes | **No** (always empty) |
| Back-in-stock notification | Yes | **No** |
| Add to cart / wishlist | Yes | Yes |
| Virtual sample preview | Yes | Yes |

## Typical structure

Reuse your product snippets; omit review and personalization blocks:

```
{% seo_tags %}

<h1>{{ product.name }}</h1>

{% form 'populate_product', product %}
  {% if product.product_options_enabled? %}{% render 'product_options', product: product, form: form %}{% endif %}
  <input type="number" name="product[quantity]" value="{{ form.quantity }}" min="1">
  <button type="submit">Add to cart</button>
{% endform %}
```

## Notes

-   The add-to-cart form name is still `populate_product` — the platform routes it to the external-catalog controller automatically.
-   Keep this template close to `product.liquid` (or share snippets) so both product flavors look consistent.

## Related

-   [Product detail](product.md) · [Form fields](../../forms/fields.md)
