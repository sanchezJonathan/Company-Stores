<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/gift-certificate-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `gift_certificate_email` — Gift Certificate Delivered

**Template:** `templates/gift_certificate_email.liquid` · **Layout:** none

## Purpose

Delivers a purchased gift certificate to its recipient (or the buyer, per store flow): the code/redeem instructions and amount.

## Sent when

A gift certificate is issued after purchase.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `gift_certificate` | Gift certificate object | The issued certificate: amount, code, recipient details |

## Typical content

```
<p>You've received a {{ gift_certificate.amount | money }} gift certificate from {{ site.name }}!</p>
<p>Code: <strong>{{ gift_certificate.code }}</strong></p>
<p>Apply it at checkout to redeem.</p>
```

## Notes

-   The exact properties available on `gift_certificate` are documented in [order and cart drops](../../drops/order-and-cart.md).

## Related

-   [Gift certificate product page](../storefront/gift-certificate-product.md)
