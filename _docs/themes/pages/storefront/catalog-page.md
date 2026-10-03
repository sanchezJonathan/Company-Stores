<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/catalog-page/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Catalog Page

**Template:** `templates/catalog_page.liquid` · **Layout:** default · **Route:** any page URL whose page is marked as a catalog page

## Purpose

A hybrid between a CMS page and a catalog view. Some pages in the admin are flagged as _catalog pages_ — landing pages that combine authored content with product/category discovery. The platform renders this template for any such page, including a homepage that is marked as a catalog page.

## Typical use cases

-   "Shop all" or department landing pages with an intro banner plus embedded product listings
-   Category-style landing pages built in the CMS rather than from the category tree
-   Promotional collection pages ("New arrivals", "Clearance") with editorial content above product grids

## Variables

Same shape as the [CMS page template](cms-page.md):

| Name | Type | Description |
| --- | --- | --- |
| `page` | Page object | The current page (`page.is_catalog_page?` is true) |
| `home_page` | Page object | The store's homepage page object |
| `meta_data` | Hash | SEO metadata |

Global catalog collections (`products`, `categories`, `featured_products`) are available for building embedded listings.

## Typical structure

```
{% seo_tags %}

<header class="catalog-hero">
  <h1>{{ page.title }}</h1>
  {{ page.content }}
</header>

<section class="catalog-grid">
  {% for product in products limit: 12 %}
    {% render 'product_card', product: product %}
  {% endfor %}
</section>
```

## Notes

-   Provide this template if any page in your stores may be flagged as a catalog page; otherwise the platform falls back to rendering nothing for such pages.
-   If the store's homepage is a catalog page, this template (not `index.liquid`) renders at `/`.

## Related

-   [Home page](home.md) · [CMS page](cms-page.md) · [Product listing](product-listing.md)
