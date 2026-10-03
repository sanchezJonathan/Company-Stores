<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/order-confirmation-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `order_confirmation_email` — Order Placed

**Template:** `templates/order_confirmation_email.liquid` · **Layout:** none

## Purpose

The order receipt: confirms the purchase, itemizes the order, and sets expectations (approval flows, shipping timelines). The highest-open-rate transactional email — invest in its layout.

## Sent when

An order is successfully placed. Depending on store settings, copies can go to billing/shipping contacts as well.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The placed order |
| `current_order` | Order object | Same object (alias) |
| `current_user` | User object | The buyer (`order.customer`). Empty on guest checkout |
| `user_name` | String | Display name for the greeting |
| `resend` | Boolean | True when this is a resent copy |

## Typical content

```
<p>Hi {{ user_name }}, thanks for your order!</p>
<p>Order number: {{ order.order_id }}</p>

<table>
  {% for line_item in order.line_items %}
    <tr>
      <td>{{ line_item.product.name }} × {{ line_item.quantity }}</td>
      <td>{{ line_item.total_price | money }}</td>
    </tr>
  {% endfor %}
</table>

<p>Total: {{ order.grand_total | money }}</p>

{% if order.moas_pending? %}
  <p>Your order is pending manager approval.</p>
{% endif %}
```

## Notes

-   The `resend` flag lets you add "this is a copy" messaging.
-   Reuse the line-item snippet from the [order confirmation page](../storefront/order-confirmation.md) for parity.

## Related

-   [Shipping confirmation email](shipping-confirmation-email.md) · [Order and cart drops](../../drops/order-and-cart.md)
