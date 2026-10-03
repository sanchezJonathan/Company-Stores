<!-- Source: https://omg.engineering/bsites_services/themes/drops/order-and-cart/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Objects — Order & Cart

## Order

**Variable:** `order`, `current_order` (global cart); completed orders in `user.order_history`

| Property / method | Description |
| --- | --- |
| `order_id`, `completed?`, `completed_at` | Identity / state |
| `customer`, `customer_email`, `best_customer_name` | Buyer info |
| `status`, `state` | Human-readable status |
| `item_total`, `setup_charge_total`, `cart_total`, `grand_total` | Totals |
| `line_items`, `line_items_count` | Cart contents |
| `shipment_total`, `promo_total`, `tax_total`, `taxes_total` | Component totals |
| `balance_total` | Paid from account balance |
| `before_tax_total`, `order_total` | Computed totals |
| `shipment`, `shipping_address`, `billing_address` | Shipping/billing |
| `shipping_contact`, `billing_contact` | Contacts |
| `payments`, `coupons` | Payment records |
| `custom_data_collections` | Checkout CDC answers |
| `moas_status`, `moas_order?`, `moas_pending?` | Manager approval |
| `budget_order?`, `budget` | Budget checkout |
| `tax_enabled?` | Site tax config |

## Wishlist

**Variable:** `wishlist` (global)

Same interface as `Order` — separate incomplete order used as wishlist.

## LineItem

**Variable:** `order.line_items[]`

| Property / method | Description |
| --- | --- |
| `id`, `final_sku`, `quantity`, `note` | Line identity |
| `product` | Live product object |
| `product_price`, `unit_price`, `total_price` | Pricing |
| `options_price`, `personalizations_price` | Add-on pricing |
| `outdated?`, `gift_certificate?` | State flags |
| `errors`, `choices` | Validation / options |
| `personalizations` | Personalization answers |
| `gift_certificate_details`, `gift_certificate_code` | GC lines |
| `image` | Virtual sample or product image |
| `logo`, `logos` | Logo choices |
| `display_stock` | Inventory message |

## Shipment / OrderShipment

| Property / method | Description |
| --- | --- |
| `id`, `friendly_name`, `tracking_number` | Identity |
| `tracking_url`, `has_tracking_number_link?` | Tracking |
| `in_hands_date`, `ship_date`, `note` | Dates |
| `line_items` | Shipped items |

## Payment / PaymentMethod

### Payment

`id`, `type`, `total`, `amount`, `payment_name`, `credit_card_lastfour`

### PaymentMethod

`id`, `active`, `name`, `method_name`, `display_name`

## Order coupon

**Variable:** `order.coupons[]`

`id`, `note`, `amount`

## GiftCertificate / GiftCertificateDetails

-   **GiftCertificate:** `certificate_id`, `message`, `value`, `full_name`
-   **GiftCertificateDetails:** `first_name`, `last_name`, `email`, `message`

## Budget bucket

**Variable:** `order.budget`; `user.budgets[]`

`id`, `name`, `code`, `balance`, `allow_negative?`

## Custom data collection (completed orders)

`id`, `title`, `amount`, `attributes` — persisted CDC answers on completed orders.
