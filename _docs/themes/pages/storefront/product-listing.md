<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/product-listing/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Product Listing (Catalog & Search)

**Template:** `templates/products.liquid` · **Layout:** default · **Route:** `/products` (with category and search params)

## Purpose

The catalog workhorse: one template serves category browsing, keyword search, and filtered product lists. The platform runs the search, applies category and permission scoping, and hands your template a ready `products_search` result set — you build the grid, pagination, sorting, and filtering UI around it.

## Typical use cases

-   Category pages reached from navigation or the category tree
-   Keyword search results
-   Filtered views (price, attributes, keywords) with a filter sidebar and applied-filter chips
-   Sort controls (price, name, popularity — whatever the catalog exposes)
-   Empty-results state with search guidance

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `products_search` | ProductsSearch object | The scoped, searchable result set (iterable, paginatable) |
| `selected_categories` | Array | Currently active category filters |
| `category_banner` | String or nil | Banner image URL for the active category, when configured |

## Forms, tags, and gates

| Construct | Purpose |
| --- | --- |
| `{% form 'search' %}` | Keyword search form (GET) |
| `{% paginate products_search by N %}` | Pagination — exposes the `paginate` object |
| `{% sort products_search %}` | Builds `sort_options` when the collection is sortable |
| `{% filtrate products_search by filter_rule %}` | Applies a filter rule; exposes `filter` in the block |
| `{% keyword_facets %}` | Exposes selected keyword facets as `keywords` |
| `site.filtering_active?` | Gate for the filter sidebar |
| `products_search.sortable?` | Gate for sort controls |

See [tags](../../tags.md) and [forms](../../forms/index.md) for full syntax.

## Typical structure

```
{% seo_tags %}
{% breadcrumbs 'add', 'categories', title: 'Shop', url: '/products' %}

{% form 'search' %}
  <input type="text" name="keywords" placeholder="Search products">
{% endform %}

{% paginate products_search by 24 %}
  <div class="product-grid">
    {% for product in products_search %}
      {% render 'product_card', product: product %}
    {% else %}
      <p>No products found.</p>
    {% endfor %}
  </div>

  {% render 'paginator', paginate: paginate %}
{% endpaginate %}
```

## Notes

-   Iterate `products_search`, not the global `products`, on this page — it reflects the active search, filters, and permissions.
-   Pagination defaults to 20 per page; the platform caps page size at 1000.
-   Keep card markup in a snippet — the same card is usually reused on the home page and related-products sections.

## Related

-   [Product detail](product.md) · [Filters](../../filters.md) (`product_url`, `link_to_product`)
