<!-- Source: https://omg.engineering/bsites_services/themes/pages/sms/order-confirmation/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `sms/order_confirmation.txt` — Order Placed SMS

**Template:** `templates/sms/order_confirmation.txt.liquid` · **Format:** plain text

## Purpose

Confirms an order placement over SMS — an optional channel for stores with SMS notifications enabled.

## Sent when

An order is placed (stores with SMS notifications configured).

## Variables

| Name | Description |
| --- | --- |
| `order` | The placed order |
| `site` | The store |
| `login_url` | Link to the account/order view |
| `resend` | True when this is a resent copy |
| URL helpers | Standard storefront URL helpers |

## Example

```
Thanks {{ site.name }} customer! Order {{ order.order_id }} confirmed ({{ order.grand_total | money }}). View: {{ login_url }}
```

## Related

-   [Order confirmation email](../emails/order-confirmation-email.md) · [SMS overview](index.md)
