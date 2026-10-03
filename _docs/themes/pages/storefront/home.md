<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/home/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Home Page

**Template:** `templates/index.liquid` · **Layout:** default (`layout/{settings.customer_layout}.liquid`) · **Route:** `/`

## Purpose

The storefront landing page. The platform renders it for the root URL when the store's homepage CMS page exists. The homepage is a regular CMS page flagged as the home page — so this template receives the same object shape as the [CMS page template](cms-page.md), just rendered at `/`.

If no homepage page is configured, the platform renders the [404 template](404.md) instead.

## Typical use cases

-   Hero banner / slideshow (often driven by image and text settings)
-   Featured product grids using the global `featured_products` or `products` collections
-   Category tiles linking into the catalog
-   Promotional or announcement content from the homepage CMS body (`{{ page.content }}`)
-   Brand storytelling, trust badges, contact shortcuts

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `home_page` | Page object | The homepage CMS page |
| `page` | Page object | Same object as `home_page` |
| `meta_data` | Hash | SEO `title`, `keywords`, `description` for the page |

Global context is also available: `featured_products`, `products`, `categories`, `pages`, `order`, `current_user`, `settings`, and all URL helpers — see [global context](../../global-context.md).

## Tags commonly used here

```
{% seo_tags %}
{% main_navigation %}
{% category_navigation %}
```

## Typical structure

```
{% seo_tags %}

<section class="hero">
  {% render 'hero_slideshow' %}
</section>

<section class="featured">
  {% for product in featured_products limit: 8 %}
    {% render 'product_card', product: product %}
  {% endfor %}
</section>

<div class="cms-content">
  {{ page.content }}
</div>
```

## Notes

-   A homepage marked as a _catalog page_ renders with [`templates/catalog_page.liquid`](catalog-page.md) instead of this template.
-   Keep heavy widgets behind settings toggles so store owners can switch homepage sections on/off without code changes.

## Related

-   [CMS page](cms-page.md) · [Catalog page](catalog-page.md)
-   [Global context](../../global-context.md) · [Settings schema](../../settings-schema.md)
