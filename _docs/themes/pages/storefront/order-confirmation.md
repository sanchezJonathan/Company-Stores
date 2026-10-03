<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/order-confirmation/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Order Confirmation

**Template:** `templates/order_confirmation.liquid` · **Layout:** default · **Rendered after:** successful final checkout step

## Purpose

The thank-you page shown immediately after an order is placed. The platform renders it directly (same request as the successful confirm-step submission) with the completed order attached.

## Typical use cases

-   Order confirmation with order number and totals
-   Line item recap including personalizations and logos
-   Shipping address and chosen shipping method summary
-   Next-step messaging: manager approval pending (MOAS), email confirmation notice, print link
-   Cross-sell or "what happens next" content

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The just-placed order |

Global context is available as usual, but note the cart has been reset at this point — the global `order`/`current_order` no longer refer to the placed order. Use the page's `order` variable.

## Typical structure

```
<h1>Thank you for your order!</h1>
<p>Order number: <strong>{{ order.order_id }}</strong></p>

{% if order.moas_pending? %}
  <p>Your order was sent to your manager for approval.</p>
{% endif %}

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
<p>A confirmation email was sent to {{ order.email }}.</p>
```

## Notes

-   The same order summary markup is often shared with the confirmation email — keep it in a snippet if you want parity.
-   For reorder-capable stores, order history links (`order_history_url`) give users a path back to this order later.

## Related

-   [Checkout](checkout.md) · [Order confirmation email](../emails/order-confirmation-email.md) · [Order and cart drops](../../drops/order-and-cart.md)
