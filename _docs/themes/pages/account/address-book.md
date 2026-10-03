<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/address-book/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Address Book

**Template:** `templates/account/address_book.liquid` · **Layout:** default · **Route:** `/account/addresses` · **Requires:** login

## Purpose

Manages the customer's saved addresses. Saved addresses speed up checkout (address dropdowns on the address step) and keep shipping details consistent across orders.

## Typical use cases

-   List of saved addresses with labels and formatted fields
-   Add-new-address form
-   Inline edit of an existing address
-   Delete address
-   Address suggestions/standardization (platform endpoint per address)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `address_book` | AddressBook object | The user's saved addresses |
| `custom_logos_upload_enabled` | Boolean | Custom logo upload allowed for this user |

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'new_address' %}` | Create a new address (POST) |
| `{% form 'address', address %}` | Edit an existing address — pass the address object (PUT) |

Address field inputs (`address[first_name]`, `address[address1]`, `address[country]`, …) are listed in [form fields](../../forms/fields.md). Use `{% country_select_options %}` and `{% state_select_options %}` for the country/state selects.

## Typical structure

```
<h1>Address book</h1>

{% for address in address_book.addresses %}
  <div class="address-card">
    {% render 'address_preview', address: address %}
    <a href="{{ address | account_address_url }}" data-edit>Edit</a>
  </div>
{% endfor %}

<h2>Add new address</h2>
{% form 'new_address' %}
  {% render 'address_fields', form: form %}
  <button type="submit">Save address</button>
{% endform %}
```

## Notes

-   Deletion and some mutations are plain endpoints — check [form fields](../../forms/fields.md) for the exact mechanics.
-   The address-suggestions endpoint (`account_address_url` filter) supports address standardization flows; wire it with your own JS if you use it.

## Related

-   [Checkout address step](../storefront/checkout.md) · [Account drops](../../drops/account.md)
