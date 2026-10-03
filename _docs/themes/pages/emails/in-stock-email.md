<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/in-stock-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `in_stock_email` — Back In Stock

**Template:** `templates/in_stock_email.liquid` · **Layout:** none

## Purpose

Notifies a subscribed customer that a product they were waiting for is back in stock. Customers subscribe via the notify-in-stock action on the product page.

## Sent when

Inventory for a watched product becomes available.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `inventory_item` | Inventory item object | The restocked item; exposes the product and stock info |

## Typical content

```
<p>Good news — {{ inventory_item.product.name }} is back in stock!</p>
<p><a href="{{ inventory_item.product.url }}">Buy it now</a></p>
```

## Notes

-   The `inventory_row` filter renders a compact linked summary row if you want details: `{{ inventory_item | inventory_row }}`.

## Related

-   [Product detail page](../storefront/product.md) (`notify_in_stock_url`) · [Product catalog drops](../../drops/product-catalog.md)
