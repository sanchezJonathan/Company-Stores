<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/welcome-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `welcome_email` — Account Created

**Template:** `templates/welcome_email.liquid` · **Layout:** none

## Purpose

Post-signup welcome message. Confirms the account exists and invites the user into the store — a marketing touchpoint as much as a transactional one.

## Sent when

An account is successfully created (after confirmation requirements are satisfied, per store config).

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `user` | User object | The new account |
| `website_user` | User object | Same object (alias) |
| `store_url` | String | Storefront link for this user |

## Typical content

```
<p>Welcome to {{ site.name }}, {{ user.first_name }}!</p>
<p>Your account is ready.</p>
<p><a href="{{ store_url }}">Start shopping</a></p>
```

## Related

-   [Registration page](../account/register.md) · [Confirmation email](confirmation-email.md)
