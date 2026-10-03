<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/register/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Registration

**Template:** `templates/account/register.liquid` · **Layout:** default · **Route:** `/account/sign_up` · **Gate:** `site.show_registration?`

## Purpose

Self-service account creation. The platform validates the submission, applies any group passcode, and starts the confirmation flow (a confirmation email may be required before first login, depending on store config).

## Typical use cases

-   Standard registration form (name, email, username, password)
-   Group passcode entry for restricted storefronts
-   Custom registration fields defined by the store (custom user fields)
-   CAPTCHA (platform-injected when enabled — no theme work needed)

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'registration' %}` (alias `create_account`) | Submit the new account (POST) |

The form object exposes current values and errors: `first_name`, `last_name`, `username`, `email`, `group_passcode`, `custom_user_fields`, `errors`.

## Typical structure

```
{% if site.show_registration? %}
  <h1>Create an account</h1>

  {% form 'registration' %}
    <input type="text" name="website_user[first_name]" value="{{ form.first_name }}" placeholder="First name">
    <input type="text" name="website_user[last_name]" value="{{ form.last_name }}" placeholder="Last name">
    <input type="email" name="website_user[email]" value="{{ form.email }}" placeholder="Email">
    <input type="text" name="website_user[username]" value="{{ form.username }}" placeholder="Username">
    <input type="password" name="website_user[password]" placeholder="Password">

    {% for field in form.custom_user_fields %}
      {% render 'custom_user_field', field: field, form: form %}
    {% endfor %}

    {% if form.errors.any? %}
      <p class="error">{{ form.errors | default_errors }}</p>
    {% endif %}

    <button type="submit">Sign up</button>
  {% endform %}

  <p>Already have an account? <a href="{{ login_url }}">Sign in</a></p>
{% endif %}
```

## Notes

-   Custom user fields render per-field — see [account drops](../../drops/account.md) for the field object shape.
-   After successful registration the platform redirects or shows the confirmation flow; a [`welcome_email`](../emails/welcome-email.md) and/or [`confirmation_email`](../emails/confirmation-email.md) may be sent.

## Related

-   [Login](../storefront/login.md) · [Resend confirmation](resend-confirmation.md) · [Activate account](activate.md) · [Form fields](../../forms/fields.md)
