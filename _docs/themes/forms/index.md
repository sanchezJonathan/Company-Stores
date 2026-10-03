<!-- Source: https://omg.engineering/bsites_services/themes/forms/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Liquid Forms

All storefront submissions use the `{% form %}` tag. Standard HTML `<form>` tags are not supported for store actions.

The `{% form %}` tag handles the **submit URL, HTTP method, and hidden platform fields**. You provide the visible inputs — their `name` attributes must match what the platform expects.

## Syntax

```
{% form 'form_name'[, object][, remote: true, ajax: true, context_name: 'builder'] %}
  <!-- your inputs here -->
{% endform %}
```

| Attribute | Purpose |
| --- | --- |
| `remote` / `ajax` | Enable AJAX submission |
| `context_name` | Variable name for the form builder (default: `builder`) |

## Implementing a form — three sources

| What you need | Where to find it |
| --- | --- |
| **Form name** and HTTP method | Tables below |
| **Input `name` attributes** | **[fields.md](fields.md)** — required reading when building markup |
| **Current values and errors** | Page doc + `form` object (see [drops/index.md](../drops/index.md)) |

Example workflow for add-to-cart:

1.  Form name: `populate_product` (below)
2.  Field names: `product[quantity]`, `product[options][…]` → [fields.md](fields.md#populate_product)
3.  Values/errors: `form.quantity`, `form.errors`, `form.options` → [product detail page](../pages/storefront/product.md)

## Field reference

→ **[fields.md](fields.md)** — complete list of `name` attributes per form, including dynamic fields (options, personalizations, checkout steps) and namespace mismatches.

## Authentication & account

| Form name | Aliases | Method | Purpose |
| --- | --- | --- | --- |
| `login` | — | POST | User login |
| `registration` | `create_account` | POST | New account signup |
| `checkout_registration` | `create_checkout_account` | POST | Register during checkout |
| `guest_checkout` | — | PUT | Guest checkout email |
| `recover_password` | `recover_account_password` | POST | Request password reset |
| `reset_password` | `reset_account_password` | PUT | Set new password with token |
| `resend_confirmation` | `resend_account_confirmation` | POST | Resend confirmation email |
| `activate_account` | `activate_account_password` | POST | Activate account with token |
| `user` | `account_edit` | PUT | Edit account profile |
| `passcode` | — | POST | Submit multi-storefront passcode |
| `clear_passcode` | — | DELETE | Clear passcode session |

## Cart & checkout

| Form name | Aliases | Method | Purpose |
| --- | --- | --- | --- |
| `cart` | `update_cart` | PUT | Update cart line items |
| `checkout` | — | PUT | Checkout step submission |
| `wishlist` | `wishlist_update` | PUT | Update wishlist |
| `apply_gift_certificate` | — | POST | Apply gift certificate to account |

## Product configuration

| Form name | Aliases | Method | Purpose |
| --- | --- | --- | --- |
| `populate_product` | — | POST | Configure and add product to cart |
| `populate_bundle` | — | POST | Add bundle to cart |
| `populate_gift_certificate` | — | POST | Configure gift certificate product |
| `request_sample` | — | POST | Request product sample |
| `product_review` | `add_product_review` | POST | Submit product review |
| `search` | — | GET | Product search |

## Logos

| Form name | Aliases | Method | Purpose |
| --- | --- | --- | --- |
| `product_logo` | — | POST | Upload product logo (multipart) |
| `account_logo` | `logo_upload`, `edit_logo`, `edit_account_logo` | POST/PUT | Upload/edit account logo (multipart) |

## Addresses

| Form name | Aliases | Method | Purpose |
| --- | --- | --- | --- |
| `new_address` | — | POST | Create account address |
| `address` | `account_address`, `user_address` | PUT | Edit existing address (pass address object) |

## Example

```
{% form 'populate_product', product %}
  <input type="number" name="product[quantity]" value="{{ form.quantity }}">
  {% if form.errors.any? %}
    {{ form.errors | default_errors }}
  {% endif %}
  <button type="submit">Add to cart</button>
{% endform %}
```

## Notes

-   Field names are documented in [fields.md](fields.md) — the form tag alone does not tell you what inputs to write
-   Registration, checkout registration, and guest checkout include CAPTCHA when enabled on the store
-   In theme designer preview mode, hidden fields are added automatically to all forms
