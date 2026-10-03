<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/calculate-prices/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `calculate_prices.js` — Live Product Pricing

**Template:** `templates/calculate_prices.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Recalculates product pricing when the buyer changes options or quantities on the product page, without a full reload. The platform re-runs price calculation with the submitted configuration and renders this partial as the JS response.

## Triggered by

-   AJAX submission of the `populate_product` form (`remote: true`) to the `calculate_prices` endpoint (`{{ product | calculate_prices_url }}`)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `form` | Product form | Recalculated form state: `items_total_price`, `variants`, prices, errors |
| `product` | Product object | The product being configured |

## Example

```
document.getElementById('price-display').innerHTML = '{{ form.items_total_price | money }}';

{% if form.errors.any? %}
  document.getElementById('price-errors').innerHTML = '{{ form.errors | default_errors | escape_javascript }}';
{% else %}
  document.getElementById('price-errors').innerHTML = '';
{% endif %}
```

## Notes

-   Quantity-discount tiers change with quantity — refresh any tier table here too.
-   Keep the response idempotent; it may fire on every option change.

## Related

-   [Product detail](../storefront/product.md) · [calculate\_gift\_certificate\_prices.js](calculate-gift-certificate-prices.md)
