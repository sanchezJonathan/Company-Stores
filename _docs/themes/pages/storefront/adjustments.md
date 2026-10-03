<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/adjustments/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Adjustments (Legacy)

**Template:** `templates/adjustments.liquid` · **Layout:** inherited from the caller · **Status:** legacy

Legacy path

This template is **not** rendered for any platform route. It is only reachable through the legacy `{% render_adjustments_template %}` tag, kept so old-style themes continue to render. New themes should not rely on it.

## Purpose

Historically used to show order/line adjustments (charges, discounts, setup fees) inside other pages. Old themes include it via:

```
{% render_adjustments_template %}
{# or with a custom partial #}
{% render_adjustments_template partial_name: 'my_adjustments' %}
```

The tag renders `templates/{partial_name}.liquid` (default `adjustments`) with the calling page's variables plus any tag attributes.

## Typical use cases

-   None for new themes — build adjustment display directly into the relevant page (cart, checkout, order history) using the `order` object.

## Notes

-   Variables available inside the partial are whatever the calling page provides (the tag forwards the caller's assigns).
-   The tag is documented under [Legacy tags](../../tags.md).

## Related

-   [Cart](cart.md) · [Checkout](checkout.md) · [Order and cart drops](../../drops/order-and-cart.md)
