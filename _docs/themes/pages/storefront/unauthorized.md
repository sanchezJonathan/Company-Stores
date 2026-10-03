<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/unauthorized/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Unauthorized

**Template:** `templates/unauthorized.liquid` · **Layout:** default · **HTTP status:** 401

## Purpose

Shown when a **logged-in** user lacks access to a resource and the theme does _not_ provide a `permissions_denied_page` template. This is the platform's fallback for authorization failures.

## How access failures are routed

```
Access denied
 ├─ theme has templates/permissions_denied_page.liquid?
 │    yes → redirect to /permissions_denied  (permissions denied page)
 │    no  → logged in?
 │           yes → render this template (401)
 │           no  → redirect to login (returning after sign-in)
```

Since most themes ship a permissions-denied template, this page is rarely seen in practice — but the platform requires it as the fallback.

## Typical use cases

-   Explaining that the account lacks access to the requested area
-   Linking to login (for guests this template never renders — they are redirected to login instead)
-   Contact/support guidance for permission issues

## Variables

Global context only.

## Typical structure

```
<h1>Access denied</h1>
<p>You don't have permission to view this page.</p>
{% if site.show_login? %}
  <p><a href="{{ login_url }}">Sign in with a different account</a></p>
{% endif %}
```

## Related

-   [Permissions denied](permissions-denied.md) · [404](404.md)
