<!-- Source: https://omg.engineering/bsites_services/themes/forms/fields/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Form Fields Reference

What each `{% form %}` expects in your HTML `name` attributes. Use this when building form markup.

> **Important:** The `{% form %}` tag sets the submit URL and method, but you write the inputs. Field names must match what the platform accepts — they are not always the same as the form tag's internal namespace.

## How to implement a form

1.  **Pick the form** — find the name in [index.md](index.md) (`populate_product`, `cart`, `login`, etc.)
2.  **Open the matching page doc** — see which `form` object is available and what feature gates apply
3.  **Use this reference** — for `name` attribute patterns
4.  **Bind values and errors** — read from the `form` object (or step-specific checkout `form`) and display `form.errors`

```
{% form 'populate_product', product %}
  <input type="number" name="product[quantity]" value="{{ form.quantity }}">
  {% if form.errors.any? %}
    {{ form.errors | default_errors }}
  {% endif %}
  <button type="submit">Add to cart</button>
{% endform %}
```

### Namespace mismatches

Some forms declare one namespace in the tag but the platform reads another. **Always use the field names in this document**, not what you might guess from the form tag alone:

| Form | Tag suggests | Platform reads |
| --- | --- | --- |
| `cart` / `wishlist` | `cart[…]` / `wishlist[…]` | `line_items[{id}][quantity]` |
| `guest_checkout` | `checkout_guest[…]` | `guest[email]` |
| `new_address` / `address` | `account_address[…]` | `address[…]` |
| `passcode` | `passcode[passcode]` | `passcode` (top-level) |
| `search` | `search[…]` | `s[…]` (preferred) |

* * *

## Authentication & account

### `login`

| Field | Notes |
| --- | --- |
| `website_user[login]` | Username or email |
| `website_user[password]` |  |
| `website_user[timezone]` | Optional hidden; browser timezone |

### `registration` / `create_account`

| Field | Required | Notes |
| --- | --- | --- |
| `website_user[first_name]` | ✓ |  |
| `website_user[last_name]` | ✓ |  |
| `website_user[username]` | ✓ |  |
| `website_user[email]` | ✓ |  |
| `website_user[password]` | ✓ |  |
| `website_user[password_confirmation]` | ✓ |  |
| `website_user[timezone]` |  | Hidden |
| `website_user[group_passcode]` |  | When group passcode enabled |
| `website_user[custom_field_values][{id}]` |  | Per `form.custom_user_fields` |

CAPTCHA script is injected automatically when enabled.

### `checkout_registration` / `create_checkout_account`

Same fields as `registration`.

### `guest_checkout`

| Field | Notes |
| --- | --- |
| `guest[email]` | Guest checkout email |

### `recover_password` / `recover_account_password`

| Field | Notes |
| --- | --- |
| `website_user[email]` |  |

### `reset_password` / `reset_account_password`

| Field | Notes |
| --- | --- |
| `website_user[reset_password_token]` | Auto-hidden by form tag |
| `website_user[password]` |  |
| `website_user[password_confirmation]` |  |

### `resend_confirmation` / `resend_account_confirmation`

| Field | Notes |
| --- | --- |
| `website_user[email]` |  |

### `activate_account` / `activate_account_password`

| Field | Notes |
| --- | --- |
| `confirmation_token` | Auto-hidden (top-level, not namespaced) |
| `website_user[password]` |  |
| `website_user[password_confirmation]` |  |

### `user` / `account_edit`

| Field | Notes |
| --- | --- |
| `website_user[first_name]` |  |
| `website_user[last_name]` |  |
| `website_user[email]` |  |
| `website_user[phone]` | Required when SMS enabled |
| `website_user[username]` | Omitted for SSO users |
| `website_user[current_password]` | When changing password |
| `website_user[password]` | Optional |
| `website_user[password_confirmation]` |  |
| `website_user[enable_sms_notifications]` | Checkbox (+ hidden `false`) |
| `website_user[timezone]` | From `form.timezones` |
| `website_user[custom_field_values][{id}]` | Per `form.custom_user_fields` |

### `passcode`

