<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/order-history/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Order History

**Template:** `templates/account/order_history.liquid` · **Layout:** default · **Route:** `/account/order_history` · **Requires:** login

## Purpose

Lists the customer's past orders with status, totals, and follow-up actions. The main self-service surface for anything post-purchase.

## Typical use cases

-   Order list with order number, date, status, and total
-   Expandable order details with line items and shipment tracking
-   Reorder action (re-add a past order to the cart)
-   Links to print-friendly order views

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `custom_logos_upload_enabled` | Boolean | Custom logo upload allowed for this user |

Orders come from the user object: `current_user.order_history` (or `current_user.recent_orders`).

Key order properties: `order_id`, `completed_at`, `state`, `grand_total`, `line_items`, `shipments`, `moas_status`.

## Typical structure

```
<h1>Order history</h1>

{% for order in current_user.order_history %}
  <div class="order">
    <h3>{{ order.order_id }} — {{ order.completed_at | date: '%b %d, %Y' }}</h3>
    <p>{{ order.grand_total | money }} · {{ order.state }}</p>

    {% for shipment in order.shipments %}
      <p>Tracking: {{ shipment | tracking_link }}</p>
    {% endfor %}

    {% if site.allow_reordering? %}
      <a href="{{ order | reorder_url }}">Reorder</a>
    {% endif %}
  </div>
{% endfor %}
```

## Notes

-   Reorder links go through `reorder_url`; the platform re-adds every line, then redirects to the cart.
-   For large histories consider `{% paginate %}` over the order collection.
-   Print views ([`print_order`](../approval-and-print/print-order.md)) are available via tokenized URLs from order emails — not linked from here by default.

## Related

-   [Account dashboard](dashboard.md) · [Order and cart drops](../../drops/order-and-cart.md)
