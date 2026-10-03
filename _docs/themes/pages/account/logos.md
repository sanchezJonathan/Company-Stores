<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/logos/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Account Logos

**Template:** `templates/account/logos.liquid` · **Layout:** default · **Route:** `/account/logos` · **Requires:** login

## Purpose

Manages the customer's uploaded **account logos** — brand artwork the user can apply to any logo-enabled product instead of re-uploading every time. This page lists saved logos and provides upload/edit flows.

## Typical use cases

-   Grid of the user's saved logos with previews
-   Upload a new logo (multipart form)
-   Edit logo name/attributes, delete a logo
-   Guidance on logo requirements (file types, sizes)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `custom_logos_upload_enabled` | Boolean | Whether this user may upload custom logos |

The user's logos are available through the user object / logo drops — see [logos and samples drops](../../drops/logos-and-samples.md).

## Forms and partials

| Construct | Purpose |
| --- | --- |
| `{% form 'account_logo' %}` | Upload a new logo (multipart POST) |
| `{% form 'account_logo', logo %}` | Edit an existing logo |
| [`account/logo_new.js`](../partials/account-logo-new.md) | AJAX: new-logo form |
| [`account/logo_create.js`](../partials/account-logo-create.md) | AJAX: upload response |
| [`account/logo_edit.js`](../partials/account-logo-edit.md) | AJAX: edit form |
| [`account/logo_update.js`](../partials/account-logo-update.md) | AJAX: update response |

Filters: `edit_logo_url`, `delete_logo_url`.

## Typical structure

```
{% if custom_logos_upload_enabled %}
  <h1>My logos</h1>

  <div class="logo-grid">
    {% for logo in current_user.logos %}
      <div class="logo-card">
        <img src="{{ logo.image_url }}" alt="{{ logo.name }}">
        <a href="{{ logo | edit_logo_url }}">Edit</a>
      </div>
    {% endfor %}
  </div>

  {% form 'account_logo' %}
    <input type="file" name="logo[image]" required>
    <input type="text" name="logo[name]" placeholder="Logo name">
    <button type="submit">Upload logo</button>
  {% endform %}
{% else %}
  <p>Logo uploads are not available for your account.</p>
{% endif %}
```

## Related

-   [Product detail](../storefront/product.md) (logo selection on products) · [Logos and samples drops](../../drops/logos-and-samples.md)
