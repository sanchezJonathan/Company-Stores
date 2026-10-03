<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/recover-password/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Password Recovery

**Template:** `templates/account/recover_password.liquid` · **Layout:** default · **Route:** `/account/password/new`

## Purpose

The "forgot password" entry point. The user submits their email/username; if the account exists, the platform sends a reset link ([`reset_password_email`](../emails/reset-password-email.md)) and shows a confirmation message.

## Typical use cases

-   Request a password reset link
-   Success messaging after submission
-   Link back to login

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'recover_password' %}` (alias `recover_account_password`) | Request the reset email (POST) |

## Typical structure

```
<h1>Reset your password</h1>

{% form 'recover_password' %}
  <input type="email" name="website_user[email]" placeholder="Email" required>
  <button type="submit">Send reset link</button>
{% endform %}

{% if flash_notices.size > 0 %}
  <p class="notice">{{ flash_notices | join: ', ' }}</p>
{% endif %}

<p><a href="{{ login_url }}">Back to sign in</a></p>
```

## Notes

-   The platform does not reveal whether an account exists — keep messaging neutral ("if the account exists, you'll receive an email").
-   Link here from the [login page](../storefront/login.md) via `forgot_password_url`.

## Related

-   [Password reset](reset-password.md) · [Login](../storefront/login.md)
