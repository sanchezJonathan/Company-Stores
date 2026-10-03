<!-- Source: https://omg.engineering/bsites_services/themes/drops/product-catalog/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Objects — Product Catalog

## Product

**Variable:** `product` (product pages); elements of `products`, `featured_products`

Key properties and methods:

| Property / method | Description |
| --- | --- |
| `product_price`, `final_price`, `total_price` | Calculated prices |
| `inventory_enabled?` | Per-product inventory |
| `virtual_samples_enabled?`, `virtual_logos_enabled?` | Logo/sample features |
| `product_options_enabled?` | Options configured |
| `logo_locations_enabled?` | Logo placement |
| `product_personalizations_enabled?` | Personalization forms |
| `quantity_discounts_enabled?` | Qty discounts active |
| `options_or_groups` | Options and groups collection |
| `product_personalizations` | Personalization definitions |
| `quantity_discount_groups` | Array of discount groups |
| `size_charts` | Array of size chart objects |
| `type` | `"product"` |
| `logo_required?` | Logo required for purchase |

### Shared product properties (all product types)

| Property / method | Description |
| --- | --- |
| `id`, `name`, `sku`, `description`, `note` | Core fields |
| `meta_title`, `meta_description`, `meta_keywords` | SEO |
| `base_price`, `retail_price`, `cost`, `discount`, `save_price` | Pricing |
| `minimum_order_quantity`, `maximum_order_quantity` | Order limits |
| `featured?`, `new_product?` | Badges |
| `url` | Product page URL |
| `thumbnail_image`, `primary_image`, `product_images` | Images |
| `vendors`, `categories`, `related_products` | Relations |
| `approved_reviews`, `average_rate`, `reviews_count` | Reviews |

## Catalog product

**Variable:** `product` on external-catalog pages

Same properties as a standard product, but `type` is `"catalog2_product"`. No inventory or virtual-logo features.

## Bundle

**Variable:** `bundle`

| Property / method | Description |
| --- | --- |
| `id`, `name`, `type` (`"bundle"`), `url` | Identity |
| `base_price`, `product_price`, `final_price`, `total_price` | Pricing |
| `thumbnail_image` | Bundle thumb |
| `products` | Array of bundle member products |
| `vendors`, `categories` | Metadata |

## Bundle member product

**Variable:** `bundle.products[]`

| Property / method | Description |
| --- | --- |
| `id`, `quantity`, `url` | Bundle member |
| `standalone_purchase_enabled?` | Sold separately |
| `form` | Member's add-to-cart form state |
| `options_or_groups` | Options (bundle mode) |
| Delegates | Most properties to the nested `product` object |

## Category

**Variable:** `categories` (global); nested on products

| Property / method | Description |
| --- | --- |
| `id`, `name`, `parent_id` | Category tree |
| `selected?` | Matches current filter |

## Options and groups

**Variable:** `product.options_or_groups`

Enumerable with keyed access:

| Key / method | Description |
| --- | --- |
| `simple` | Flat list for standard UI |
| `all` | All options including grouped |
| `multiple_quantity` | Multi-qty grid options |
| `[option_id]` | Lookup by id |

## Personalizations

**Variable:** `product.product_personalizations`

Enumerable of hashes: `id`, `title`, `amount`, `inputs[]` with field definitions.

## Gift certificate product

**Variable:** `product` on gift-certificate pages

Adds: `allow_custom_amount?`, `required_first_name?`, `amounts`, `min_amount`, `max_amount`, `type` → `"gift_certificate"`

## Product variant

**Variable:** `form.variants` (add-to-cart form)

`product`, `quantity`, `unit_price`, `total_price`, `in_stock?`, `stock_message`, `choices`, `inventory_item`

## Search results

**Variable:** `products_search` (catalog/search pages)

| Method | Description |
| --- | --- |
| `filter_by(rule)` | Filter facet results |
| `paginate(page:, per_page:)` | Chainable pagination |
| `sort_options`, `sortable?` | Sort UI |
| `selected_keywords` | Active keyword filters |
| `current_page`, `total_pages`, `total` | Pagination state |
| `empty?`, `each`, `size` | Collection API |

## Add-to-cart form

**Variable:** `form` via `{% form 'populate_product' %}`

| Property / method | Description |
| --- | --- |
| `quantity`, `variants`, `proof_approval` | Form state |
| `errors` | Top-level errors |
| `logo`, `selected_logos` | Logo selections |
| `items_total_price`, `summary` | Price summary |
| `grid` | Multi-qty option grid |
| `personalizations`, `options` | Submitted values + errors |

## Bundle form / Gift certificate form

-   **Bundle** (`{% form 'populate_bundle' %}`): `total_price`, `checkout_digest`, `errors`, `editing?`
-   **Gift certificate** (`{% form 'populate_gift_certificate' %}`): `amount`, `quantity`, `variants`, `allow_custom_amount`, `amount_options`

## Inventory item

**Variable:** nested in variants and inventory displays

`id`, `inventory`, `product`, `in_stock?`, `stock_message`, `sub_options`

## Image / ProductImage

`image_url`, `thumb_url`, `small_url`, `medium_url`, `large_url`; ProductImage adds `primary?`, `view_logo_thumb_url`

## ProductReview

**Variable:** `review` (review forms); `product.reviews[]`

`id`, `title`, `author`, `body`, `rating`, `created_at`, `errors`
