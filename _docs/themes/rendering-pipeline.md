<!-- Source: https://omg.engineering/bsites_services/themes/rendering-pipeline/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# How Pages Are Rendered

A high-level overview of how the storefront turns a visitor's request into HTML using your theme files.

## Overview

```
Visitor request
    → Storefront matches a page type
    → Platform loads your template
    → Layout wraps the template (if applicable)
    → HTML sent to the browser
```

## Step 1: Page type → template

Each storefront page maps to a specific file in your theme's `templates/` folder. For example, a product detail page uses `templates/product.liquid`.

See [pages/index.md](pages/index.md) for the full mapping.

Some responses skip the layout wrapper:

-   AJAX partials (`templates/*.js.liquid`)
-   Email and SMS templates
-   Certain minimal pages (e.g. request sample, print views)

## Step 2: Variables are provided

Before your template renders, the platform injects **variables** you can use in Liquid:

1.  **Global variables** — available on every page (`site`, `current_user`, `order`, `settings`, URL helpers, etc.). See [global-context.md](global-context.md).
2.  **Page variables** — specific to the page type (`product` on product pages, `checkout_flow` on checkout, etc.). See the relevant [pages/index.md](pages/index.md) doc.

You never need to define these yourself — they are ready to use as `{{ variable }}` in your templates.

## Step 3: Layout wraps the template

For full HTML pages, your layout file (e.g. `layout/theme.liquid`) wraps the template output:

```
<main>
  {{ content_for_layout }}
</main>
```

The layout is selected by the `customer_layout` setting in your theme config (defaults to `theme`).

## Step 4: Snippets and assets

Within templates and layouts, you compose the page using:

-   `{% render 'snippet_name' %}` — reusable partials from `snippets/` (recommended). `{% include %}` is legacy.
-   `{{ 'style.css' | asset_url }}` — theme assets from `assets/`

See [composition.md](composition.md) for details.

## Settings in every render

`{{ settings.* }}` is always available. Settings come from your theme's `config/settings_data.json` and reflect values configured in the store admin.

## Email and SMS templates

Transactional emails and SMS messages use templates from your theme but render as standalone content — no layout wrapper. They receive store URL helpers and message-specific variables.

## Theme designer preview

When previewing unsaved changes in the theme designer, the platform overlays temporary setting and asset values so you can see edits before publishing. Live storefronts use the published theme only.

## Related docs

-   [global-context.md](global-context.md) — variables on every page
-   [composition.md](composition.md) — layouts, templates, snippets
-   [pages/index.md](pages/index.md) — template file for each page type
