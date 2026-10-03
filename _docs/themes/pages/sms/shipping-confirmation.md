<!-- Source: https://omg.engineering/bsites_services/themes/pages/sms/shipping-confirmation/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `sms/shipping_confirmation.txt` — Order Shipped SMS

**Template:** `templates/sms/shipping_confirmation.txt.liquid` · **Format:** plain text

## Purpose

Tells the customer their order shipped, with tracking info when available. Sent once per shipment.

## Sent when

A shipment goes out (stores with SMS notifications configured).

## Variables

| Name | Description |
| --- | --- |
| `order` | The order |
| `shipment` | The shipment (`tracking_number`, `tracking_url`) |
| `site` | The store |
| `login_url` | Link to the account/order view |
| `resend` | True when this is a resent copy |
| URL helpers | Standard storefront URL helpers |

## Example

```
Your {{ site.name }} order shipped!{% if shipment.tracking_number != blank %} Tracking: {{ shipment.tracking_number }}{% endif %} Details: {{ login_url }}
```

## Notes

-   SMS can't use the `tracking_link` filter (it emits HTML) — output the raw tracking number or `shipment.tracking_url`.

## Related

-   [Shipping confirmation email](../emails/shipping-confirmation-email.md) · [SMS overview](index.md)
