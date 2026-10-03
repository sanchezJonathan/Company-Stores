<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/account-logo-new/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `account/logo_new.js` — Account Logo Form

**Template:** `templates/account/logo_new.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Shows the **account logo** upload form (the buyer's personal logo library) — the account-side counterpart of [`logos/new.js`](logos-new.md).

## Triggered by

-   Opening the new-logo flow on the account logos page (`GET /account/logos/new`, JS format)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `logo` | Logo object | A blank logo object for the form |

## Example

```
{% capture form_html %}{% render 'account_logo_form' %}{% endcapture %}
document.getElementById('account-logo-modal').innerHTML =
  '{{ form_html | escape_javascript }}';
```

## Related

-   [account/logo\_create.js](account-logo-create.md) · [Account logos page](../account/logos.md)
