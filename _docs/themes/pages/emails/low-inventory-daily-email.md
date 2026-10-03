<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/low-inventory-daily-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `low_inventory_daily_email` — Low Inventory Digest

**Template:** `templates/low_inventory_daily_email.liquid` · **Layout:** none

## Purpose

Staff-facing digest of inventory items running low — sent to configured store emails so the team can restock. Not customer-facing; optimize for scannability.

## Sent when

A scheduled daily inventory check finds items below their thresholds.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `email` | String | Recipient address |
| `inventory_items` | Array | Low-stock inventory items |
| `limited` | Boolean | True when the list is truncated to a cap |

## Typical content

```
<p>Low inventory for {{ site.name }}:</p>

<table>
  {% for item in inventory_items %}
    <tr><td>{{ item | inventory_row }}</td></tr>
  {% endfor %}
</table>

{% if limited %}
  <p>More items are low on stock — this list is capped for email size.</p>
{% endif %}
```

## Notes

-   The `inventory_row` filter produces a linked "name (SKU), options, N left in inventory" row per item.
-   An older `low_inventory_level_email` template exists in some legacy themes but is **no longer rendered** — this digest is the only low-inventory email.

## Related

-   [Product catalog drops](../../drops/product-catalog.md) · [Filters](../../filters.md) (`inventory_row`)
