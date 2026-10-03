<!-- Source: https://omg.engineering/bsites_services/themes/pages/approval-and-print/moas-token-expired/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# MOAS — Token Expired

**Template:** `templates/moas/token_expired.liquid` · **Layout:** default · **Optional** (falls back to 404)

## Purpose

Shown when an approval link is no longer valid — the token expired or was already used. Without this template the platform renders a plain 404; providing it gives approvers a friendlier explanation.

## Typical use cases

-   Explaining that the approval link expired
-   Asking the approver to request a fresh link (the store can resend [`order_approver_email`](../emails/order-approver-email.md))

## Variables

Global context only.

## Typical structure

```
<h1>This approval link has expired</h1>
<p>The order may already have been processed, or the link expired.</p>
<p>Contact the store to request a new approval link.</p>
```

## Related

-   [View order](moas-view-order.md) · [404](../storefront/404.md)
