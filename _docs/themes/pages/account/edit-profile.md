<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/edit-profile/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Edit Profile

**Template:** `templates/account/edit.liquid` · **Layout:** default · **Route:** `/account/edit` · **Requires:** login

## Purpose

Lets the customer update their own profile: contact details, name, and store-defined custom user fields. Password changes and username rules follow the store's account policy — the platform enforces them on submit.

## Typical use cases

-   Update first/last name, email, phone
-   Edit custom user fields (the same fields shown at registration)
-   Surface validation errors from failed saves

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `account` | User object | The current user (profile values) |

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'user' %}` (alias `account_edit`) | Update the profile (PUT) |

## Typical structure

```
<h1>Edit profile</h1>

{% form 'user' %}
  <input type="text" name="website_user[first_name]" value="{{ account.first_name }}">
  <input type="text" name="website_user[last_name]" value="{{ account.last_name }}">
  <input type="email" name="website_user[email]" value="{{ account.email }}">

  {% for field in account.custom_user_fields %}
    {% render 'custom_user_field', field: field, account: account %}
  {% endfor %}

  {% if flash_errors.size > 0 %}
    <p class="error">{{ flash_errors | join: ', ' }}</p>
  {% endif %}

  <button type="submit">Save changes</button>
{% endform %}
```

## Notes

-   Field names follow the `website_user[...]` namespace — see [form fields](../../forms/fields.md).
-   Successful saves redirect back with a success flash; render `flash_notices`.

## Related

-   [Account dashboard](dashboard.md) · [Registration](register.md) · [Account drops](../../drops/account.md)
