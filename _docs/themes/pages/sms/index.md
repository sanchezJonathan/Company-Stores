<!-- Source: https://omg.engineering/bsites_services/themes/pages/sms/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# SMS Templates

SMS notifications are rendered from `templates/sms/*.txt.liquid` — **plain text, no layout, no HTML**. Messages are delivered via the store's SMS provider, so keep them short and link-light.

## Ground rules

-   Plain text only. No HTML tags, no markdown.
-   Every SMS template receives `site`, `order`, and the standard storefront URL helpers (`login_url`, `store_url`, …) plus the message-specific variables listed per template.
-   Character limits matter — a URL alone can cost 20+ characters. Prefer one link per message.
-   `resend` (where listed) flags a re-sent copy.

## The templates

| Template | Sent when | Doc |
| --- | --- | --- |
| `sms/order_confirmation.txt` | Order placed | [Order confirmation SMS](order-confirmation.md) |
| `sms/shipping_confirmation.txt` | Order shipped | [Shipping confirmation SMS](shipping-confirmation.md) |
| `sms/moas_approval.txt` | Manager approval needed | [MOAS approval SMS](moas-approval.md) |
| `sms/moas_order_approved.txt` | Order approved | [MOAS approved SMS](moas-order-approved.md) |
| `sms/moas_order_denied.txt` | Order denied | [MOAS denied SMS](moas-order-denied.md) |

## Deprecated templates

`sms/split_shipping_confirmation.txt` exists in some older themes but is **no longer rendered** — shipping notifications go through [shipping confirmation SMS](shipping-confirmation.md) once per shipment. Safe to remove.

## Example

```
Your {{ site.name }} order {{ order.order_id }} is confirmed! Details: {{ login_url }}
```

## Related

-   [Email templates](../emails/index.md)
