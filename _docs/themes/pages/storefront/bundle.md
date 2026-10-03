<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/bundle/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Bundle Detail

**Template:** `templates/bundle.liquid` · **Layout:** default · **Route:** bundle URL

## Purpose

Configuration page for product **bundles** — kits of several products purchased together. The page presents the bundle as a whole and lets the buyer configure **each member product** (options, quantities, logos) within one combined add-to-cart form.

## Typical use cases

-   Kits and packs ("starter kit", "team package") where members are configured individually
-   Bundles with per-member option selection and logo requirements
-   Showing bundle-level pricing that updates as members are configured

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `bundle` | Bundle object | The current bundle |
| `form` | Bundle form | Bundle-wide form state with a nested form per member product |
| `meta_data` | Hash | SEO metadata (title = bundle name) |

Key `bundle` properties: `products` (member objects), `base_price`, `total_price`, `thumbnail_image`, `url`, `active?`.

Each member in `bundle.products` behaves like a mini product: it exposes its own options/groups and per-member settings (field prefix, logo locations, available logos, logo requirements) provided by the platform through the bundle form.

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'populate_bundle' %}` | Single form wrapping all member configuration; submits the whole bundle to the cart |

Member inputs are namespaced under `bundle[products][<member_id>]…` — the platform sets the correct prefix per member; see [form fields](../../forms/fields.md).

## Typical structure

```
{% seo_tags %}
{% breadcrumbs 'add', 'bundles', title: bundle.name, url: bundle.url %}

<h1>{{ bundle.name }}</h1>
<img src="{{ bundle.thumbnail_image }}" alt="{{ bundle.name }}">

{% form 'populate_bundle', bundle %}
  {% for member in bundle.products %}
    <section class="bundle-member">
      <h3>{{ member.name }}</h3>
      {% if member.product_options_enabled? %}
        {% render 'bundle_member_options', member: member, form: form %}
      {% endif %}
    </section>
  {% endfor %}

  <div class="bundle-total">{{ form.total_price | money }}</div>
  <button type="submit">Add bundle to cart</button>
{% endform %}
```

## Notes

-   Reuse your product-option snippets where possible — member configuration mirrors product-page option rendering.
-   Failed add-to-cart re-renders this template with flash errors; surface `flash_errors` (global) or form errors.
-   Inactive bundles redirect to the homepage with an error flash — the template only renders for active bundles.

## Related

-   [Product detail](product.md) · [Cart](cart.md) · [Product catalog drops](../../drops/product-catalog.md)
