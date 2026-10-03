<!-- Source: https://omg.engineering/bsites_services/themes/pages/sms/moas-approval/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `sms/moas_approval.txt` — Manager Approval SMS

**Template:** `templates/sms/moas_approval.txt.liquid` · **Format:** plain text

## Purpose

Alerts the approver by SMS that an order awaits their decision, with the link to the approval page.

## Sent when

An approval-required order is placed and the approver has SMS notifications.

## Variables

| Name | Description |
| --- | --- |
| `order` | The pending order |
| `site` | The store |
| `moas_url` | Link to the approver order view |
| `resend` | True when this is a resent copy |
| URL helpers | Standard storefront URL helpers |

## Example

```
{{ site.name }}: order {{ order.order_id }} ({{ order.grand_total | money }}) needs approval: {{ moas_url }}
```

## Related

-   [MOAS view order page](../approval-and-print/moas-view-order.md) · [Approver email](../emails/order-approver-email.md)
