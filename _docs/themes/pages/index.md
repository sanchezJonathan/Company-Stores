<!-- Source: https://omg.engineering/bsites_services/themes/pages/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Theme Pages — Master Index

Every row is a **platform page** — a request type the backend renders through your theme's `templates/` files. Each page has a dedicated doc explaining its purpose, variables, and typical use cases.

**Default layout:** `layout/{settings.customer_layout}.liquid` (fallback `theme`) · **Global variables:** every page also receives the [global context](../global-context.md).

## Storefront pages

| Template | Page | Guide |
| --- | --- | --- |
| `index` | Homepage | [Home page](storefront/home.md) |
| `page` | CMS page | [CMS page](storefront/cms-page.md) |
| `catalog_page` | Catalog landing page | [Catalog page](storefront/catalog-page.md) |
| `products` | Product listing / search | [Product listing](storefront/product-listing.md) |
| `product` | Product detail | [Product detail](storefront/product.md) |
| `catalog_product` | External catalog product | [Catalog product](storefront/catalog-product.md) |
| `gift_certificate_product` | Gift certificate product | [Gift certificate product](storefront/gift-certificate-product.md) |
| `bundle` | Bundle detail | [Bundle](storefront/bundle.md) |
| `cart` | Shopping cart | [Cart](storefront/cart.md) |
| `wishlist` | Wishlist | [Wishlist](storefront/wishlist.md) |
| `checkout` | Checkout (all steps) | [Checkout](storefront/checkout.md) |
| `order_confirmation` | Order confirmation | [Order confirmation](storefront/order-confirmation.md) |
| `login` | Login | [Login](storefront/login.md) |
| `request_sample` | Sample request (no layout) | [Request sample](storefront/request-sample.md) |
| `recently_viewed_products` | Recently viewed widget (no layout) | [Recently viewed](storefront/recently-viewed-products.md) |
| `404` | Not found | [404](storefront/404.md) |
| `unauthorized` | Unauthorized (fallback) | [Unauthorized](storefront/unauthorized.md) |
| `permissions_denied_page` | Permissions denied | [Permissions denied](storefront/permissions-denied.md) |

## Account pages (`templates/account/*`)

All require login.

| Template | Guide |
| --- | --- |
| `account/dashboard` | [Dashboard](account/dashboard.md) |
| `account/order_history` | [Order history](account/order-history.md) |
| `account/balance` | [Balance](account/balance.md) |
| `account/budget_info` | [Budget info](account/budget-info.md) |
| `account/address_book` | [Address book](account/address-book.md) |
| `account/logos` | [Account logos](account/logos.md) |
| `account/register` | [Registration](account/register.md) |
| `account/edit` | [Edit profile](account/edit-profile.md) |
| `account/recover_password` | [Password recovery](account/recover-password.md) |
| `account/reset_password` | [Password reset](account/reset-password.md) |
| `account/resend_confirmation` | [Resend confirmation](account/resend-confirmation.md) |
| `account/activate` | [Activate account](account/activate.md) |
| `account/checkout_login` | [Checkout login](account/checkout-login.md) |

## Manager approval (MOAS) & print

| Template | Guide | Layout |
| --- | --- | --- |
| `moas/view_order` | [Approver order view](approval-and-print/moas-view-order.md) | none |
| `moas/order_approved` | [Order approved](approval-and-print/moas-order-approved.md) | default |
| `moas/order_denied` | [Order denied](approval-and-print/moas-order-denied.md) | default |
| `moas/token_expired` | [Token expired](approval-and-print/moas-token-expired.md) (optional) | default |
| `print_order` | [Print single order](approval-and-print/print-order.md) | none |
| `print_orders` | [Print orders list](approval-and-print/print-orders.md) | none |

## AJAX partials (`templates/*.js.liquid`, no layout)

JavaScript responses for dynamic interactions — see the [partials overview](partials/index.md).

