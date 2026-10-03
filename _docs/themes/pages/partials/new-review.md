<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/new-review/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `new_review.js` / `new_review` — Review Form Errors

**Templates:** `templates/new_review.js.liquid` (AJAX) and `templates/new_review.liquid` (HTML fallback) · **Layout:** none

## Purpose

Rendered when a review submission **fails validation** (missing rating, empty body, etc.). The AJAX variant returns JS that re-renders the form with errors; the HTML variant is the non-AJAX fallback, rendering the review form as an HTML fragment.

## Triggered by

-   Failed `product_review` form submission (AJAX → `new_review.js`; standard POST → `new_review`)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `review` | Review object | The rejected review, with `errors` and submitted values |

## Example (`new_review.js`)

```
document.getElementById('review-form').innerHTML =
  '{{ review.errors.full_messages | join: ", " | escape_javascript }}';
```

## Notes

-   Preserve the user's typed values (`review.title`, `review.body`) when re-rendering the form.

## Related

-   [create\_review.js](create-review.md) · [preview\_review.js](preview-review.md)
