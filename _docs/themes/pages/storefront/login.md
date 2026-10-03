<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/login/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Login

**Template:** `templates/login.liquid` · **Layout:** default · **Route:** `/account/login`

## Purpose

Storefront sign-in page. Rendered when a visitor opens the login page directly or when the platform redirects an unauthenticated user to log in (the originally requested URL is stored and revisited after sign-in).

## Typical use cases

-   Username/password login
-   Google SSO button (when enabled for the store)
-   Links to registration and password recovery
-   Displaying sign-in errors and flash messages

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `page_title` | String | Page title (`'login'`) |

## Forms and tags

| Construct | Purpose |
| --- | --- |
| `{% form 'login' %}` | Login submission (POST) |
| `{% google_sso_button %}` | Platform-rendered Google SSO button |

Feature gates:

-   `site.show_login?` — login is available for this store
-   SAML SSO stores are handled entirely by the platform (no theme form needed)

## Typical structure

```
<h1>Sign in</h1>

{% if site.show_login? %}
  {% form 'login' %}
    <input type="text" name="website_user[username]" placeholder="Username" required>
    <input type="password" name="website_user[password]" placeholder="Password" required>

    {% if flash_errors.size > 0 %}
      <p class="error">{{ flash_errors | join: ', ' }}</p>
    {% endif %}

    <button type="submit">Sign in</button>
  {% endform %}

  {% google_sso_button %}

  <p>
    <a href="{{ signup_url }}">Create an account</a> ·
    <a href="{{ forgot_password_url }}">Forgot password?</a>
  </p>
{% endif %}
```

## Notes

-   Field names must be `website_user[username]` and `website_user[password]` — see [form fields](../../forms/fields.md).
-   Multi-storefront stores with passcodes may also surface the passcode form here (`{% form 'passcode' %}`).

## Related

-   [Registration](../account/register.md) · [Password recovery](../account/recover-password.md) · [Account dashboard](../account/dashboard.md)