| Template | Guide |
| --- | --- |
| `calculate_prices.js` | [Live product pricing](partials/calculate-prices.md) |
| `calculate_gift_certificate_prices.js` | [Live GC pricing](partials/calculate-gift-certificate-prices.md) |
| `recently_viewed_products.js` | [Recently viewed widget](partials/recently-viewed-products-js.md) |
| `create_review.js` | [Review submitted](partials/create-review.md) |
| `new_review` / `new_review.js` | [Review form errors](partials/new-review.md) |
| `preview_review` / `preview_review.js` | [Review preview](partials/preview-review.md) |
| `paginate_reviews.js` | [Review pagination](partials/paginate-reviews.md) |
| `logos/new.js` | [Product logo form](partials/logos-new.md) |
| `logos/create.js` | [Product logo uploaded](partials/logos-create.md) |
| `apply_logo.js` | [Logo applied to image](partials/apply-logo.md) |
| `account/logo_new.js` | [Account logo form](partials/account-logo-new.md) |
| `account/logo_create.js` | [Account logo uploaded](partials/account-logo-create.md) |
| `account/logo_edit.js` | [Account logo edit form](partials/account-logo-edit.md) |
| `account/logo_update.js` | [Account logo updated](partials/account-logo-update.md) |

## Email templates (no layout)

Standalone HTML emails — see the [emails overview](emails/index.md).

| Template | Guide |
| --- | --- |
| `confirmation_email` | [Account confirmation](emails/confirmation-email.md) |
| `reset_password_email` | [Password reset](emails/reset-password-email.md) |
| `welcome_email` | [Welcome](emails/welcome-email.md) |
| `order_confirmation_email` | [Order confirmation](emails/order-confirmation-email.md) |
| `shipping_confirmation_email` | [Shipping confirmation](emails/shipping-confirmation-email.md) |
| `order_approver_email` | [MOAS approval request](emails/order-approver-email.md) |
| `wishlist_quote_email` | [Wishlist quote](emails/wishlist-quote-email.md) |
| `request_sample_email` | [Sample request](emails/request-sample-email.md) |
| `gift_certificate_email` | [Gift certificate delivery](emails/gift-certificate-email.md) |
| `in_stock_email` | [Back in stock](emails/in-stock-email.md) |
| `low_inventory_daily_email` | [Low inventory digest](emails/low-inventory-daily-email.md) |

## SMS templates (no layout)

Plain text messages in `templates/sms/*.txt.liquid` — see the [SMS overview](sms/index.md).

| Template | Guide |
| --- | --- |
| `sms/order_confirmation.txt` | [Order confirmation SMS](sms/order-confirmation.md) |
| `sms/shipping_confirmation.txt` | [Shipping confirmation SMS](sms/shipping-confirmation.md) |
| `sms/moas_approval.txt` | [MOAS approval SMS](sms/moas-approval.md) |
| `sms/moas_order_approved.txt` | [MOAS approved SMS](sms/moas-order-approved.md) |
| `sms/moas_order_denied.txt` | [MOAS denied SMS](sms/moas-order-denied.md) |

## Layout-only

| Template | Page | Notes |
| --- | --- | --- |
| `layout/403` | Forbidden (IP restrictions) | Standalone layout, no inner template |

## Legacy & deprecated templates

Audited against the storefront backend. These are either no longer rendered or only reachable through legacy paths:

| Template | Status |
| --- | --- |
| `adjustments` | **Legacy.** Rendered only through the `{% render_adjustments_template %}` tag, kept for old-style themes. See [Adjustments](storefront/adjustments.md). New themes do not need it. |
| `split_shipping_confirmation_email` | **No longer rendered.** Shipping notifications are sent through `shipping_confirmation_email`, one per shipment. Safe to remove from themes. |
| `sms/split_shipping_confirmation.txt` | **No longer rendered.** Same as above, SMS channel. Safe to remove. |
| `low_inventory_level_email` | **No longer rendered.** Low-inventory alerts go through `low_inventory_daily_email`. Safe to remove. |

Legacy no-op tags that older themes may still contain (`try_it_on`, `user_hot_spot_images`, `google_analytics_track_event`, `google_analytics_ecommerce_tracking`) render empty strings — see [tags](../tags.md).

## Related

-   [Global context](../global-context.md) · [Forms](../forms/index.md) · [Tags](../tags.md) · [Filters](../filters.md) · [Drops](../drops/index.md)
