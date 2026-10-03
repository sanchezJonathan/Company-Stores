<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/cart/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Cart

**Template:** `templates/cart.liquid` · **Layout:** default · **Route:** `/cart`

## Purpose

The shopping cart page: review everything added so far, adjust quantities, remove lines, and proceed to checkout. The platform passes the current order through the global context — this template adds no extra page variables.

## Typical use cases

-   Line item list with product details, selected options, personalizations, and logos
-   Quantity editing and line removal (platform `cart` form)
-   Bundle and gift certificate line rendering (special line shapes)
-   Totals block: item total, setup charges, cart total
-   Handling "outdated" lines (product changed since it was added)
-   Checkout CTA, continue-shopping link, empty-cart state
-   Applying a gift certificate to the order (when the feature is enabled)

## Variables

Uses globals only — see [global context](../../global-context.md):

| Name | Description |
| --- | --- |
| `order` / `current_order` | The incomplete cart order |
| `flash_errors` / `flash_notices` | Messages from cart updates |

Key `order` properties: `line_items`, `line_items_count`, `item_total`, `cart_total`, `grand_total`, `setup_charge_total`.

Key `line_item` properties: `product`, `quantity`, `unit_price`, `total_price`, `choices` (selected options), `outdated?`, `display_stock`, plus bundle/gift-certificate specifics for those line types.

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'cart' %}` (alias `update_cart`) | Update quantities / remove lines (PUT) |
| `{% form 'apply_gift_certificate' %}` | Apply a gift certificate code to the order |

## Typical structure

```
<h1>Your cart</h1>

{% if order.line_items_count == 0 %}
  <p>Your cart is empty. <a href="{{ root_url }}">Continue shopping</a></p>
{% else %}
  {% form 'cart' %}
    <table>
      {% for line_item in order.line_items %}
        <tr>
          <td>{{ line_item.product | link_to_product }}</td>
          <td>
            {% if line_item.outdated? %}<span class="warn">Item changed — review it</span>{% endif %}
            <input type="number" name="order[line_items][{{ line_item.id }}][quantity]"
                   value="{{ line_item.quantity }}">
          </td>
          <td>{{ line_item.total_price | money }}</td>
        </tr>
      {% endfor %}
    </table>
    <button type="submit">Update cart</button>
  {% endform %}

  <div class="totals">
    <p>Subtotal: {{ order.item_total | money }}</p>
    <p>Total: {{ order.cart_total | money }}</p>
  </div>

  <a href="/checkout/start" class="btn">Checkout</a>
{% endif %}
```

## Notes

-   Exact input names for cart updates: see [form fields](../../forms/fields.md).
-   Procurement sessions (punchout / SAP OCI) use their own flows — the platform handles those redirects before this template matters.
-   Cart updates redirect back here with flash messages; always render `flash_errors` / `flash_notices`.

## Related

-   [Wishlist](wishlist.md) · [Checkout](checkout.md) · [Order and cart drops](../../drops/order-and-cart.md)
