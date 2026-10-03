<!-- Source: https://omg.engineering/bsites_services/themes/drops/logos-and-samples/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Objects — Logos & Samples

## Logo

**Variable:** `logos` (product page); `logo` (upload AJAX); `user.logos`

| Property / method | Description |
| --- | --- |
| `id`, `name`, `charge`, `custom?`, `image_url` | Logo data |
| `front_thumb_url`, `front_preview_url` | Sized URLs |
| `valid?`, `errors` (logo upload validation) | Upload validation |
| `image_changed?` | Image updated (AJAX) |
| `has_colors_restrictions?`, `colors_whitelist`, `colors_blacklist` | Color permissions |
| `as_json`, `to_json` | JSON for JS consumers |

## LogoLocation

**Variable:** nested in `logo_locations`

`id`, `name`

## LogoChoice

**Variable:** `line_item.logo` / `line_item.logos[]`

| Property / method | Description |
| --- | --- |
| `charge`, `id`, `name`, `custom?`, `image_url` | Delegated from logo |
| `front_thumb_url`, `front_preview_url` | Image sizes |
| `logo` | Underlying logo object |
| `location_name` | Placement name |

## LocationWithLogos

**Variable:** `form.logo_locations` on product/bundle/sample forms

| Property / method | Description |
| --- | --- |
| `id`, `name` | Location |
| `required?`, `charge?`, `logos` | Rules and selectable logos |
| `errors` | Location validation |

## VirtualSampleImage

**Variable:** nested on line items / product customization

`id`, `image_url`, `thumb_url`, `small_url`, `medium_url`, `large_url`

## RequestSample

**Variable:** on request sample form

| Property / method | Description |
| --- | --- |
| `choices`, `shipping_contact`, `shipping_address` | Sample state |
| `name`, `sku`, `primary_image` | From product |
| `logo`, `logos` | Selected logos |
| `product` | Product object |
| `options` | Submitted option values + errors |
| `product_options_enabled?`, `options_or_groups` | Option UI |

## Request sample form

**Variable:** `form` via `{% form 'request_sample' %}`

| Property / method | Description |
| --- | --- |
| `logos`, `logo_required?`, `available_addresses` | Context |
| `logo_locations` | `LocationWithLogos` array |
| `errors` | Form errors |
| Delegates | Other methods to `RequestSample` object |

## Platform snippet requirement

When `product.virtual_logos_enabled?` is true, use `{% view_logos product %}` which renders your theme's `snippets/view_logos.liquid`.
