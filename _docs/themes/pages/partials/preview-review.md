<!-- Source: https://omg.engineering/bsites_services/themes/pages/partials/preview-review/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `preview_review.js` / `preview_review` — Review Preview

**Templates:** `templates/preview_review.js.liquid` (AJAX) and `templates/preview_review.liquid` (HTML fallback) · **Layout:** none

## Purpose

Shows a preview of the review before final submission — lets the buyer check formatting, rating, and wording. The AJAX variant injects the preview into the page; the HTML variant renders it as a fragment for non-AJAX flows.

## Triggered by

-   The review form's preview action (`POST /products/:id/reviews/preview`)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `review` | Review object | The review as submitted, for preview rendering |

## Example (`preview_review.js`)

```
document.getElementById('review-preview').innerHTML =
  '<div class="review"><strong>{{ review.title | escape_javascript }}</strong>' +
  '<p>{{ review.body | escape_javascript }}</p></div>';
```

## Related

-   [create\_review.js](create-review.md) · [new\_review.js](new-review.md)
