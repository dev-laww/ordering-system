# Database Model

## Table of Contents

- [User](#user)
- [Address](#address)
- [Item](#item)
- [Order](#order)
- [Order item](#order-item)
- [Payment](#payment)
- [Item record](#item-record)

## User

| Field      | Type   | Description     |
|------------|--------|-----------------|
| id         | string | User uid        |
| first_name | string | User first_name |
| last_name  | string | User last_name  |
| email      | string | User email      |
| password   | string | User password   |
| confirmed  | bool   | User confirmed  |
| role       | string | User role       |
| created_at | date   | User created_at |
| updated_at | date   | User updated_at |

## Address

| Field      | Type   | Description        |
|------------|--------|--------------------|
| id         | string | Address uid        |
| user_id    | string | User uid           |
| address    | string | Address address    |
| city       | string | Address city       |
| state      | string | Address state      |
| zip        | string | Address country    |
| created_at | date   | Address created_at |
| updated_at | date   | Address updated_at |

## Item

| Field      | Type   | Description     |
|------------|--------|-----------------|
| id         | string | Item uid        |
| name       | string | Item name       |
| price      | float  | Item price      |
| stock      | int    | Item stock      |
| quantity   | int    | Item quantity   |
| created_at | date   | Item created_at |
| updated_at | date   | Item updated_at |

## Order

| Field      | Type   | Description      |
|------------|--------|------------------|
| id         | string | Order uid        |
| user_id    | string | User uid         |
| address_id | string | Address uid      |
| status     | string | Order status     |
| created_at | date   | Order created_at |
| updated_at | date   | Order updated_at |

## Order item

| Field      | Type   | Description           |
|------------|--------|-----------------------|
| id         | string | Order item uid        |
| order_id   | string | Order uid             |
| item_id    | string | Item uid              |
| quantity   | int    | Order item quantity   |
| created_at | date   | Order item created_at |
| updated_at | date   | Order item updated_at |

## Payment

| Field      | Type   | Description        |
|------------|--------|--------------------|
| id         | string | Payment uid        |
| order_id   | string | Order uid          |
| user_id    | string | User uid           |
| amount     | float  | Payment amount     |
| status     | string | Payment status     |
| created_at | date   | Payment created_at |
| updated_at | date   | Payment updated_at |

## Item record

| Field      | Type   | Description            |
|------------|--------|------------------------|
| id         | string | Item record uid        |
| item_id    | string | Item uid               |
| type       | string | Item record type       |
| quantity   | int    | Item record quantity   |
| created_at | date   | Item record created_at |
| updated_at | date   | Item record updated_at |

