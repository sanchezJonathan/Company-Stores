<!-- Source: https://omg.engineering/bsites_services/themes/pages/sms/moas-order-denied/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `sms/moas_order_denied.txt` — Order Denied SMS

**Template:** `templates/sms/moas_order_denied.txt.liquid` · **Format:** plain text

## Purpose

Notifies the customer by SMS that their order was denied by the approver.

## Sent when

An approver denies a pending order (SMS notifications enabled).

## Variables

| Name | Description |
| --- | --- |
| `order` | The denied order |
| `site` | The store |
| URL helpers | Standard storefront URL helpers |

## Example

```
Your {{ site.name }} order {{ order.order_id }} was denied. Contact your manager for details.
```

## Related

-   [MOAS denied page](../approval-and-print/moas-order-denied.md) · [SMS overview](index.md)
