<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/order-approver-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `order_approver_email` — Manager Approval Request (MOAS)

**Template:** `templates/order_approver_email.liquid` · **Layout:** none

## Purpose

Sent to the designated approver when an order requires manager approval. Contains the tokenized links the approver uses to review, approve, or deny the order — email links are the entire approval UI entry point.

## Sent when

An order that requires approval is placed.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The order pending approval |
| `user_name` | String | Placing customer's display name |
| `approver_email` | String | Approver's email address |
| `second_level_buttons` | Collection | Second-level approval buttons (when multi-level approval is configured) |
| `view_order_url` | String | Link to the [approver order view](../approval-and-print/moas-view-order.md) |
| `approve_order_url` | String | One-click approval link |
| `deny_order_url` | String | One-click denial link |
| `resend` | Boolean | True when this is a resent copy |

## Typical content

```
<p>An order from {{ user_name }} needs your approval.</p>

<table>
  {% for line_item in order.line_items %}
    <tr>
      <td>{{ line_item.product.name }} × {{ line_item.quantity }}</td>
      <td>{{ line_item.total_price | money }}</td>
    </tr>
  {% endfor %}
</table>
<p>Total: {{ order.grand_total | money }}</p>

<p>
  <a href="{{ view_order_url }}">Review order</a> ·
  <a href="{{ approve_order_url }}">Approve</a> ·
  <a href="{{ deny_order_url }}">Deny</a>
</p>
```

## Notes

-   Keep the three action links prominent — approvers frequently act directly from the email.

## Related

-   [MOAS view order page](../approval-and-print/moas-view-order.md)
