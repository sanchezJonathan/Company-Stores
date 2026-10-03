<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/paginate-reviews/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `paginate_reviews.js` — Review Pagination

**Template:** `templates/paginate_reviews.js.liquid` · **Layout:** none · **Format:** JavaScript

## Purpose

Loads a page of product reviews without reloading the product page — used by "load more" or paged review lists.

## Triggered by

-   AJAX pagination of the reviews collection on the product page

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `reviews` | Array | The requested page of review objects |

## Example

```
var list = document.getElementById('reviews-list');
{% for review in reviews %}
  list.insertAdjacentHTML('beforeend',
    '<div class="review"><strong>{{ review.title | escape_javascript }}</strong>' +
    '<p>{{ review.body | escape_javascript }}</p></div>');
{% endfor %}
```

## Notes

-   Track the current page in your JS to avoid duplicate loads.

## Related

-   [Product detail](../storefront/product.md) · [create\_review.js](create-review.md)
