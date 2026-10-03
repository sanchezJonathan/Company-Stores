<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/product/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Product Detail

**Template:** `templates/product.liquid` · **Layout:** default · **Route:** product URL (`/products/:id-…`)

## Purpose

The single-product page: everything a buyer needs to evaluate and configure one product — imagery, pricing, options, personalization, logo upload, reviews, samples — and the add-to-cart submission. This is typically the most complex template in a theme; decompose it aggressively into snippets and gate every optional feature.

## Typical use cases

-   Standard product purchase with quantity and option selection
-   Tier/quantity discount display
-   Virtual sample preview and "request a physical sample" links
-   Logo selection/upload for branded products (virtual logos, logo locations)
-   Product personalization (engraving, monograms, custom text)
-   Reviews: list, pagination, preview, and submission
-   Related and recently viewed product sections
-   Back-in-stock notifications for out-of-stock items

## Variables

| Name | Type | Always / conditional | Description |
| --- | --- | --- | --- |
| `product` | Product object | Always | The current product |
| `form` | Product form | Always | Configuration state: quantities, options, prices, errors |
| `related_products` | Array | Always | Related products for cross-sell sections |
| `meta_data` | Hash | Always | SEO title/keywords/description |
| `logos` | Array | Always\* | Logos available for this product (\*empty when logo features are off) |
| `logo_required` | Boolean | Always | Whether a logo must be selected before add-to-cart |
| `custom_logos_upload_enabled` | Boolean | Conditional | Custom logo upload allowed (logged-in users only) |
| `new_review` | Review object | Always | Blank review for the review form |
| `logo_locations` | Array | Always | Configured logo placement locations (may be empty) |
| `product_images` | Array | Conditional | Images with logo hot spots (legacy virtual-logo modal) |

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'populate_product' %}` | Configure the product and add to cart (or wishlist with `add_to_wishlist`) |
| `{% form 'product_review' %}` | Submit a review |
| `{% form 'product_logo' %}` | Upload a product logo (multipart) |
| `{% form 'request_sample' %}` | Inline sample request |

Input `name` attributes: see [form fields](../../forms/fields.md).

## Feature gates

Gate each optional block with the matching product helper:

```
{% if product.product_options_enabled? %}      {# option selectors #}
{% if product.product_personalizations_enabled? %} {# personalization inputs #}
{% if product.virtual_samples_enabled? %}      {# virtual sample preview #}
{% if product.virtual_logos_enabled? %}        {# logo picker: {% view_logos product %} #}
{% if product.quantity_discounts_enabled? %}   {# tier pricing table #}
{% if product.inventory_enabled? %}            {# stock messaging #}
{% if site.store_enabled? %}                   {# add-to-cart form at all #}
```

## AJAX partials

| Template | Trigger |
| --- | --- |
| [`calculate_prices.js`](../partials/calculate-prices.md) | Option/quantity change → live price updates |
| [`logos/new.js`, `logos/create.js`](../partials/logos-new.md) | Product logo upload flow |
| [`apply_logo.js`](../partials/apply-logo.md) | Logo applied to a product image preview |
| [`new_review.js` / `preview_review.js` / `create_review.js` / `paginate_reviews.js`](../partials/new-review.md) | Review form interactions |

## Useful filters and tags

```
{% seo_tags %}
{% breadcrumbs 'add', 'categories', title: product.name, url: product.url %}

{{ product | calculate_prices_url }}
{{ product | request_sample_url }}
{{ product | notify_in_stock_url }}
{{ product.price | money }}
```

## Minimal skeleton

```
{% seo_tags %}

<div class="product">
  {% render 'product_gallery', product: product %}

  <div class="product-info">
    <h1>{{ product.name }}</h1>
    <div class="price" id="price-display">{{ form.items_total_price | money }}</div>

    {% form 'populate_product', product, remote: true %}
      {% if product.product_options_enabled? %}{% render 'product_options', product: product, form: form %}{% endif %}
      {% if product.virtual_logos_enabled? %}{% view_logos product %}{% endif %}

      <input type="number" name="product[quantity]" value="{{ form.quantity }}" min="1">
      {% if form.errors.any? %}{{ form.errors | default_errors }}{% endif %}
      <button type="submit">Add to cart</button>
    {% endform %}
  </div>
</div>

{% render 'product_reviews', product: product %}
{% render 'related_products', product: product %}
```

## Related

-   [Catalog product](catalog-product.md) (external catalog variant) · [Gift certificate product](gift-certificate-product.md) · [Bundle](bundle.md)
-   [Product catalog drops](../../drops/product-catalog.md)
