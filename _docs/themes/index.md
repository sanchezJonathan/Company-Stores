<!-- Source: https://omg.engineering/bsites_services/themes/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Company Stores Liquid Theme Documentation

Documentation for building storefront themes on Company Stores. Describes **what the platform provides in Liquid** — not any specific theme's files, snippets, or settings keys.

**Published site (GitHub Pages):** [https://omg.engineering/bsites\_services/themes/](index.md)

## Preview locally

From the repo root (requires Python 3; creates a gitignored venv at `docs/.venv` on first run):

```
make docs        # static build → build/pages
make docs_serve  # live reload at http://127.0.0.1:8000  (theme docs at /themes/)
```

## Who this is for

-   **Theme designers** building custom storefront layouts
-   **AI agents** assisting designers with Liquid templates

## Start here

| Doc | Purpose |
| --- | --- |
| **[AGENTS.md](AGENTS.md)** | Primary entry point — golden rules, workflow, and index |
| [rendering-pipeline.md](rendering-pipeline.md) | How pages are rendered |
| [global-context.md](global-context.md) | Variables available on every page |
| [theme-structure.md](theme-structure.md) | Required folders and file types |
| [composition.md](composition.md) | Layouts, templates, snippets, `{% render %}` / `{% include %}` |
| [settings-schema.md](settings-schema.md) | `settings_schema.json` format and all supported controls |
| [settings-authoring.md](settings-authoring.md) | Authoring `config/settings.html` (legacy path) |
| [settings-in-templates.md](settings-in-templates.md) | Using `{{ settings.* }}` in templates |
| [assets.md](assets.md) | Theme assets and `.liquid` assets |

## Platform API reference

| Doc | Contents |
| --- | --- |
| [pages/index.md](pages/index.md) | Master table: page type → template → variables |
| [tags/index.md](tags.md) | Custom `{% tag %}` blocks |
| [filters/index.md](filters.md) | Custom `\| filter` pipes |
| [forms/index.md](forms/index.md) | `{% form 'name' %}` forms |
| [forms/fields.md](forms/fields.md) | Input `name` attributes per form |
| [drops/index.md](drops/index.md) | Liquid object reference |

## Page-type guides

Every platform page has its own dedicated guide under [`pages/`](pages/index.md), each explaining what the page is for, when it renders, its variables and forms, and typical use cases.

| Group | Guides |
| --- | --- |
| [Storefront pages](pages/index.md#storefront-pages) | Home, CMS page, catalog page, product listing, product detail, catalog product, gift certificate, bundle, cart, wishlist, checkout, order confirmation, login, request sample, recently viewed, 404, unauthorized, permissions denied |
| [Account pages](pages/index.md#account-pages-templatesaccount) | Dashboard, order history, balance, budget info, address book, logos, registration, edit profile, password recovery/reset, confirmation, activation, checkout login |
| [Approval & print](pages/index.md#manager-approval-moas-print) | MOAS approver view / approved / denied / expired, print order(s) |
| [AJAX partials](pages/partials/index.md) | `*.js.liquid` responses: live pricing, reviews, logos, recently viewed |
| [Email templates](pages/emails/index.md) | Transactional email templates |
| [SMS templates](pages/sms/index.md) | SMS notification templates |

The [pages master index](pages/index.md) maps every template to its guide and flags legacy/deprecated templates.

## Glossary

| Term | Meaning |
| --- | --- |
| **Theme** | A zip of Liquid templates, assets, and config installed on a store |
| **Template** | A `templates/*.liquid` file rendered for a specific page type |
| **Layout** | A `layout/*.liquid` wrapper providing shared chrome around templates |
| **Snippet** | A reusable `snippets/*.liquid` partial rendered via `{% render %}` (or legacy `{% include %}`) |
| **Object** | A structured data object available in Liquid (`product`, `order`, etc.) |
| **Variable** | A Liquid value provided by the platform (`product`, `order`, `settings`, etc.) |
| **settings.html** | Legacy theme-authored HTML form defining configurable settings |
| **settings\_schema.json** | JSON schema of theme settings — shipped directly or generated from `settings.html` |
| **settings\_data.json** | Runtime values for theme settings (presets + current) |
| **Platform template** | A `templates/{name}.liquid` file the platform expects for a page type |
| **Feature gate** | An object helper like `product.virtual_samples_enabled?` controlling optional UI |

## Platform vs theme-specific

| Platform docs describe | Theme designers decide |
| --- | --- |
| Required folders and file types | Snippet names and organization |
| Page types and available objects | Markup, CSS, and visual design |
| Form names and field contracts | Form layout and styling |
| Settings field types | Setting key names and presets |
| `{% render %}` mechanism | Which snippets to render where |
