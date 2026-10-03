<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/create-review/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `create_review.js` — Review Submitted

**Template:** `templates/create_review.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Response after a product review is successfully submitted via AJAX. Typically replaces the review form with a thank-you state or prepends the new review to the list.

## Triggered by

-   AJAX submission of the `product_review` form on the product page

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `review` | Review object | The newly created review |

## Example

```
document.getElementById('review-form').style.display = 'none';
document.getElementById('review-thanks').style.display = 'block';
```

## Related

-   [Product detail](../storefront/product.md) · [new\_review.js](new-review.md) · [paginate\_reviews.js](paginate-reviews.md)
