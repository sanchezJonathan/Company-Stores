<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/balance/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Account Balance

**Template:** `templates/account/balance.liquid` · **Layout:** default · **Route:** `/account/balance` · **Requires:** login

## Purpose

Shows the customer's store credit (account balance) and its adjustment history — deposits, credits, and charges applied over time.

## Typical use cases

-   Current balance display
-   Balance transaction history (date, description, amount)
-   Explanation of how the balance applies at checkout

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `custom_logos_upload_enabled` | Boolean | Custom logo upload allowed for this user |

Balance data comes from the user object:

| Property | Description |
| --- | --- |
| `current_user.balance` | Current balance amount |
| `current_user.user_balance_log` | Adjustment history entries |

Feature gate: `site.show_account_balance?`.

## Typical structure

```
{% if site.show_account_balance? %}
  <h1>Account balance</h1>
  <p class="balance">{{ current_user.balance | money }}</p>

  <table>
    {% for entry in current_user.user_balance_log %}
      <tr>
        <td>{{ entry.created_at | date: '%b %d, %Y' }}</td>
        <td>{{ entry.description }}</td>
        <td>{{ entry.amount | money }}</td>
      </tr>
    {% endfor %}
  </table>
{% endif %}
```

## Notes

-   Balance can be used as a payment method at checkout when positive — the payment step surfaces it automatically.

## Related

-   [Account dashboard](dashboard.md) · [Budget info](budget-info.md) · [Site and user drops](../../drops/site-and-user.md)
