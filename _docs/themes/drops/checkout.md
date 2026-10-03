<!-- Source: https://omg.engineering/bsites_services/themes/drops/checkout/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Objects — Checkout

The checkout template (`templates/checkout.liquid`) provides:

| Variable | Description |
| --- | --- |
| `order` | Current checkout order |
| `checkout_flow` | Active step and progress |
| `custom_data_collections` | Custom checkout question definitions |
| `form` | Current step's form state |

## CheckoutFlow

**Variable:** `checkout_flow`

| Property | Description |
| --- | --- |
| `state` | Current step (`address`, `delivery`, `payment`, …) |
| `passed_states` | Steps already completed |
| `last_state?` | On final step |

## Address form

**Variable:** `form` on address step

Bracket access returns `{value, errors}` for each field:

-   Contact: `first_name`, `last_name`, `email`, `phone`
-   Address: `nickname`, `company`, `first_address`, `second_address`, `city`, `zip`, `country`, `state`

Also: `available_addresses`, `save_to_address`, maxlength limits per field.

## Delivery form

**Variable:** `form` on delivery step

| Property | Description |
| --- | --- |
| `shipments` | Shipping options: `id`, `name`, `amount`, `shipment_id` |
| `errors` | Validation messages |

## Payment form

**Variable:** `form` on payment step

| Property | Description |
| --- | --- |
| `address` | Billing address fields |
| `available_payment_methods` | Payment method options |
| `enough_balance?` | Account balance covers order |
| `use_same_as_shipping_address?` | Copy shipping to billing |
| `apply_gift_certificate?`, `apply_coupon_code?`, `use_balance?` | Payment option toggles |
| `gift_certificate`, `coupon_code` | Entered codes |

## Custom data collection form

**Variable:** `form` on custom data step

`custom_data_collections` — nested values and errors by form and input id.

## Custom data collections

**Variable:** `custom_data_collections` (checkout summary sidebar)

List of form definitions with `id`, `title`, `amount`, and `inputs[]` field definitions.
