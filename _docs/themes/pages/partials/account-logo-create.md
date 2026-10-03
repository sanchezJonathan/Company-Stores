<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/account-logo-create/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `account/logo_create.js` — Account Logo Uploaded

**Template:** `templates/account/logo_create.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Response after an account logo upload succeeds — refresh the logo grid or close the upload modal.

## Triggered by

-   AJAX submission of the `account_logo` form (`POST /account/logos`, JS format)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `logo` | Logo object | The newly created account logo |
| `custom_logos_upload_enabled` | Boolean | Whether the user may upload logos |

## Example

```
location.reload(); // simplest: refresh the logos grid
```

or inject the new card:

```
document.getElementById('logo-grid').insertAdjacentHTML('beforeend',
  '<div class="logo-card"><img src="{{ logo.image_url }}" alt="{{ logo.name | escape_javascript }}"></div>');
```

## Related

-   [account/logo\_new.js](account-logo-new.md) · [Account logos page](../account/logos.md)
