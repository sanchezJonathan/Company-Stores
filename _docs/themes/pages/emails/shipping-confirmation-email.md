<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/shipping-confirmation-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `shipping_confirmation_email` — Order Shipped

**Template:** `templates/shipping_confirmation_email.liquid` · **Layout:** none

## Purpose

Notifies the customer that a shipment went out, with tracking information. Sent **once per shipment** — split orders produce one email per shipment.

## Sent when

A shipment is created/tracked for an order.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The order being shipped |
| `current_order` | Order object | Same object (alias) |
| `current_user` | User object | The buyer (`order.customer`). Empty on guest checkout |
| `shipment` | Shipment object | The shipment: `tracking_number`, `tracking_url`, `friendly_name`, `line_items` |
| `user_name` | String | Display name for the greeting |
| `resend` | Boolean | True when this is a resent copy |

## Typical content

```
<p>Hi {{ user_name }}, your order is on the way!</p>

{% if shipment.tracking_number != blank %}
  <p>{{ shipment | tracking_link }}</p>
{% endif %}

<table>
  {% for line_item in shipment.line_items %}
    <tr>
      <td>{{ line_item.product.name }}</td>
      <td>{{ line_item.quantity }}</td>
    </tr>
  {% endfor %}
</table>
```

## Notes

-   Use the `tracking_link` filter — it renders a link when the carrier provides a tracking URL and plain text otherwise.

## Related

-   [Order confirmation email](order-confirmation-email.md) · [Order and cart drops](../../drops/order-and-cart.md)
