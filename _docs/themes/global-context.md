<!-- Source: https://omg.engineering/bsites_services/themes/global-context/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Global Context

Variables and URL helpers available on **every storefront page** (unless noted). These are provided automatically — you do not define them in your theme.

They are **request-wide globals**: visible in layouts, templates, `{% include %}` snippets, and `{% render %}` snippets without passing them. Page-local variables (`product`, `form`, `checkout_flow`, …) are not globals — pass those into `{% render %}`. See [composition.md](composition.md).

## Store identity

| Variable | Description |
| --- | --- |
| `site` | Current store (aliases: `shop`, `store`) |
| `store_url` | Store's canonical URL |

The `site` object exposes store configuration, feature flags, and contact info. See [drops/site-and-user.md](drops/site-and-user.md).

## Session & authentication

| Variable | Description |
| --- | --- |
| `current_user` | Logged-in customer, or empty for guests |
| `authentication_enabled` | Whether the store requires login |
| `session_passcode` | Active multi-storefront passcode, if any |
| `session_token` | Stable session identifier |
| `csrf_meta_tag` | CSRF meta tag HTML — include in layouts for AJAX forms |
| `punchout_session` | Active punchout procurement session |
| `sap_oci_session` | Active SAP OCI session |

## Cart & wishlist

| Variable | Description |
| --- | --- |
| `current_order` | Incomplete cart order |
| `order` | Alias for `current_order` |
| `wishlist` | Incomplete wishlist order |

## Navigation catalog data

| Variable | Description |
| --- | --- |
| `pages` | CMS pages the current visitor can access |
| `products` | Active products visible to the current visitor |
| `featured_products` | Featured products subset |
| `categories` | Categories the current visitor can browse |
| `filter_rules` | Active product filter rules (empty when filtering is disabled) |

Visibility respects store permissions — guests and restricted users see filtered subsets.

## Request context

| Variable | Description |
| --- | --- |
| `current_path` | Current page path with query string |
| `flash` | System messages hash |
| `flash_errors` | Flattened error, alert, and warning messages |
| `flash_notices` | Flattened notice, info, and success messages |
| `selected_categories` | Currently selected category filters (default empty) |

## URL helpers

All URL helpers are storefront paths:

| Variable | Purpose |
| --- | --- |
| `root_url` | Store homepage |
| `cart_url` | Cart page |
| `wishlist_url` | Wishlist page |
| `wishlist_request_quote_url` | Request quote from wishlist |
| `wishlist_to_cart_url` | Move wishlist items to cart |
| `login_url` | Login page |
| `logout_url` | Logout action |
| `forgot_password_url` | Password recovery |
| `resent_confirmation_url` | Resend confirmation email |
| `signup_url` | Registration page |
| `edit_account_url` | Account edit page |
| `account_dashboard_url` | Account dashboard |
| `address_book_url` | Account address book |
| `order_history_url` | Order history |
| `account_balance_url` | Account balance |
| `logos_url` | Account logos |
| `new_logo_url` | New account logo upload |
| `new_product_logo_url` | New product logo upload |
| `budget_info_url` | Budget information page |

```
<a href="{{ login_url }}">Sign in</a>
<a href="{{ cart_url }}">Cart ({{ order.line_items_count }})</a>
```

## Settings (always available)

| Variable | Description |
| --- | --- |
| `settings` | Current theme settings from `settings_data.json` |

```
{{ settings.primary_color }}
{% if settings.show_search %}
  {% render 'search_bar' %}
{% endif %}
```

See [settings-in-templates.md](settings-in-templates.md).

## Template metadata

On named templates, these are added automatically:

| Variable | Description |
| --- | --- |
| `current_template` | Template name (e.g. `product`) |
| `template_name` | Alias for `current_template` |

## Page-specific variables

Variables like `product`, `bundle`, `checkout_flow`, `form`, and `products_search` are only available on their respective page types. See [pages/index.md](pages/index.md). Inside `{% render %}`, pass them as arguments (`{% render 'product_card', product: product %}`).
