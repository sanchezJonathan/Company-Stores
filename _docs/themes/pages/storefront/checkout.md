<!-- Source: https://omg.engineering/bsites_services/themes/pages/storefront/checkout/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Checkout

**Template:** `templates/checkout.liquid` · **Layout:** default · **Routes:** `/checkout/address`, `/checkout/delivery`, `/checkout/payment`, `/checkout/custom_data_collection`, `/checkout/budget`, `/checkout/confirm`

## Purpose

One template renders **every checkout step**. The platform advances an order through a flow of steps; on each step it re-renders this template with the step's form object. Your template reads `checkout_flow.state` to decide which step UI to show, and submits the active step through the single `checkout` form.

## Typical use cases

-   Multi-step checkout UI with a progress indicator (completed steps clickable)
-   Address step: shipping/billing address forms, saved-address dropdowns, address suggestions
-   Delivery step: shipping method selection with rates
-   Payment step: payment method selection (cards, PayPal, balance, custom methods) via platform render tags
-   Custom data collection: store-defined checkout questions
-   Budget step: selecting a budget bucket (budget-enabled stores)
-   Confirm step: full order review before placing the order
-   Manager-approval (MOAS) messaging when the order requires approval

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `order` | Order object | The order being checked out |
| `checkout_flow` | Checkout flow | Step state: `state`, `passed_states` |
| `form` | Step form | The current step's form object (shape changes per step) |
| `custom_data_collections` | Collection | Custom checkout question definitions |

## Steps

| `checkout_flow.state` | Step | `form` provides |
| --- | --- | --- |
| `address` | Addresses | Shipping/billing address fields, saved addresses |
| `delivery` | Shipping method | Shipping method options and rates |
| `payment` | Payment | Payment methods and billing details |
| `custom_data_collection` | Custom questions | Custom data answers |
| `budget` | Budget | Budget bucket selection |
| `confirm` | Review | Read-only order summary |

Account gates sit before checkout: registration/guest/login uses [`account/checkout_login`](../account/checkout-login.md).

## Forms and tags

| Construct | Purpose |
| --- | --- |
| `{% form 'checkout' %}` | Submit the current step (PUT) |
| `{% render_payment_method payment %}` | Render a payment method's UI |
| `{% render_payment_method_checkbox payment %}` | Render the payment method selector input |
| `{% render_payment_method_template payment %}` | Render payment method markup |
| `{% render_payment_template payments %}` | Render payment summary on the confirm step |
| `{% country_select_options %}` / `{% state_select_options %}` | Build country/state selects |
| `{{ checkout_flow \| state_passed: 'address' }}` | Check whether a step was completed |

## Feature gates

```
{% if site.show_shipping_address? %} ... {% endif %}
{% if site.show_billing_address? %} ... {% endif %}
{% if order.moas_order? %}
  <p>This order requires manager approval after placement.</p>
{% endif %}
```

## Typical structure

```
{% render 'checkout_steps', checkout_flow: checkout_flow %}   {# progress indicator using checkout_flow.passed_states #}

{% form 'checkout' %}
  {% case checkout_flow.state %}
  {% when 'address' %}
    {% render 'checkout_address', checkout_flow: checkout_flow, form: form %}
  {% when 'delivery' %}
    {% render 'checkout_delivery', checkout_flow: checkout_flow, form: form %}
  {% when 'payment' %}
    {% render 'checkout_payment', checkout_flow: checkout_flow, form: form %}
  {% when 'budget' %}
    {% render 'checkout_budget', checkout_flow: checkout_flow, form: form %}
  {% when 'confirm' %}
    {% render 'checkout_summary', checkout_flow: checkout_flow, form: form %}
  {% endcase %}

  {% if form.errors.any? %}{{ form.errors | default_errors }}{% endif %}
  <button type="submit">Continue</button>
{% endform %}
```

## Notes

-   Successful confirm-step submission renders the [order confirmation](order-confirmation.md) template — not this one.
-   Failed steps redirect back to the current step with flash errors.
-   Step input names differ per step — see [form fields](../../forms/fields.md).
-   Payment method markup is platform-rendered; do not hand-build card inputs.

## Related

-   [Order confirmation](order-confirmation.md) · [Checkout login](../account/checkout-login.md) · [Checkout drops](../../drops/checkout.md)
