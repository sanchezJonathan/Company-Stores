<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/account-logo-edit/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `account/logo_edit.js` — Account Logo Edit Form

**Template:** `templates/account/logo_edit.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Shows the edit form for an existing account logo (rename, replace image, adjust attributes), typically inside a modal on the account logos page.

## Triggered by

-   Opening an edit flow for an account logo (`GET /account/logos/:id/edit`, JS format)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `logo` | Logo object | The logo being edited |
| `custom_logos_upload_enabled` | Boolean | Whether the user may upload logos |

## Example

```
{% capture form_html %}{% render 'account_logo_form', logo: logo %}{% endcapture %}
document.getElementById('account-logo-modal').innerHTML =
  '{{ form_html | escape_javascript }}';
```

## Related

-   [account/logo\_update.js](account-logo-update.md) · [Account logos page](../account/logos.md)
