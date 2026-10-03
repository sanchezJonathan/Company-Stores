<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/wishlist-quote-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `wishlist_quote_email` — Wishlist Quote Request

**Template:** `templates/wishlist_quote_email.liquid` · **Layout:** none

## Purpose

Sent to the store (sales team) when a customer requests a quote for their wishlist. Presents the saved items so sales can prepare pricing.

## Sent when

A customer triggers "request quote" on the wishlist page.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `wishlist` | Wishlist object | The wishlist (order-shaped: `line_items`, totals) |
| `current_user` | User object | The requesting customer (same object as on the storefront) |
| `customer` | User object | Same object. Legacy name used by older themes |

## Typical content

```
<p>Quote requested by {{ customer.first_name }} {{ customer.last_name }} ({{ customer.email }})</p>

<table>
  {% for line_item in wishlist.line_items %}
    <tr>
      <td>{{ line_item.product.name }}</td>
      <td>{{ line_item.quantity }}</td>
      <td>{{ line_item.total_price | money }}</td>
    </tr>
  {% endfor %}
</table>
```

## Related

-   [Wishlist page](../storefront/wishlist.md)
