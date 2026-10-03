<!-- Source: https://omg.engineering/bsites_services/themes/drops/site-and-user/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Objects — Site & User

## Site

**Variable:** `site`, `shop`, `store` (global aliases)

| Property / method | Description |
| --- | --- |
| `id`, `name`, `company_name`, `url`, `address` | Store identity |
| `primary_phone`, `primary_email`, `contact` | Contact info |
| `from_email` | Outbound email address |
| `show_billing_address?`, `show_shipping_address?`, `show_ship_method?` | Cart/checkout options |
| `no_payment_required?`, `show_in_hands_date?` | Checkout configuration |
| `inventory_settings` | Inventory settings object |
| `store_enabled?`, `catalog_enabled?`, `wishlist_enabled?` | Feature flags |
| `allow_guest_checkout?` | Guest checkout permitted |
| `show_account_balance?`, `show_gift_certificate?`, `show_coupon?` | Feature visibility |
| `show_login?`, `show_registration?` | Auth UI visibility |
| `filtering_active?` | Product filters enabled |
| `points_store?` | Points-based store |
| `budget_enabled?`, `saml_enabled?`, `allow_reordering?` | Store capabilities |
| `ecommerce_active?`, `available_virtual_logo?` | Legacy aliases |

## User

**Variable:** `current_user` (global); `account` on account edit pages

| Property / method | Description |
| --- | --- |
| `id`, `username`, `email`, `first_name`, `last_name`, `name` | Profile (HTML-escaped) |
| `company`, `title`, `phone` | Additional profile fields |
| `balance`, `integrated?`, `has_no_password?` | Account state |
| `enable_sms_notifications?` | SMS opt-in |
| `errors` | Validation errors |
| `logos`, `addresses`, `groups` | Related collections |
| `shipping_address`, `billing_address` | Default addresses |
| `order_history`, `recent_orders` | Completed orders |
| `has_budgets?`, `budgets`, `budget_optional?` | Budget feature |
| `custom_fields`, `custom_user_fields` | Custom registration fields |

## Guest user

**Variable:** via `{% form 'guest_checkout' %}` → `form`

| Property / method | Description |
| --- | --- |
| `email` | Guest email |
| `errors` | Validation errors |

## Page

**Variable:** `page`, `home_page`; `pages` (global nav list)

| Property / method | Description |
| --- | --- |
| `id`, `title`, `name`, `description`, `keywords`, `target` | Page metadata |
| `is_page?`, `is_link?`, `is_home_page?` | Page type flags |
| `is_catalog_page?` | Catalog landing page |
| `url` | Storefront URL |
| `content` | Published HTML body |

## Group

**Variable:** nested on `user.groups`

| Property / method | Description |
| --- | --- |
| `id`, `title`, `group_type` | Group identity |
| `passcode_active?`, `passcode` | Passcode gate |

## Contact

**Variable:** `order.shipping_contact`, `order.billing_contact`

| Property / method | Description |
| --- | --- |
| `id`, `first_name`, `last_name`, `email`, `phone` | Contact fields |
| `name`, `safe_name` | Full name variants |
| `errors` | Validation errors |

## Address

**Variable:** `site.address`, `order.shipping_address`, `order.billing_address`

| Property / method | Description |
| --- | --- |
| `id`, `nickname`, `company`, `first_address`, `second_address` | Address fields |
| `city`, `state`, `country`, `zip` | Location |
| `first_name`, `last_name`, `email`, `phone` | From contact |
| `address_city_line`, `full_address_line` | Formatted strings |
| `errors` | Validation errors |

## Font / FontStyle / FontStyles

**Variable:** from theme font settings

-   **Font:** `id`, `name`, `font_styles`
-   **FontStyle:** `id`, `style`, `css_font_family`, `css_font_face`, `as_json`
-   **FontStyles:** enumerable collection of `FontStyle`

## FilterRule

**Variable:** `filter_rules` (global); `products_search.filter_by`

| Property / method | Description |
| --- | --- |
| `name`, `friendly_name` | Display names |

## InventorySetting

**Variable:** `site.inventory_settings`

| Property / method | Description |
| --- | --- |
| `allow_stock_notification?` | Stock notification modal allowed |

## Date / Time wrappers

Date and time values are formatted automatically when output in templates.
