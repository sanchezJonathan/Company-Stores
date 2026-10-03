<!-- Source: https://omg.engineering/bsites_services/themes/pages/account/budget-info/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Budget Info

**Template:** `templates/account/budget_info.liquid` · **Layout:** default · **Route:** `/account/budget_information` · **Requires:** login

## Purpose

Displays the budget buckets assigned to the user (or their organization): how much budget is available, what has been spent, and when budgets reset. Budgets constrain checkout — when enabled, the buyer must pick a budget at the [budget checkout step](../storefront/checkout.md).

## Typical use cases

-   Per-budget cards: name, available amount, spent amount, period
-   Guidance on which budget to use for purchases
-   Empty state when no budgets are assigned

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `budgets` | Array | The user's budget buckets |

Feature gate: `current_user.has_budgets?` (and store-level budgets enabled).

## Typical structure

```
<h1>Your budgets</h1>

{% if budgets.size > 0 %}
  {% for budget in budgets %}
    <div class="budget-card">
      <h3>{{ budget.name }}</h3>
      <p>Available: {{ budget.amount | money }}</p>
    </div>
  {% endfor %}
{% else %}
  <p>No budgets are assigned to your account.</p>
{% endif %}
```

## Notes

-   The exact budget properties available to themes are documented in [site and user drops](../../drops/site-and-user.md).

## Related

-   [Account dashboard](dashboard.md) · [Checkout](../storefront/checkout.md) (budget step)