| Field | Notes |
| --- | --- |
| `passcode` | Top-level field name (not nested) |

### `clear_passcode`

No fields — submit only.

* * *

## Cart & checkout

### `cart` / `update_cart`

| Field | Notes |
| --- | --- |
| `line_items[{line_item_id}][quantity]` | `0` removes the item |
| `checkout` | Optional submit button name to proceed to checkout |

### `wishlist` / `wishlist_update`

Same pattern as cart: `line_items[{id}][quantity]`.

### `checkout`

Always include (auto-injected by form tag):

| Field | Notes |
| --- | --- |
| `checkout[lock_version]` | Prevents stale checkout conflicts |

#### Address step

| Field | Notes |
| --- | --- |
| `checkout[address][first_name]` |  |
| `checkout[address][last_name]` |  |
| `checkout[address][email]` |  |
| `checkout[address][phone]` |  |
| `checkout[address][company]` |  |
| `checkout[address][nickname]` |  |
| `checkout[address][first_address]` |  |
| `checkout[address][second_address]` |  |
| `checkout[address][city]` |  |
| `checkout[address][state]` |  |
| `checkout[address][country]` |  |
| `checkout[save_to_address]` | Checkbox |

Use `form.{field}.value` and `form.{field}.errors` from the address form object.

#### Delivery step

| Field | Notes |
| --- | --- |
| `checkout[delivery][shipment_id]` | Radio per `form.shipments` |
| `checkout[delivery][in_hands_date]` | When required; `MM/DD/YYYY` |

#### Payment step

| Field | Notes |
| --- | --- |
| `checkout[payment_method_id]` | Use `{% render_payment_method_checkbox %}` |
| `checkout[payment_details][…]` | Use `{% render_payment_method_template %}` |
| `checkout[use_same_as_shipping_address]` |  |
| `checkout[use_same_as_shipping_contact]` |  |
| `checkout[save_to_address]` |  |
| `checkout[use_balance]` |  |
| `checkout[gift_certificate]` | Gift cert code |
| `apply_gift_certificate` | Submit button name to apply cert |
| `checkout[coupon_code]` | Promo code |
| `apply_coupon_code` | Submit button name to apply coupon |
| `checkout[coupons][{id}][delete]` | Remove applied coupon |

Billing address reuses the `checkout[address][…]` fields.

#### Custom data collection step

| Field | Notes |
| --- | --- |
| `checkout[custom_data_collections][{form_id}][{input_id}]` | Text/textarea |
| `checkout[custom_data_collections][{form_id}][{input_id}][]` | Multi-select |

#### Budget step

| Field | Notes |
| --- | --- |
| `checkout[budget][budget_id]` | Radio per budget |

#### Confirm step

Only `checkout[lock_version]` — review and submit.

### `apply_gift_certificate`

| Field | Notes |
| --- | --- |
| `gift_certificate` | Certificate ID (top-level) |
| `gift_certificate[certificate_id]` | Alternate nested form |

* * *

## Product configuration

### `populate_product`

Requires `{% form 'populate_product', product %}`.

| Field | Notes |
| --- | --- |
| `product[quantity]` |  |
| `product[timestamp]` | Auto-hidden |
| `product[proof_approval]` | Checkbox when proof approval required |

**Options** (when `product.product_options_enabled?`):

| Field | Notes |
| --- | --- |
| `product[options][{option_id}][sub_option]` | Selected sub-option ID |
| `product[grid][{sub_option_id}][quantity]` | Single-dimension grid |
| `product[grid][{sub_x_id}][{sub_y_id}][quantity]` | Two-dimension grid |

**Personalizations** (when enabled):

| Field | Notes |
| --- | --- |
| `product[personalizations][{form_id}][{input_id}]` | Per personalization input |

**Logos**:

| Field | When |
| --- | --- |
| `product[logo]` | Single-logo mode |
| `product[logo_location][{location_id}][logo_id]` | Per-location selection |

Read state and errors from `form.options`, `form.grid`, `form.personalizations`, `form.selected_logos`.

### `populate_bundle`

Requires `{% form 'populate_bundle', bundle %}`.

