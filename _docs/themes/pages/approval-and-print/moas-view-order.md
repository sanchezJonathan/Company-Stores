<!-- Source: https://omg.engineering/bsites_services/themes/pages/approval-and-print/moas-view-order/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# MOAS — View Order (Approver View)

**Template:** `templates/moas/view_order.liquid` · **Layout:** none (standalone) · **Route:** tokenized link from the approver email

## Purpose

Manager-Order-Approval-System (MOAS): when a store requires manager approval, the approver receives [`order_approver_email`](../emails/order-approver-email.md) with a tokenized link to this page. It shows the pending order in full and offers **Approve** / **Deny** actions — no login required, the token is the credential.

## Typical use cases

-   Present the pending order: line items, totals, customer, notes
-   Approve / deny buttons wired to the tokenized platform URLs
-   Standalone, print-friendly layout (approvers often open this on phones or forward it)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The order pending approval |
| `approve_order_url` | String | Tokenized approval URL (GET) |
| `deny_order_url` | String | Tokenized denial URL (GET) |

## Typical structure

The template renders without a layout — output a complete document:

```
<!DOCTYPE html>
<html>
<head><title>Order {{ order.order_id }} — approval</title></head>
<body>
  <h1>Order {{ order.order_id }} needs approval</h1>
  <p>Placed by: {{ order.customer_email }}</p>

  <table>
    {% for line_item in order.line_items %}
      <tr>
        <td>{{ line_item.product.name }}</td>
        <td>{{ line_item.quantity }}</td>
        <td>{{ line_item.total_price | money }}</td>
      </tr>
    {% endfor %}
  </table>
  <p>Total: {{ order.grand_total | money }}</p>

  <a href="{{ approve_order_url }}" class="btn-approve">Approve</a>
  <a href="{{ deny_order_url }}" class="btn-deny">Deny</a>
</body>
</html>
```

## Notes

-   Approve/deny are simple links (GET) — style them as buttons.
-   Expired or unknown tokens render the [token expired page](moas-token-expired.md) (or 404 if the theme lacks it).
-   Keep global-session usage out of this template: approvers are not logged into the store.

## Related

-   [Order approved](moas-order-approved.md) · [Order denied](moas-order-denied.md) · [Approver email](../emails/order-approver-email.md)
