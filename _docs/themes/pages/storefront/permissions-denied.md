<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/permissions-denied/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Permissions Denied

**Template:** `templates/permissions_denied_page.liquid` · **Layout:** default · **Route:** `/permissions_denied`

## Purpose

The primary "you can't access this" page. When any authorization check fails and the theme provides this template, the platform redirects here. Use it to explain restrictions in store styling — category access limits, group-restricted pages, budget restrictions, and similar permission rules all surface through this page.

## Typical use cases

-   Authenticated users hitting restricted categories, pages, or features
-   Explaining group-based access rules (e.g. passcode-protected areas)
-   Offering next steps: login with another account, contact support, return home

## Variables

Global context only.

## Typical structure

```
<h1>Access restricted</h1>
<p>Your account doesn't have permission to view this content.</p>
<p>
  <a href="{{ root_url }}">Return to the homepage</a>
  {% if site.show_login? %}
    · <a href="{{ login_url }}">Sign in</a>
  {% endif %}
</p>
```

## Notes

-   Ship this template whenever the store uses permissions or group restrictions — without it, the platform falls back to the [unauthorized template](unauthorized.md) or a login redirect.
-   The redirect happens before rendering, so flash messages from the failed action are available (`flash_errors`).

## Related

-   [Unauthorized](unauthorized.md) · [404](404.md)
