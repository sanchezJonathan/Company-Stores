<!-- Source: https://omg.engineering/bsites_services/themes/drops/account/ (mirrored 2026-10-02). Do not edit; re-run the mirror script to refresh. -->

# Objects — Account

Account pages require authentication. The `account` variable on the edit page is the logged-in user object.

## Registration form

**Variable:** `form` via `{% form 'registration' %}`

| Property / method | Description |
| --- | --- |
| `first_name`, `last_name`, `username`, `email`, `group_passcode` | Registration fields |
| `errors` | Validation errors |
| `custom_user_fields` | Custom fields with `id`, `name`, `required?`, `value`, `errors` |

## Account edit form

**Variable:** `form` via `{% form 'user' %}`

| Property / method | Description |
| --- | --- |
| `first_name`, `last_name`, `username`, `email`, `phone`, `timezone` | Profile fields |
| `enable_sms_notifications?` | SMS opt-in |
| `errors` | Validation errors |
| `custom_user_fields` | Account custom fields |
| `timezones` | `[{value, title}]` options |

## Account address

**Variable:** `form` via address forms; elements from `address_book`

| Property / method | Description |
| --- | --- |
| `id` (`"new"` for unsaved) | Address id |
| `nickname`, `company`, `first_address`, `second_address` | Address |
| `city`, `state`, `country`, `zip` | Location |
| `first_name`, `last_name`, `email`, `phone` | Contact |
| `default_shipping?`, `default_billing?` | Default flags |
| `errors` | Validation errors |

## Address book

**Variable:** `address_book` (address book page)

| Method | Description |
| --- | --- |
| `each` | Iterate saved addresses |
| `build(attrs)` | New address form |
| `get(id)`, `get_with_shared(id)` | Find address |
| `empty?` | No addresses |
