<!-- Source: https://omg.engineering/bsites_services/themes/composition/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Composition

How layouts, templates, snippets, and partial responses compose into a complete storefront.

## Layout → template wrapping

Every full HTML page follows this structure:

```
layout/theme.liquid          ← outer shell (header, footer, CSS links)
  └── templates/product.liquid   ← page content injected here
```

The layout receives the rendered template as `{{ content_for_layout }}`:

```
<!DOCTYPE html>
<html>
<head>
  <title>{{ page_title | default: site.name }}</title>
</head>
<body>
  {% render 'site_header' %}

  <main>
    {{ content_for_layout }}
  </main>

  {% render 'site_footer' %}
</body>
</html>
```

Header and footer snippets can use [global context](global-context.md) (`site`, `order`, `cart_url`, `current_user`, `settings`, …) without passing those variables.

### Layout selection

-   **Default:** `layout/{settings.customer_layout}.liquid` (fallback: `layout/theme.liquid`)
-   **No layout:** Some page types render without a layout (AJAX partials, certain minimal pages)
-   **403 page:** `layout/403.liquid` is a standalone layout with no inner template

## Templates

Templates in `templates/` are full page bodies for specific page types. See [pages/index.md](pages/index.md).

Templates should focus on page-specific content. Shared chrome (navigation, footer, cart icon) typically lives in the layout or snippets.

## Snippets

Snippets are reusable partials in `snippets/`. **Prefer `{% render %}`** for new themes.

```
{% render 'site_header' %}
{% render 'product_card', product: product %}
{% render 'price_display' with product as product %}
{% render 'nav_item' for pages as page %}
```

`{% render 'product_card' %}` resolves to `snippets/product_card.liquid`.

### `{% render %}` vs `{% include %}`

| Aspect | `{% render %}` (recommended) | `{% include %}` (legacy) |
| --- | --- | --- |
| Scope | Isolated — parent template locals are hidden | Shared — inherits every parent variable |
| [Global context](global-context.md) | Visible (`site`, `settings`, `order`, URL helpers, catalog collections, …) | Visible |
| Page-local variables (`product`, `form`, `checkout_flow`, …) | Pass explicitly | Visible automatically |
| `with` / `for` / `as` / attributes | Yes | Yes |

**Globals always work inside `{% render %}`.** Do not pass `site`, `shop`, `settings`, `current_user`, `order` / `current_order`, `wishlist`, `pages`, `products`, `categories`, flash helpers, or URL helpers (`cart_url`, `login_url`, …). They are request-wide and stay available in isolated snippets.

**Page-specific variables must be passed** into `{% render %}`:

```
{% render 'product_card', product: product %}
{% render 'product_options', product: product, form: form %}
{% render 'checkout_address', checkout_flow: checkout_flow, form: form %}
```

Keyword arguments (`product: product`) set that name inside the snippet. That is the usual form when the snippet expects `{{ product }}`.

`{% include %}` remains supported so existing themes keep working. New snippets should use `{% render %}` so they cannot accidentally depend on whatever the caller had in scope.

### Passing data (`{% render %}`)

| Syntax | Effect |
| --- | --- |
| `{% render 'card', product: product %}` | Sets `product` inside the snippet (**preferred**) |
| `{% render 'card' with product %}` | Sets `card` (snippet file name) to `product` |
| `{% render 'card' with product as item %}` | Sets `item` to `product` |
| `{% render 'card' for products as product %}` | Iterates `products`, rendering the snippet for each |
| `{% render 'card', show_price: true %}` | Passes additional variables |

`with` without `as` names the variable after the snippet file (`card`), not after the object (`product`). Use `as` or a keyword argument when the snippet reads `{{ product }}`.

### Passing data (`{% include %}`, legacy)

| Syntax | Effect |
| --- | --- |
| `{% include 'card' with product %}` | Sets `card` to `product`; parent locals still leak in |
| `{% include 'card' with product as item %}` | Sets `item` to `product` |
| `{% include 'card' for products as product %}` | Iterates `products`, rendering the snippet for each |
| `{% include 'card', show_price: true %}` | Passes additional variables |

### Designer freedom

The platform does **not** require specific snippet names. You create whatever snippets your design needs.

## Platform-reserved snippet paths

| Tag | Requires |
| --- | --- |
| `{% view_logos product %}` | `snippets/view_logos.liquid` |

All other snippet names are your choice.

## AJAX partials (`*.js.liquid`)

Templates ending in `.js.liquid` return JavaScript responses without a layout. Used for dynamic interactions:

```
templates/calculate_prices.js.liquid    → price recalculation
templates/create_review.js.liquid       → review form response
templates/apply_logo.js.liquid          → logo preview update
```

See [pages/partials/index.md](pages/partials/index.md).

## Email templates

Email templates live in `templates/` and render as standalone HTML — no layout wrapper. See [pages/emails/index.md](pages/emails/index.md). Prefer `{% render %}` for shared email chrome; message objects (`order`, `user_name`, …) should be passed when the snippet needs them.

## SMS templates

SMS templates use `.txt.liquid` in `templates/sms/` and render as plain text. See [pages/sms/index.md](pages/sms/index.md).

## Print views

Print templates render without layout for browser print dialogs. See [Approval & print pages](pages/approval-and-print/print-order.md).

## Useful tags for composition

| Tag | Purpose |
| --- | --- |
| `{% render %}` | Render a snippet (recommended) |
| `{% include %}` | Render a snippet with parent scope (legacy) |
| `{% paginate %}` | Wrap paginated content |
| `{% form %}` | Wrap form markup |
| `{% breadcrumbs %}` / `{% render_breadcrumbs %}` | Build breadcrumb trails |
| `{% main_navigation %}` | Render page navigation |
| `{% category_navigation %}` | Render category tree navigation |
| `{% seo_tags %}` | Output title and meta tags |

See [tags/index.md](tags.md).

## Minimal page example

```
{% breadcrumbs 'add', 'categories', title: product.name, url: product.url %}

<h1>{{ product.name }}</h1>
<p>{{ product.description }}</p>

{% form 'populate_product', product %}
  {% render 'product_options', product: product, form: form %}
  <button type="submit">Add to cart</button>
{% endform %}
```

The layout, header, footer, and option rendering are all your design choices.
