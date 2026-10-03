<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/gift-certificate-product/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Gift Certificate Product

**Template:** `templates/gift_certificate_product.liquid` · **Layout:** default · **Route:** `/gift_certificates/:id-…`

## Purpose

Detail page for gift certificate products. Unlike regular products, the buyer configures a **monetary amount** (and optionally recipient details) instead of physical options. The platform provides a dedicated form object with amount/quantity state and live pricing.

## Typical use cases

-   Selling fixed-denomination gift certificates (pick from preset amounts)
-   Custom-amount gift certificates within configured min/max limits
-   Collecting recipient information (name, email) when the store requires it
-   Live total recalculation as amount/quantity change (AJAX)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `product` | Gift certificate product | The gift certificate product |
| `form` | Gift certificate form | Amount, quantity, totals, options, errors |
| `related_products` | Array | Related products |
| `meta_data` | Hash | SEO metadata |
| `new_review` | Review object | Blank review for the review form |

Key `product` properties:

| Property | Description |
| --- | --- |
| `product.allow_custom_amount?` | Whether a free-form amount is allowed |
| `product.amounts` | Preset amount options |
| `product.min_amount` / `product.max_amount` | Custom amount limits |
| `product.required_first_name?` / `product.required_email?` | Required recipient fields |

Key `form` properties: `amount`, `quantity`, `total_price`, `allow_custom_amount`, `amount_options`, `quantity_options`, `variants`, `errors`.

## Forms and partials

| Construct | Purpose |
| --- | --- |
| `{% form 'populate_gift_certificate' %}` | Configure and add the gift certificate to cart |
| [`calculate_gift_certificate_prices.js`](../partials/calculate-gift-certificate-prices.md) | AJAX live pricing on amount/quantity change |

## Typical structure

```
{% seo_tags %}

<h1>{{ product.name }}</h1>

{% form 'populate_gift_certificate', product, remote: true %}
  {% if product.allow_custom_amount? %}
    <input type="number" name="gift_certificate[amount]"
           min="{{ product.min_amount }}" max="{{ product.max_amount }}"
           value="{{ form.amount }}">
  {% else %}
    <select name="gift_certificate[amount]">
      {% for option in form.amount_options %}
        <option value="{{ option }}">{{ option | money }}</option>
      {% endfor %}
    </select>
  {% endif %}

  {% if product.required_email? %}
    <input type="email" name="gift_certificate[recipient_email]" placeholder="Recipient email">
  {% endif %}

  <input type="number" name="gift_certificate[quantity]" value="{{ form.quantity }}" min="1">

  <div id="gc-total">{{ form.total_price | money }}</div>
  <button type="submit">Add to cart</button>
{% endform %}
```

## Notes

-   Exact input names: see [form fields](../../forms/fields.md) (`populate_gift_certificate`).
-   Reviews are supported on gift certificate products (`product_review` form), same as standard products.

## Related

-   [Product detail](product.md) · [Cart](cart.md)
