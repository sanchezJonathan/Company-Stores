<!-- Source: https://omg.engineering/bsites_services/themes/pages/emails/request-sample-email/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# `request_sample_email` — Sample Requested

**Template:** `templates/request_sample_email.liquid` · **Layout:** none

## Purpose

Notifies the store that a customer requested a physical product sample, with the shipping details and options they submitted.

## Sent when

A sample request is submitted on the [request sample page](../storefront/request-sample.md).

## Variables

| Name | Type | Description |
| --- | --- | --- |
| `request_sample` | Request sample object | The submitted request: product, address, options, requester |

## Typical content

```
<p>New sample request:</p>
<p>Product: {{ request_sample.product.name }}</p>
<p>Ship to: {{ request_sample.shipping_address }}</p>
```

## Notes

-   The exact properties available on `request_sample` are documented in [logos and samples drops](../../drops/logos-and-samples.md).

## Related

-   [Request sample page](../storefront/request-sample.md)
