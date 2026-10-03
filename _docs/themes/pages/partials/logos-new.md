<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/logos-new/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `logos/new.js` — Product Logo Upload Form

**Template:** `templates/logos/new.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Displays the **product logo** upload form in the logo flow on a product page (virtual logos feature). Typically injected into a modal when the buyer chooses "upload your own logo".

## Triggered by

-   Opening the new-logo flow on a product page (`GET /logos/new`, JS format)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `logo` | Logo object | A blank logo object for the form |

## Example

```
{% capture form_html %}{% render 'product_logo_form', product: product %}{% endcapture %}
document.getElementById('logo-modal-body').innerHTML =
  '{{ form_html | escape_javascript }}';
```

(`product_logo_form` would wrap `{% form 'product_logo' %}` — see [forms](../../forms/index.md).)

## Related

-   [logos/create.js](logos-create.md) · [apply\_logo.js](apply-logo.md) · [Product detail](../storefront/product.md)
