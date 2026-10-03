<!-- Source: https://omg.engineering/bsites_services/themes/pages/approval-and-print/print-order/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Print Single Order

**Template:** `templates/print_order.liquid` · **Layout:** none (standalone) · **Route:** tokenized print link (`/orders/:token/print`)

## Purpose

A clean, print-friendly view of one order for paper trails — packing slips, approval records, office filing. Reached via tokenized links (from order emails or order history flows), so it works without a storefront session.

## Typical use cases

-   Packing slip / order summary printing
-   Fax/email-attached order copies in B2B workflows

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The order to print |

Only the variables above are guaranteed — do not rely on session globals like `current_user` or `current_order` here.

## Typical structure

```
<!DOCTYPE html>
<html>
<head>
  <title>Order {{ order.order_id }}</title>
  <style>
    @media print { .no-print { display: none; } }
    body { font: 12px Arial; }
    table { width: 100%; border-collapse: collapse; }
    td, th { border: 1px solid #ccc; padding: 4px 8px; }
  </style>
</head>
<body>
  <h1>Order {{ order.order_id }}</h1>
  <p>{{ order.completed_at | full_date }}</p>

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
  <button class="no-print" onclick="window.print()">Print</button>
</body>
</html>
```

## Notes

-   Use `@media print` CSS for page breaks and to hide interactive chrome.
-   Include logo/branding via theme settings only if you inline them — the standalone document has no layout.

## Related

-   [Print orders list](print-orders.md) · [Order and cart drops](../../drops/order-and-cart.md)
