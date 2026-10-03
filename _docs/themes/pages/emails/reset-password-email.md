<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/reset-password-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `reset_password_email` — Password Reset Instructions

**Template:** `templates/reset_password_email.liquid` · **Layout:** none

## Purpose

Sent when a user requests a password reset. Contains the reset link that opens the [password reset page](../account/reset-password.md).

## Sent when

A password recovery request is submitted for an existing account.

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `user` | User object | The account |
| `website_user` | User object | Same object (alias) |
| `reset_url` | String | Reset link — the core call to action |

## Typical content

```
<p>Hello {{ user.first_name }},</p>
<p>Someone requested a password reset for your {{ site.name }} account.</p>
<p><a href="{{ reset_url }}">Choose a new password</a></p>
<p>If you didn't request this, you can ignore this email.</p>
```

## Related

-   [Password recovery page](../account/recover-password.md) · [Password reset page](../account/reset-password.md)
