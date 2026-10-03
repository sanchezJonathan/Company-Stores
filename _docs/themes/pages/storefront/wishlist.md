<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/wishlist/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Wishlist

**Template:** `templates/wishlist.liquid` · **Layout:** default · **Route:** `/wishlist`

## Purpose

Saved-for-later list. Structurally close to the cart — same line-item concepts — but with wishlist-specific actions: move items to the cart (individually or all at once), request a quote, and empty the list.

## Typical use cases

-   Reviewing saved products with configured options and logos
-   Moving a single line (or bundle line) to the cart
-   Moving everything to the cart
-   Requesting a sales quote for the whole wishlist (sends an email rendered from [`wishlist_quote_email`](../emails/wishlist-quote-email.md))
-   Emptying the wishlist

## Variables

Uses globals only:

| Name | Description |
| --- | --- |
| `wishlist` | The incomplete wishlist order (same shape as a cart order) |

Feature gate: `site.wishlist_enabled?` — wishlists exist only when the store enables them.

## Forms and URLs

| Construct | Purpose |
| --- | --- |
| `{% form 'wishlist' %}` (alias `wishlist_update`) | Update wishlist lines (PUT) |
| `{{ line_item \| move_line_item_to_cart_url }}` | Move one line to cart |
| `{{ bundle_line_item \| move_bundle_item_to_cart_url }}` | Move one bundle line to cart |
| `{{ wishlist_to_cart_url }}` | Move all lines to cart |
| `{{ wishlist_request_quote_url }}` | Request a quote |

## Typical structure

```
{% if site.wishlist_enabled? %}
  <h1>Your wishlist</h1>

  {% if wishlist.line_items_count == 0 %}
    <p>Your wishlist is empty.</p>
  {% else %}
    {% form 'wishlist' %}
      {% for line_item in wishlist.line_items %}
        <div class="wishlist-line">
          {{ line_item.product | link_to_product }} — {{ line_item.total_price | money }}

          <form method="post" action="{{ line_item | move_line_item_to_cart_url }}">
            {{ csrf_meta_tag }}
            <button type="submit">Move to cart</button>
          </form>
        </div>
      {% endfor %}
    {% endform %}

    <form method="post" action="{{ wishlist_to_cart_url }}">{{ csrf_meta_tag }}
      <button type="submit">Move all to cart</button>
    </form>
    <form method="post" action="{{ wishlist_request_quote_url }}">{{ csrf_meta_tag }}
      <button type="submit">Request quote</button>
    </form>
  {% endif %}
{% endif %}
```

## Notes

-   Wishlist mutations are POST/PUT — include `{{ csrf_meta_tag }}` in your layout and keep it available here.
-   Line items expose the same `choices`, logos, and personalization data as cart lines — reuse cart line snippets where possible.

## Related

-   [Cart](cart.md) · [Filters](../../filters.md) (`move_line_item_to_cart_url`, `move_bundle_item_to_cart_url`)
