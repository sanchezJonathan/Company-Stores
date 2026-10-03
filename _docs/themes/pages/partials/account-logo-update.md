<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/account-logo-update/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `account/logo_update.js` — Account Logo Updated

**Template:** `templates/account/logo_update.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Response after an account logo edit is saved — refresh the affected card or the whole grid.

## Triggered by

-   AJAX submission of the `account_logo` form in edit mode (`PUT /account/logos/:id`, JS format)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `logo` | Logo object | The updated logo |
| `custom_logos_upload_enabled` | Boolean | Whether the user may upload logos |

## Example

```
location.reload(); // simplest: refresh the logos grid
```

## Related

-   [account/logo\_edit.js](account-logo-edit.md) · [Account logos page](../account/logos.md)
