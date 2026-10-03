<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/cms-page/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# CMS Page

**Template:** `templates/page.liquid` · **Layout:** default · **Route:** `/pages/:id` (or a page's custom URL)

## Purpose

Renders any content (CMS) page managed in the store admin: About Us, Contact, FAQ, shipping policies, custom landing pages, and so on. Pages are created and edited by store owners in the admin; the theme's job is to present the page's title and rich-text body inside the store chrome.

## Typical use cases

-   Static informational pages (about, contact, policies, FAQs)
-   Custom landing pages with rich text, images, and embedded links
-   Pages with restricted access — some pages are only visible to certain user groups; the platform enforces visibility, and unauthorized access is handled before this template renders

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `page` | Page object | The current CMS page |
| `home_page` | Page object | The store's homepage page object |
| `meta_data` | Hash | SEO `title`, `keywords`, `description` |

Key properties of the `page` object:

| Property | Description |
| --- | --- |
| `page.title` | Page title |
| `page.content` | Rich-text HTML body authored in the admin |
| `page.id` | Page id (use with the `page_url` filter) |
| `page.is_catalog_page?` | Always false here (catalog pages use another template) |

## Typical structure

```
{% seo_tags %}
{% breadcrumbs 'add', 'pages', title: page.title, url: page | page_url %}

<article class="cms-page">
  <h1>{{ page.title }}</h1>
  {{ page.content }}
</article>
```

## Notes

-   `page.content` is admin-authored HTML — render it unescaped (plain `{{ page.content }}`).
-   Design this template generically: the same file serves every CMS page on the store.
-   Unknown page URLs render the [404 template](404.md), not this one.

## Related

-   [Home page](home.md) · [Catalog page](catalog-page.md)
-   [Tags](../../tags.md) — `seo_tags`, `breadcrumbs`
