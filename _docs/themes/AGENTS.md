<!-- Source: https://omg.engineering/bsites_services/themes/AGENTS/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Designer Guide

\# Company Stores Liquid Themes — Designer Guide

Welcome to the Company Stores Liquid theme platform. This guide helps you build **any storefront design** within platform rules.

> **This is platform documentation**, not a guide to any specific theme. Setting keys, snippet names, and visual patterns are yours to define.

## Company Stores Liquid vs Shopify

Company Stores themes use Liquid templating, but the platform differs from Shopify in important ways:

| Company Stores | Shopify (unsupported) |
| --- | --- |
| Fixed page types (`templates/product.liquid`, etc.) | Sections and blocks |
| `{% form 'name' %}` for all submissions | `{% schema %}` in templates |
| `{% render 'your_snippet' %}` for reuse | Theme app extensions |
| `config/settings.html` → generated schema | `config/settings_schema.json` authored directly |
| Object helpers (`product.virtual_samples_enabled?`) | Metafields |

You have full creative freedom for markup, CSS, JavaScript, snippet organization, and setting keys.

## Required theme structure

Every installable theme must include these folders:

```
your-theme/
├── assets/          # CSS, JS, images (may include .liquid assets)
├── config/          # settings_data.json (required); settings.html (for schema)
├── layout/          # layout/*.liquid wrappers
├── snippets/        # Reusable partials (names are yours)
└── templates/       # Page-type templates required by the platform
```

See [theme-structure.md](theme-structure.md) for validation rules and file naming.

## Golden rules

1.  **Platform provides pages, objects, and forms — you provide markup and styling.** Each page type has a required template file. The platform provides the data and form handlers.
    
2.  **No Shopify sections/blocks/`{% schema %}`.** Compose pages with layouts, templates, and your own snippets.
    
3.  **Use `{% form 'name', ... %}` for all submissions.** Every cart update, login, checkout step, and product configuration goes through platform forms. See [forms/index.md](forms/index.md).
    
4.  **Use `{% render 'your_snippet' %}` for reuse.** Snippet names and organization are designer-defined. Exception: `{% view_logos %}` requires `snippets/view_logos.liquid`. `{% include %}` still works (it inherits parent scope) but is legacy — prefer `{% render %}`. Global context (`site`, `settings`, `order`, URL helpers, …) is visible inside `{% render %}` without passing; page-local variables (`product`, `form`, …) must be passed explicitly. See [composition.md](composition.md).
    
5.  **Gate optional features with object helpers.** Before rendering virtual samples, logos, budgets, or other add-ons:
    

```
{% if product.virtual_samples_enabled? %}
  {% render 'virtual_samples_widget', product: product %}
{% endif %}
```

1.  **Settings keys are your choice.** Define them in `config/settings.html` following [settings-authoring.md](settings-authoring.md). Access at runtime via `{{ settings.your_key }}`.
    
2.  **Respect page-type contracts.** Each storefront page renders a specific `templates/*.liquid` file. Use [pages/index.md](pages/index.md) to find the right template and available variables.
    

## How to edit a page

1.  **Identify the page type** — e.g. product detail, cart, checkout address step
2.  **Open the matching doc** in [pages/index.md](pages/index.md) for variables, forms, and feature gates
3.  **Edit `templates/{name}.liquid`** in your theme (and any snippets you render)
4.  **Use global context** from [global-context.md](global-context.md) for navigation, cart, and user data

Example workflow for product detail:

```
pages/storefront/product.md  →  templates/product.liquid  →  your snippets/CSS
```

## How to add settings

1.  Add fields to `config/settings.html` using supported field types
2.  Platform generates `settings_schema.json` on upload
3.  Store admin configures values (saved to `settings_data.json`)
4.  Reference in templates: `{{ settings.my_color }}`

See [settings-authoring.md](settings-authoring.md) and [settings-in-templates.md](settings-in-templates.md).

## Global objects (every page)

Always available:

-   `site` / `shop` / `store` — store configuration and feature flags
-   `current_user` — logged-in customer (empty for guests)
-   `order` / `current_order` — cart
-   `wishlist` — wishlist
-   `pages`, `products`, `categories` — navigation catalog data
-   `settings` — theme settings
-   URL helpers: `root_url`, `cart_url`, `login_url`, etc.

Full reference: [global-context.md](global-context.md)

## Page type index

→ [pages/index.md](pages/index.md) — master table of all platform template files

| Page | Template file |
| --- | --- |
| Homepage | `templates/index.liquid` |
| CMS page | `templates/page.liquid` |
| Product listing | `templates/products.liquid` |
| Product detail | `templates/product.liquid` |
| Cart | `templates/cart.liquid` |
| Checkout | `templates/checkout.liquid` |
| Login | `templates/login.liquid` |
| Account dashboard | `templates/account/dashboard.liquid` |

## Platform API index

| API | Reference |
| --- | --- |
| Tags (`{% tag %}`) | [tags/index.md](tags.md) |
| Filters (`\| filter`) | [filters/index.md](filters.md) |
| Forms (`{% form %}`) | [forms/index.md](forms/index.md) + [forms/fields.md](forms/fields.md) |
| Objects | [drops/index.md](drops/index.md) |

## Rendering flow

Visitor request → page type matched → template loaded → layout wraps content → HTML.

Details: [rendering-pipeline.md](rendering-pipeline.md)

## Composition

-   Layouts wrap templates via `{{ content_for_layout }}`
-   Snippets are rendered with `{% render 'name' %}` (prefer this). `{% include 'name' %}` is legacy and inherits parent scope.
-   Global context is visible inside `{% render %}`; pass page-local variables (`product`, `form`, …) explicitly
-   AJAX partials use `templates/*.js.liquid` (no layout)

Details: [composition.md](composition.md)
