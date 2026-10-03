<!-- Source: https://omg.engineering/bsites_services/themes/drops/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Liquid Objects — Index

Objects are structured data available in your Liquid templates — products, orders, users, settings, and more.

## How objects reach templates

| Source | Examples |
| --- | --- |
| **Global variables** (every page) | `site`, `current_user`, `order`, `wishlist`, `pages`, `products`, `categories` |
| **Page variables** | `product`, `bundle`, `form`, `checkout_flow`, `products_search` |
| **Nested properties** | `order.line_items`, `product.options_or_groups`, `user.budgets` |
| **`{% form %}` tag** | Sets `form` to the form state object |

## Error objects

Form and upload objects expose an `errors` property for validation messages:

```
{% if form.errors.any? %}
  {{ form.errors | default_errors }}
{% endif %}
```

Logo uploads use `logo.errors` with an `image` field for file validation errors.

## Domain reference

| File | Objects covered |
| --- | --- |
| [site-and-user.md](site-and-user.md) | Store, user, pages, addresses, fonts |
| [product-catalog.md](product-catalog.md) | Products, bundles, options, search, inventory |
| [order-and-cart.md](order-and-cart.md) | Orders, cart line items, payments, shipments |
| [checkout.md](checkout.md) | Checkout flow and step forms |
| [account.md](account.md) | Registration, profile, address book |
| [logos-and-samples.md](logos-and-samples.md) | Logos, virtual samples, request sample |

## Quick lookup

| Variable | Object type | Scope |
| --- | --- | --- |
| `site` / `shop` / `store` | Store | Global |
| `current_user` | User | Global |
| `order` / `current_order` | Order | Global |
| `wishlist` | Wishlist | Global |
| `settings` | Settings | Global |
| `product` | Product / Catalog product / Gift certificate | Page |
| `bundle` | Bundle | Page |
| `form` | Form state (varies by page) | Page / `{% form %}` |
| `checkout_flow` | Checkout flow | Checkout |
| `products_search` | Search results | Catalog |
