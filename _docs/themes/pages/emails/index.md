<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Email Templates

Transactional emails are rendered from your theme's `templates/*_email.liquid` files. They render as **standalone HTML — no layout wrapper** — and must carry their own document structure and styling.

## Ground rules

-   **Inline your CSS.** Most email clients strip `<style>` blocks and all external stylesheets. Use inline `style="…"` attributes or table attributes.
-   **Table-based layouts** still give the best client compatibility.
-   Global store variables are available (`site`/`shop`/`store`, URL helpers like `store_url` and `login_url`) plus the message-specific variables listed per template.
-   Emails render outside any storefront session — no `current_user`, no `order` unless the template provides it.

## Shared snippets

Themes usually keep one email chrome snippet (logo, header, footer, styles) and render it from every email template:

```
{% render 'email_header' %}
<p>Hi {{ user_name }}, your order {{ order.order_id }} is confirmed.</p>
{% render 'email_order_lines', order: order %}
{% render 'email_footer' %}
```

## The templates

### Account lifecycle

| Template | Sent when |
| --- | --- |
| [confirmation\_email](confirmation-email.md) | Account confirmation requested |
| [reset\_password\_email](reset-password-email.md) | Password reset requested |
| [welcome\_email](welcome-email.md) | Account created |

### Orders & fulfillment

| Template | Sent when |
| --- | --- |
| [order\_confirmation\_email](order-confirmation-email.md) | Order placed |
| [shipping\_confirmation\_email](shipping-confirmation-email.md) | Order shipped (per shipment) |
| [order\_approver\_email](order-approver-email.md) | Order needs manager approval (MOAS) |

### Store features

| Template | Sent when |
| --- | --- |
| [wishlist\_quote\_email](wishlist-quote-email.md) | Quote requested for a wishlist |
| [request\_sample\_email](request-sample-email.md) | Product sample requested |
| [gift\_certificate\_email](gift-certificate-email.md) | Gift certificate delivered |

### Inventory notifications (store staff)

| Template | Sent when |
| --- | --- |
| [in\_stock\_email](in-stock-email.md) | A product comes back in stock |
| [low\_inventory\_daily\_email](low-inventory-daily-email.md) | Daily low-inventory digest |

## Deprecated templates

These files exist in some older themes but are **no longer rendered** by the platform — safe to remove:

| Template | Status |
| --- | --- |
| `split_shipping_confirmation_email` | Replaced by `shipping_confirmation_email` (one email per shipment) |
| `low_inventory_level_email` | Replaced by `low_inventory_daily_email` |

## Related

-   [SMS templates](../sms/index.md) · [Drops: order and cart](../../drops/order-and-cart.md)
