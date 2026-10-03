<!-- Source: https://omg.engineering/bsites_services/themes/tags/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Liquid Tags

Custom block and tag syntax for Company Stores themes. Block tags use Company Stores-specific closing tags (`{% endform %}`, `{% endpaginate %}`, etc.).

## Navigation & layout

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `breadcrumbs` | `{% breadcrumbs 'add'\|'clear', 'group'[, title: '...', url: '...'] %}` | Add or clear breadcrumb entries. Renders nothing. |
| `main_navigation` | `{% main_navigation %}` | Renders nested page navigation HTML from the `pages` variable. |
| `category_navigation` | `{% category_navigation [full: true, max_depth: N] %}` | Renders cached category tree navigation with filter links. |
| `render_breadcrumbs` | `{% render_breadcrumbs %}…{% endrender_breadcrumbs %}` | Exposes breadcrumb group arrays into block scope. |
| `seo_tags` | `{% seo_tags %}` | Outputs `<title>`, charset meta, keywords/description from the `meta_data` variable. |

## Forms

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `form` | `{% form 'form_name'[, object][, remote: true, ajax: true, context_name: 'builder'] %}…{% endform %}` | Wraps markup in a platform form. |
| `form_field` | `{% form_field 'builder.method', 'field_name'[, id, class, required, …] %}` | **Legacy.** Renders a form field. |

See [forms/index.md](forms/index.md) for all platform form names.

## Collection helpers

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `paginate` | `{% paginate collection by N [page:, url:, window_size:, ajax:, remote:] %}…{% endpaginate %}` | Paginates collection; exposes `paginate` object. Max 1000/page; default 20. |
| `sort` | `{% sort collection [attrs] %}…{% endsort %}` | Sets `sort_options` if collection is sortable. |
| `filtrate` | `{% filtrate collection by filter_rule [attrs] %}…{% endfiltrate %}` | Filters collection; exposes result as `filter` in block. |
| `keyword_facets` | `{% keyword_facets %}…{% endkeyword_facets %}` | Sets `keywords` from `products_search.selected_keywords`. |
| `product_samples` | `{% product_samples N %}…{% endproduct_samples %}` | Randomly samples N products from the `products` variable. |

## Snippets & composition

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `render` | `{% render 'snippet/path' %}`  
`{% render 'card', product: product %}`  
`{% render 'item' with var as alias %}`  
`{% render 'item' for collection as alias %}` | **Recommended.** Isolated snippet. [Global context](global-context.md) is still visible. Pass page-local variables explicitly. |
| `include` | `{% include 'snippet/path' %}`  
`{% include 'item' with var as alias, key: val %}`  
`{% include 'item' for collection as alias %}` | **Legacy.** Renders a theme snippet and inherits the parent scope. Prefer `{% render %}`. |

`render` is standard Liquid (not a custom Company Stores tag). Both tags resolve `'name'` to `snippets/name.liquid`. Details: [composition.md](composition.md).

## Checkout & payment

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `render_payment_method` | `{% render_payment_method payment %}` | Renders checkout payment method UI. |
| `render_payment_method_template` | `{% render_payment_method_template payment %}` | Renders payment method template. |
| `render_payment_method_checkbox` | `{% render_payment_method_checkbox payment %}` | Renders payment method radio input. |
| `render_payment_template` | `{% render_payment_template payments %}` | Renders payment summary for each payment. |
| `render_adjustments_template` | `{% render_adjustments_template [partial_name: 'name'] %}` | **Legacy.** Renders theme template (default: `templates/adjustments.liquid`). |

## Select options

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `country_select_options` | `{% country_select_options [selected: '...', priority_countries: [...]] %}` | `<option>` HTML for country select. |
| `state_select_options` | `{% state_select_options [country:, selected:, default_country:] %}` | `<option>` HTML for state/province select. |

## Product features

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `view_logos` | `{% view_logos product %}` | Renders `snippets/view_logos.liquid` when virtual logos are enabled. |

## Integrations

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `google_sso_button` | `{% google_sso_button %}` | Google SSO button when feature enabled. |
| `google_analytics` | `{% google_analytics %}` | Google Analytics snippet injection. |
| `google_analytics_track_event` | `{% google_analytics_track_event [attrs] %}` | **Deprecated.** Returns empty string. |
| `google_analytics_ecommerce_tracking` | `{% google_analytics_ecommerce_tracking [attrs] %}` | **Deprecated.** Returns empty string. |

## Legacy / no-op

| Tag | Syntax | Purpose |
| --- | --- | --- |
| `try_it_on` | `{% try_it_on %}` | **Removed.** Returns empty string. |
| `user_hot_spot_images` | `{% user_hot_spot_images %}` | **Removed.** Returns empty string. |

## Platform-reserved paths

| Tag | Resolves to |
| --- | --- |
| `{% view_logos %}` | `snippets/view_logos.liquid` |
| `{% render_adjustments_template %}` | `templates/adjustments.liquid` (default) |
| `{% render 'name' %}` / `{% include 'name' %}` | `snippets/name.liquid` (designer-defined) |

## Attributes reference

### `form` tag

| Attribute | Purpose |
| --- | --- |
| `remote` / `ajax` | Enable AJAX form submission |
| `context_name` | Variable name for the form builder (default: `builder`) |

### `paginate` tag

| Attribute | Purpose |
| --- | --- |
| `page` | Current page number |
| `url` | Base URL for pagination links |
| `window_size` | Number of page links to show |
| `ajax` / `remote` | AJAX pagination |
