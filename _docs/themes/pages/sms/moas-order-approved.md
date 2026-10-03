<!-- Source: https://omg.engineering/bsites_services/themes/pages/sms/moas-order-approved/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `sms/moas_order_approved.txt` — Order Approved SMS

**Template:** `templates/sms/moas_order_approved.txt.liquid` · **Format:** plain text

## Purpose

Notifies the customer by SMS that their manager-approved order was approved and will proceed.

## Sent when

An approver approves a pending order (SMS notifications enabled).

## Variables

| Name | Description |
| --- | --- |
| `order` | The approved order |
| `site` | The store |
| `login_url` | Link to the account/order view |
| URL helpers | Standard storefront URL helpers |

## Example

```
Good news — your {{ site.name }} order {{ order.order_id }} was approved! {{ login_url }}
```

## Related

-   [MOAS approved page](../approval-and-print/moas-order-approved.md) · [SMS overview](index.md)
