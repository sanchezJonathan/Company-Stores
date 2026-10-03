<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/request-sample/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Request Sample

**Template:** `templates/request_sample.liquid` · **Layout:** none (standalone) · **Route:** `{product_url}/request_sample`

## Purpose

The physical sample request form for a product. Buyers provide a shipping address and sample options; the platform records the request and notifies the store (see [`request_sample_email`](../emails/request-sample-email.md)). The template renders **without a layout** — it is a full standalone document.

## Typical use cases

-   Requesting a physical sample before a bulk order
-   Collecting the sample shipping address and option choices
-   Showing sample availability messaging (limits, stock)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `product` | Product object | The product being sampled |

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'request_sample' %}` | Submit the sample request (POST) |

## Typical structure

Because there is no layout, output a complete HTML document:

```
<!DOCTYPE html>
<html>
<head><title>Request sample — {{ product.name }}</title></head>
<body>
  <h1>Request a sample of {{ product.name }}</h1>

  {% form 'request_sample' %}
    {% render 'address_fields', form: form %}
    {% if product.product_options_enabled? %}
      {% render 'sample_options', product: product, form: form %}
    {% endif %}
    <button type="submit">Request sample</button>
  {% endform %}
</body>
</html>
```

## Notes

-   Validation failures re-render this template (status 422) with form errors — render `form.errors`.
-   Link here from the product page with the `request_sample_url` filter.
-   Virtual samples are a separate feature handled on the product page itself (`product.virtual_samples_enabled?`).

## Related

-   [Product detail](product.md) · [Request sample email](../emails/request-sample-email.md) · [Logos and samples drops](../../drops/logos-and-samples.md)
