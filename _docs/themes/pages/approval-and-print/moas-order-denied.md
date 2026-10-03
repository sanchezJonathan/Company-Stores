<!-- Source: https://omg.engineering/bsites_services/themes/pages/approval-and-print/moas-order-denied/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# MOAS — Order Denied

**Template:** `templates/moas/order_denied.liquid` · **Layout:** default · **Rendered after:** approver clicks Deny

## Purpose

Confirmation page shown to the approver after they deny an order. The platform invalidates the approval token and notifies the customer; this page confirms the action to the approver.

## Typical use cases

-   "Order denied" confirmation with order summary
-   Guidance for the approver (e.g. contact the customer if needed)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The denied order |
| `customer_email` | String | Customer notification email address |

## Typical structure

```
<h1>Order denied</h1>
<p>Order {{ order.order_id }} has been denied.</p>
<p>{{ customer_email }} will be notified.</p>
```

## Related

-   [View order](moas-view-order.md) · [Order approved](moas-order-approved.md)
