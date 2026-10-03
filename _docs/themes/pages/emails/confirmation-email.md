<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/confirmation-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `confirmation_email` — Account Confirmation

**Template:** `templates/confirmation_email.liquid` · **Layout:** none

## Purpose

Sent when a new account must confirm its email address before first login. Contains the confirmation link the user must follow.

## Sent when

Account registration on stores that require email confirmation.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `user` | User object | The new account |
| `website_user` | User object | Same object (alias) |
| `confirm_url` | String | Confirmation link — the core call to action |

## Typical content

```
<p>Hello {{ user.first_name }},</p>
<p>Welcome to {{ site.name }}! Confirm your email to activate your account:</p>
<p><a href="{{ confirm_url }}">Confirm my account</a></p>
```

## Related

-   [Resend confirmation page](../account/resend-confirmation.md) · [Activate page](../account/activate.md)
