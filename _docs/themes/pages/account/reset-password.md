<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/reset-password/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Password Reset

**Template:** `templates/account/reset_password.liquid` · **Layout:** default · **Route:** reset link from the recovery email

## Purpose

Renders when a user follows the reset link from [`reset_password_email`](../emails/reset-password-email.md). The platform validates the token in the URL; this template collects the new password.

## Typical use cases

-   New password + confirmation input
-   Token failure messaging (expired/invalid links)

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'reset_password' %}` (alias `reset_account_password`) | Set the new password (PUT) |

## Typical structure

```
<h1>Choose a new password</h1>

{% form 'reset_password' %}
  <input type="password" name="website_user[password]" placeholder="New password" required>
  <input type="password" name="website_user[password_confirmation]" placeholder="Confirm password" required>

  {% if form.errors.any? %}
    <p class="error">{{ form.errors | default_errors }}</p>
  {% endif %}

  <button type="submit">Reset password</button>
{% endform %}
```

## Notes

-   The reset token travels in the URL/query params — the platform form tag preserves it automatically; do not strip hidden fields.
-   Expired tokens surface as form errors; guide the user back to [password recovery](recover-password.md).

## Related

-   [Password recovery](recover-password.md) · [Reset password email](../emails/reset-password-email.md)