| Field | Notes |
| --- | --- |
| `bundle[checkout_digest]` | Auto-hidden |
| `bundle[replace_id]` | Auto-hidden when editing cart line |
| `bundle[products][{member_id}][…]` | Same field patterns as `populate_product`, nested per member |

Prefix pattern: `bundle[products][{{ member.id }}]` then append `[quantity]`, `[options][…]`, etc.

### `populate_gift_certificate`

| Field | Notes |
| --- | --- |
| `product[quantity]` | 1–10 |
| `product[amount]` | Preset or `custom` |
| `product[custom_amount]` | When amount is custom |
| `product[timestamp]` | Auto-hidden |
| `product[details][{index}][first_name]` | Per recipient |
| `product[details][{index}][last_name]` |  |
| `product[details][{index}][email]` |  |
| `product[details][{index}][message]` |  |

### `request_sample`

| Field | Notes |
| --- | --- |
| `request_sample[logo]` | Single-logo mode |
| `request_sample[logo_location][{location_id}]` | Per-location logo |
| `request_sample[choices][{option_id}]` | Sub-option ID |
| `request_sample[shipping_contact][first_name]` |  |
| `request_sample[shipping_contact][last_name]` |  |
| `request_sample[shipping_contact][email]` |  |
| `request_sample[shipping_contact][phone]` |  |
| `request_sample[shipping_address][company]` |  |
| `request_sample[shipping_address][first_address]` |  |
| `request_sample[shipping_address][second_address]` |  |
| `request_sample[shipping_address][city]` |  |
| `request_sample[shipping_address][state]` |  |
| `request_sample[shipping_address][country]` |  |
| `request_sample[shipping_address][zip]` |  |

### `product_review` / `add_product_review`

| Field | Notes |
| --- | --- |
| `review[title]` |  |
| `review[body]` |  |
| `review[stars]` | Rating 1–5 |

### `search`

| Field | Notes |
| --- | --- |
| `s[keyword]` | Search query (also accepts `s[q]`, `s[query]`) |
| `s[sort]` | Sort option |
| `s[f][{filter_key}]` | Facet filters |
| `s[keywords][]` | Accumulated keywords (hidden) |

Pass `products_search` to preserve active filters: `{% form 'search', products_search %}`.

* * *

## Logos

### `product_logo` / `account_logo` (+ aliases)

Multipart upload.

| Field | Notes |
| --- | --- |
| `logo[image]` | File (JPEG/PNG) |
| `logo[image_cache]` | Auto-hidden |
| `logo[name]` | Display name |
| `logo[remove_whitespace]` | Checkbox |

* * *

## Addresses

### `new_address` / `address` / `account_address` / `user_address`

Use `address[…]` — not `account_address[…]`.

| Field | Notes |
| --- | --- |
| `address[nickname]` |  |
| `address[first_name]` |  |
| `address[last_name]` |  |
| `address[company]` |  |
| `address[email]` |  |
| `address[phone]` |  |
| `address[first_address]` |  |
| `address[second_address]` |  |
| `address[city]` |  |
| `address[state]` |  |
| `address[country]` |  |
| `address[zip]` |  |
| `address[default_shipping]` | Checkbox (+ hidden `false`) |
| `address[default_billing]` | Checkbox (+ hidden `false`) |

* * *

## Platform-injected fields

You do not write these — the form tag adds them when applicable:

| Field | Forms |
| --- | --- |
| `checkout[lock_version]` | `checkout` |
| `product[timestamp]` | `populate_product`, `populate_gift_certificate` |
| `bundle[checkout_digest]`, `bundle[replace_id]` | `populate_bundle` |
| `website_user[reset_password_token]` | `reset_password` |
| `confirmation_token` | `activate_account` |
| `logo[image_cache]` | Logo uploads |
| `frame_token`, `designer_theme_id` | All forms in theme designer preview |
| Hidden search params | `search` when passed `products_search` |
| CAPTCHA script | `registration`, `checkout_registration`, `guest_checkout` |

## CSRF

All forms include a CSRF token automatically **except** `populate_product`, `populate_bundle`, and `populate_gift_certificate`.
