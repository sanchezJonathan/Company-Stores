<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/calculate-gift-certificate-prices/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `calculate_gift_certificate_prices.js` — Live Gift Certificate Pricing

**Template:** `templates/calculate_gift_certificate_prices.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Same idea as [`calculate_prices.js`](calculate-prices.md), for gift certificate products: recomputes the total when the buyer changes the amount or quantity.

## Triggered by

-   AJAX submission on the gift certificate product page (`{{ product | calculate_prices_url }}`)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `form` | Gift certificate form | Recalculated state: `total_price`, `amount`, `quantity`, errors |
| `product` | Gift certificate product | The gift certificate product |

## Example

```
document.getElementById('gc-total').innerHTML = '{{ form.total_price | money }}';
```

## Related

-   [Gift certificate product](../storefront/gift-certificate-product.md)
