<!-- Source: https://omg.engineering/bsites_services/themes/pages/approval-and-print/print-orders/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Print Orders List

**Template:** `templates/print_orders.liquid` · **Layout:** none (standalone) · **Route:** tokenized mass-print link (`/orders/:token/mass_print`)

## Purpose

Print-friendly batch view of several orders at once — used in B2B workflows where managers print approvals, reconciliations, or bulk packing documents from a single link.

## Typical use cases

-   Batch printing of multiple orders for offline processing
-   Manager/finance review packets

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `orders` | Array of Order objects | The orders to print |

Session globals (`current_user`, `current_order`) are not available — render from `orders` only.

## Typical structure

```
<!DOCTYPE html>
<html>
<head>
  <title>Orders</title>
  <style>@media print { section.order { page-break-after: always; } }</style>
</head>
<body>
  {% for order in orders %}
    <section class="order">
      <h2>Order {{ order.order_id }}</h2>
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
    </section>
  {% endfor %}
</body>
</html>
```

## Notes

-   Reuse the markup from [`print_order`](print-order.md) per order for consistent output.

## Related

-   [Print single order](print-order.md)
