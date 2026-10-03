<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/checkout-login/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Checkout Login

**Template:** `templates/account/checkout_login.liquid` · **Layout:** default · **Route:** `/checkout/registration`

## Purpose

The gate before checkout for stores that require an account (or offer guest checkout). Depending on store configuration, this page presents login, registration, and/or guest-continue choices in one place. The same template re-renders with errors when any of its submissions fails.

## Typical use cases

-   Returning customer signs in to continue checkout
-   New customer registers during checkout
-   Guest checkout: continue with just an email (when enabled)
-   Error messaging for failed login/registration attempts

## Forms

| Form | Purpose |
| --- | --- |
| `{% form 'login' %}` | Sign in an existing account |
| `{% form 'checkout_registration' %}` (alias `create_checkout_account`) | Register during checkout (POST) |
| `{% form 'guest_checkout' %}` | Continue as guest with an email (PUT) |

## Typical structure

```
<h1>Checkout</h1>

<div class="checkout-gate">
  <section>
    <h2>Returning customers</h2>
    {% form 'login' %}
      <input type="text" name="website_user[username]" placeholder="Username">
      <input type="password" name="website_user[password]" placeholder="Password">
      <button type="submit">Sign in</button>
    {% endform %}
  </section>

  <section>
    <h2>New customers</h2>
    {% form 'checkout_registration' %}
      <input type="email" name="website_user[email]" placeholder="Email">
      <input type="password" name="website_user[password]" placeholder="Password">
      <button type="submit">Create account</button>
    {% endform %}

    {% form 'guest_checkout' %}
      <input type="email" name="email" placeholder="Email for guest checkout">
      <button type="submit">Continue as guest</button>
    {% endform %}
  </section>
</div>
```

## Notes

-   Which sections apply depends on store configuration — gate them on the relevant `site.*` helpers (see [site and user drops](../../drops/site-and-user.md)).
-   Registration here can include custom user fields and CAPTCHA, same as the standalone [registration page](register.md).
-   After success the platform continues the checkout flow at the [address step](../storefront/checkout.md).

## Related

-   [Checkout](../storefront/checkout.md) · [Login](../storefront/login.md) · [Registration](register.md)
