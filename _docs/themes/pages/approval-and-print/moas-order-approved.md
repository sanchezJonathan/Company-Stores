<!-- Source: https://omg.engineering/bsites_services/themes/pages/approval-and-print/moas-order-approved/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# MOAS — Order Approved

**Template:** `templates/moas/order_approved.liquid` · **Layout:** default · **Rendered after:** approver clicks Approve

## Purpose

Confirmation page shown to the approver after they approve an order. The platform marks the order approved and continues order processing; this page closes the loop for the approver.

## Typical use cases

-   "Order approved" confirmation with order summary
-   Telling the approver what happens next (customer notified, order processed)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The approved order |
| `customer_email` | String | Customer notification email address |

## Typical structure

```
<h1>Order approved</h1>
<p>Order {{ order.order_id }} has been approved.</p>
<p>{{ customer_email }} will be notified and the order will be processed.</p>
```

## Related

-   [View order](moas-view-order.md) · [Order denied](moas-order-denied.md)
