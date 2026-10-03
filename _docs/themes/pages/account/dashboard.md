<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/dashboard/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Account Dashboard

**Template:** `templates/account/dashboard.liquid` · **Layout:** default · **Route:** `/account/dashboard` · **Requires:** login

## Purpose

The account home page — a hub that summarizes the customer's relationship with the store and links out to every account sub-page. First thing a logged-in user sees after signing in.

## Typical use cases

-   Welcome header with the user's name
-   Quick stats: open orders, account balance, budgets, saved logos
-   Navigation cards to order history, address book, balance, budgets, logos, profile edit
-   Pending approvals or attention items (MOAS stores)

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `custom_logos_upload_enabled` | Boolean | Custom logo upload allowed for this user |

Everything else comes from the global `current_user` object (see [site and user drops](../../drops/site-and-user.md)): `current_user.first_name`, `current_user.order_history`, `current_user.balance`, `current_user.has_budgets?`, etc.

## Typical structure

```
<h1>Welcome, {{ current_user | short_name }}</h1>

<nav class="account-nav">
  <a href="{{ order_history_url }}">Order history</a>
  <a href="{{ address_book_url }}">Address book</a>
  {% if site.show_account_balance? %}
    <a href="{{ account_balance_url }}">Balance: {{ current_user.balance | money }}</a>
  {% endif %}
  {% if current_user.has_budgets? %}
    <a href="{{ budget_info_url }}">Budgets</a>
  {% endif %}
  <a href="{{ logos_url }}">My logos</a>
  <a href="{{ edit_account_url }}">Edit profile</a>
</nav>
```

## Notes

-   Gate each section on the matching feature flag (`site.show_account_balance?`, `current_user.has_budgets?`, `custom_logos_upload_enabled`) so the dashboard adapts to the store's configuration.

## Related

-   [Order history](order-history.md) · [Balance](balance.md) · [Address book](address-book.md) · [Logos](logos.md) · [Edit profile](edit-profile.md)
