<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# AJAX Partials (`*.js.liquid`)

Templates ending in `.js.liquid` are rendered as **JavaScript responses** — no layout wrapper, no HTML document. The platform renders them in reply to AJAX form submissions and dynamic endpoints; your emitted JS updates the page in place.

## How they're triggered

Add `remote: true` (or `ajax: true`) to a `{% form %}` tag, or call the endpoint from your own JavaScript with the expected format:

```
{% form 'populate_product', product, remote: true %}
  ...
{% endform %}
```

```
// your theme JS
fetch(product.dataset.pricingUrl, { method: 'POST', body: form })
  .then(r => r.text())
  .then(js => eval(js)); // response is your .js.liquid output
```

## Rules of thumb

-   The response body is **your code** — emit JavaScript, typically DOM updates.
-   Escape Liquid values injected into JS with the `escape_javascript` filter (`j`).
-   Money/price values should go through `money` or `json` before embedding.
-   If your theme uses only standard (non-AJAX) submissions, these templates can be minimal or absent where optional — but the platform requests them whenever the related features and AJAX flows are active.

## The partials

| Template | Area |
| --- | --- |
| [calculate\_prices.js](calculate-prices.md) | Live product pricing |
| [calculate\_gift\_certificate\_prices.js](calculate-gift-certificate-prices.md) | Live gift certificate pricing |
| [recently\_viewed\_products.js](recently-viewed-products-js.md) | Recently viewed widget |
| [create\_review.js](create-review.md) | Review submitted |
| [new\_review.js](new-review.md) | Review form errors (also HTML fallback) |
| [preview\_review.js](preview-review.md) | Review preview |
| [paginate\_reviews.js](paginate-reviews.md) | Review pagination |
| [logos/new.js](logos-new.md) | Product logo upload form |
| [logos/create.js](logos-create.md) | Product logo uploaded |
| [apply\_logo.js](apply-logo.md) | Logo applied to product image |
| [account/logo\_new.js](account-logo-new.md) | Account logo form |
| [account/logo\_create.js](account-logo-create.md) | Account logo uploaded |
| [account/logo\_edit.js](account-logo-edit.md) | Account logo edit form |
| [account/logo\_update.js](account-logo-update.md) | Account logo updated |

## Related

-   [Forms](../../forms/index.md) — `remote`/`ajax` attributes
-   [Filters](../../filters.md) — `escape_javascript`, `json`, `money`
