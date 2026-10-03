<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/resend-confirmation/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Resend Confirmation

**Template:** `templates/account/resend_confirmation.liquid` · **Layout:** default · **Route:** `/account/confirmation/new`

## Purpose

Stores that require email confirmation before first login send a [`confirmation_email`](../emails/confirmation-email.md) at signup. This page lets users request that email again if it was lost or expired.

## Typical use cases

-   Resend the account confirmation email
-   Guidance for users who never received the original email

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'resend_confirmation' %}` (alias `resend_account_confirmation`) | Resend the confirmation email (POST) |

## Typical structure

```
<h1>Resend confirmation email</h1>

{% form 'resend_confirmation' %}
  <input type="email" name="website_user[email]" placeholder="Email" required>
  <button type="submit">Resend</button>
{% endform %}

{% if flash_notices.size > 0 %}
  <p class="notice">{{ flash_notices | join: ', ' }}</p>
{% endif %}
```

## Notes

-   Only relevant when the store requires email confirmation; the platform shows this route regardless — keep the page simple.

## Related

-   [Activate account](activate.md) · [Confirmation email](../emails/confirmation-email.md) · [Registration](register.md)
