<!-- Source: https://omg.engineering/bsites_services/themes/filters/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Liquid Filters

Filters transform a value in a `{{ ... }}` output using pipe syntax:

```
{{ product | product_url }}
{{ 19.99 | money }}
{{ 'app.css' | asset_url | stylesheet_tag }}
```

Company Stores registers the custom filters documented below **in addition to** the standard Liquid 5 built-in filters (`default`, `size`, `join`, `date`, `capitalize`, `truncate`, `split`, `escape`, …) — see [Standard Liquid filters](#standard-liquid-filters) at the bottom.

## Quick reference

| Category | Filters |
| --- | --- |
| URLs & routing | `product_url`, `bundle_url`, `page_url`, `calculate_prices_url`, `request_sample_url`, `notify_in_stock_url`, `virtual_samples_preview_url`, `reorder_url`, `move_line_item_to_cart_url`, `move_bundle_item_to_cart_url`, `account_address_url`, `edit_logo_url`, `delete_logo_url`, `product_category_url`, `join_url` |
| HTML helpers | `link_to`, `link_to_product`, `inventory_row`, `img_tag`, `script_tag`, `stylesheet_tag` |
| Assets | `asset_url` / `asset_path`, `stylesheet_url`, `javascript_url`, `image_url` |
| Money & points | `money`, `money_with_currency`, `number_to_currency`, `number_to_points`, `points_or_currency` |
| Text & formatting | `number_to_phone`, `full_date`, `titleize`, `ordinalize`, `pluralize` |
| Users & checkout | `short_name`, `state_passed`, `tracking_link` |
| Serialization & DOM | `json`, `escape_javascript` / `j` / `escape_json`, `default_errors`, `dom_id`, `dom_class` |

* * *

## URLs & routing

### `product_url`

Storefront URL of a product detail page.

```
<a href="{{ product | product_url }}">{{ product.name }}</a>
```

### `bundle_url`

Storefront URL of a bundle detail page.

```
<a href="{{ bundle | bundle_url }}">Configure this bundle</a>
```

### `page_url`

Storefront URL of a CMS page object.

```
{% for p in pages %}
  <a href="{{ p | page_url }}">{{ p.title }}</a>
{% endfor %}
```

### `calculate_prices_url`

POST endpoint for live price recalculation on a product page (`{product_url}/calculate_prices`). Used by themes that implement AJAX pricing.

```
<form data-pricing-url="{{ product | calculate_prices_url }}">
```

See [AJAX partials](pages/partials/index.md) — the response renders `templates/calculate_prices.js.liquid`.

### `request_sample_url`

URL of the sample request page for a product (`{product_url}/request_sample`).

```
{% if product.samples_enabled? %}
  <a href="{{ product | request_sample_url }}">Request a sample</a>
{% endif %}
```

### `notify_in_stock_url`

URL for the back-in-stock notification action (`{product_url}/notify_in_stock`).

```
<a href="{{ product | notify_in_stock_url }}">Email me when available</a>
```

### `virtual_samples_preview_url`

URL for virtual sample preview updates (`{product_url}/update_preview`).

```
<div data-preview-url="{{ product | virtual_samples_preview_url }}">
```

### `reorder_url`

URL that re-adds all items of a past order to the cart.

```
{% if site.allow_reordering? %}
  <a href="{{ order | reorder_url }}">Reorder</a>
{% endif %}
```

### `move_line_item_to_cart_url`

URL that moves one wishlist line item to the cart.

```
<form method="post" action="{{ line_item | move_line_item_to_cart_url }}">
  {{ csrf_meta_tag }}
  <button type="submit">Move to cart</button>
</form>
```

### `move_bundle_item_to_cart_url`

Same as above, for bundle line items saved on a wishlist.

```
<form method="post" action="{{ bundle_line_item | move_bundle_item_to_cart_url }}">
  <button type="submit">Move bundle to cart</button>
</form>
```

### `account_address_url`

URL of the address-suggestions endpoint for a saved account address (used by address autocomplete flows).

```
<div data-suggestions-url="{{ address | account_address_url }}">
```

### `edit_logo_url`

URL of the edit page for an account logo.

```
<a href="{{ logo | edit_logo_url }}">Edit logo</a>
```

### `delete_logo_url`

Delete endpoint for an account logo (submit with the DELETE method).

```
<form method="post" action="{{ logo | delete_logo_url }}">
  <input type="hidden" name="_method" value="delete">
  <button type="submit">Delete</button>
</form>
```

### `product_category_url`

**Stub.** Always returns `#`. Do not build navigation on it — use `{% category_navigation %}` or the `categories` global instead.

### `join_url`

Joins URL path segments with `/`.

```
{{ 'products' | join_url: 'specials' }}   →  products/specials
```

* * *

## HTML helpers

### `link_to`

Builds an `<a>` tag. Optional third argument is the `title` attribute.

```
{{ 'Contact us' | link_to: '/pages/contact' }}
{{ product.name | link_to: product.url, product.name }}
```

### `link_to_product`

Product name rendered as a link to the product page.

```
{{ product | link_to_product }}
```

### `inventory_row`

Renders a one-line HTML inventory summary for an inventory item: linked product name (SKU), sub-option names, and quantity left.

```
{{ inventory_item | inventory_row }}
{# → <a href="…">Shirt (SH-100)</a>, Red / L, 12 left in inventory #}
```

Used in low-inventory email templates.

### `img_tag`

Builds an `<img>` tag; returns an empty string when the source is blank.

```
{{ settings.logo_image | asset_url | img_tag: site.name }}
```

### `script_tag`

Builds a `<script src="…">` tag; empty string when the source is blank.

```
{{ 'app.js' | asset_url | script_tag }}
```

### `stylesheet_tag`

Builds a `<link rel="stylesheet">` tag; empty string when the source is blank.

```
{{ 'main.css' | asset_url | stylesheet_tag }}
```

* * *

## Assets

### `asset_url` (alias: `asset_path`)

Resolves a file from your theme's `assets/` folder to its CDN URL. This is the only correct way to reference theme assets.

```
<link rel="stylesheet" href="{{ 'main.css' | asset_url }}">
<img src="{{ 'hero.jpg' | asset_url }}" alt="">
```

See [assets.md](assets.md).

### `stylesheet_url` / `javascript_url` / `image_url`

Resolve **global (platform) CDN assets**, not theme assets. A cache-busting timestamp query is appended automatically.

```
{{ 'icons/flag.png' | image_url }}
```

Prefer `asset_url` unless you intentionally reference a platform CDN resource.

* * *

## Money & points

All money filters format using the store's configured currency symbol and symbol position.

### `money` / `money_with_currency`

Formats an amount in the store currency. `money` is an alias of `money_with_currency`.

```
{{ product.price | money }}              →  $19.99
{{ order.grand_total | money }}
```

### `number_to_currency`

Same currency formatting, explicit name:

```
{{ variant.unit_price | number_to_currency }}
```

### `number_to_points`

Converts a currency amount to loyalty points using the store's conversion rate (rounded up, sign preserved). Returns a plain number string.

```
{{ order.grand_total | number_to_points }}   →  "1500"
```

### `points_or_currency`

Renders the amount as points when the store uses points pricing, otherwise as currency. Use it whenever the store may be configured either way.

```
{{ product.price | points_or_currency }}
```

* * *

## Text & formatting

### `number_to_phone`

Formats a number as a US phone number.

```
{{ site.phone | number_to_phone }}    →  (555) 123-4567
```

### `full_date`

Formats a date as `%a %b %d %H:%M:%S %Z %Y` (e.g. `Thu Aug 21 14:30:05 UTC 2025`). For friendlier formats combine with the built-in `date` filter instead.

```
{{ order.completed_at | full_date }}
{{ order.completed_at | date: '%B %d, %Y' }}   {# built-in, usually preferable #}
```

### `titleize`

Title-cases a string.

```
{{ 'hello world' | titleize }}   →  Hello World
```

### `ordinalize`

Turns a number into its ordinal form.

```
{{ 3 | ordinalize }}   →  3rd
```

### `pluralize`

Builds a `"N word"` string, picking the singular or plural form.

```
{{ order.line_items_count | pluralize: 'item', 'items' }}   →  "3 items"
```

* * *

## Users & checkout

### `short_name`

Displays a user as `"First L."`.

```
Welcome back, {{ current_user | short_name }}
```

### `state_passed`

Returns whether checkout has already passed a given step. Useful for progress indicators and for letting users jump back to completed steps.

```
{% if checkout_flow | state_passed: 'address' %}
  <a href="/checkout/address">Edit address</a>
{% endif %}
```

See [Checkout](pages/storefront/checkout.md).

### `tracking_link`

Renders a shipment's tracking number as a link when the carrier provides a tracking URL, otherwise as plain text.

```
{{ shipment | tracking_link }}
```

* * *

## Serialization & DOM

### `json`

Serializes an object to JSON — typically to hand platform data to your JavaScript.

```
<script>
  window.productData = {{ product | json }};
</script>
```

### `escape_javascript` (aliases: `j`, `escape_json`)

Escapes a string for safe embedding in JavaScript. Use when injecting Liquid-rendered HTML into JS responses, especially in AJAX partials.

```
document.getElementById('reviews').innerHTML = '{{ reviews_html | escape_javascript }}';
```

### `default_errors`

Joins an error object's full messages with `,`.

```
{% if form.errors.any? %}
  <p class="error">{{ form.errors | default_errors }}</p>
{% endif %}
```

### `dom_id` / `dom_class`

Build stable DOM identifiers from an object — `dom_class` is the underscored class name, `dom_id` appends the record id.

```
<div id="{{ product | dom_id }}" class="{{ product | dom_class }}">
{# id="product_42" class="product" #}
```

* * *

## Standard Liquid filters

Themes run on Liquid 5, so all standard built-in filters work as well. The ones used most often in storefront themes:

| Filter | Example | Result |
| --- | --- | --- |
| `default` | `{{ settings.footer_text \| default: '© My Store' }}` | Fallback for blank values |
| `date` | `{{ order.completed_at \| date: '%b %d, %Y' }}` | Date formatting |
| `size` | `{{ order.line_items \| size }}` | Collection/string length |
| `join` | `{{ tags \| join: ', ' }}` | Join array into string |
| `first` / `last` | `{{ product.images \| first }}` | Array ends |
| `map` | `{{ products \| map: 'name' }}` | Extract property from each item |
| `where` | `{{ variants \| where: 'available', true }}` | Filter array by property |
| `sort` / `sort_natural` | `{{ products \| sort: 'price' }}` | Sort array |
| `uniq` | `{{ tags \| uniq }}` | Remove duplicates |
| `split` | `{{ 'a,b' \| split: ',' }}` | String → array |
| `strip_html` | `{{ product.description \| strip_html \| truncate: 120 }}` | Remove HTML tags |
| `truncate` / `truncatewords` | `{{ text \| truncatewords: 20 }}` | Shorten text |
| `escape` | `{{ user_input \| escape }}` | HTML-escape |
| `newline_to_br` | `{{ text \| newline_to_br }}` | Newlines → `<br>` |
| `plus` / `minus` / `times` / `divided_by` / `round` | `{{ qty \| times: unit_price \| round: 2 }}` | Math |
| `append` / `prepend` / `replace` | `{{ 'btn' \| append: '-primary' }}` | String manipulation |
| `upcase` / `downcase` / `capitalize` | `{{ status \| upcase }}` | Case conversion |
| `url_encode` / `url_decode` | `{{ query \| url_encode }}` | URL escaping |

Note

Built-in `date` accepts Ruby strftime patterns. Storefront timestamps come as store-local time objects — `{{ order.completed_at | date: '%b %-d, %Y %l:%M %p' }}` is a typical pattern.

## Related docs

-   [tags/index.md](tags.md) — custom `{% tag %}` blocks
-   [assets.md](assets.md) — asset resolution details
-   [pages/index.md](pages/index.md) — which variables exist on which page
