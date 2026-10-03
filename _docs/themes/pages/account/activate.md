<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/activate/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Activate Account

**Template:** `templates/account/activate.liquid` · **Layout:** default · **Route:** activation link from account emails

## Purpose

Final step of the account confirmation lifecycle: the user follows an activation link (with a token) and sets their password to activate the account. After activation they can sign in normally.

## Typical use cases

-   Collect a password for a newly confirmed account
-   Expired/invalid token messaging

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'activate_account' %}` (alias `activate_account_password`) | Activate the account with a password (POST) |

## Typical structure

```
<h1>Activate your account</h1>

{% form 'activate_account' %}
  <input type="password" name="website_user[password]" placeholder="Password" required>
  <input type="password" name="website_user[password_confirmation]" placeholder="Confirm password" required>

  {% if form.errors.any? %}
    <p class="error">{{ form.errors | default_errors }}</p>
  {% endif %}

  <button type="submit">Activate account</button>
{% endform %}
```

## Notes

-   The activation token is preserved by the platform form tag's hidden fields — keep them intact.
-   This page is reached only from email links; there is no navigation path to it.

## Related

-   [Resend confirmation](resend-confirmation.md) · [Registration](register.md)
