# API Endpoints

List of all api endpoints.

### Table of Contents

- [Auth](#auth)
    - [Login](#login)
    - [Register](#register)
    - [Refresh Token](#refresh-token)
    - [Forgot Password](#forgot-password)
    - [Reset Password](#reset-password)
    - [Verify Email](#verify-email)
    - [Resend Verification Email](#resend-verification-email)
- [Orders](#orders)
    - [Get Orders](#get-orders)
    - [Get Order](#get-order)
    - [Create Order](#create-order)
    - [Complete Order](#complete-order)
    - [Cancel Order](#cancel-order)
    - [Delete Order](#delete-order)
    - [Order Payment](#order-payment)
- [Items](#items)
    - [Get Items](#get-items)
    - [Get Item](#get-item)
    - [Create Item](#create-item)
    - [Update Item](#update-item)
    - [Delete Item](#delete-item)
    - [Stock History](#stock-history)
    - [Add stock to Item](#restock-item)
- [Payments](#payments)
    - [Get Payments](#get-payments)
    - [Get Payment](#get-payment)
    - [Mark Payment as Completed](#mark-payment-as-completed)
    - [Delete Payment](#delete-payment)
- [Common Responses](#common-responses)
    - [Success](#success)
    - [Error](#error)
    - [Validation Error](#validation-error)
    - [Unauthorized](#unauthorized)
    - [Forbidden](#forbidden)
    - [Not Found](#not-found)
    - [Method Not Allowed](#method-not-allowed)
    - [Internal Server Error](#internal-server-error)

## Auth

### Login

```http request
POST /auth/login
```

#### Request

```json
{
  "email": "test@mail.com",
  "password": "secretpassword"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Login successful",
  "userId": "<user-id>",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@mail.com",
  "accessToken": "<access-token>",
  "refreshToken": "<refresh-token>"
}
```

### Register

```http request
POST /auth/register
```

#### Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@mail.com",
  "password": "secretpassword",
  "passwordConfirmation": "secretpassword"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Registration successful",
  "userId": "<user-id>",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@mail.com",
  "accessToken": "<access-token>",
  "refreshToken": "<refresh-token>"
}
```

### Refresh Token

```http request
POST /auth/refresh-token
```

#### Request

```json
{
  "token": "<refresh-token>"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Token refreshed",
  "data": {
    "accessToken": "<access-token>"
  }
}
```

### Forgot Password

```http request
POST /auth/forgot-password
```

#### Request

```json
{
  "email": "test@mail.com"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Password reset email sent"
}
```

### Reset Password

```http request
POST /auth/reset-password
```

#### Request

```json
{
  "refreshToken": "<refresh-token>",
  "password": "newsecretpassword"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Password reset successful"
}
```

### Verify Email

```http request
POST /auth/verify-email
```

#### Request

```json
{
  "token": "<verification-token>"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Email verified"
}
```

### Resend Verification Email

```http request
POST /auth/resend-verification-email
```

#### Request

```json
{
  "email": "test@mail.com"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Verification email sent"
}
```

## Orders

### Get Orders

- Requires authentication
- Requires admin privileges

```http request
GET /orders
```

#### Response

```json
{
  "status": "success",
  "message": "Orders retrieved",
  "data": [
    {
      "id": "<order-id>",
      "userId": "<user-id>",
      "status": "pending",
      "items": [
        {
          "id": "<item-id>",
          "name": "Item 1",
          "price": 100,
          "quantity": 1
        }
      ],
      "total": 100,
      "createdAt": "2021-01-01T00:00:00.000Z",
      "updatedAt": "2021-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Order

- Requires authentication
- Requires admin privileges

```http request
GET /orders/<order-id>
```

#### Response

```json
{
  "status": "success",
  "message": "Order retrieved",
  "data": {
    "id": "<order-id>",
    "userId": "<user-id>",
    "status": "pending",
    "items": [
      {
        "id": "<item-id>",
        "name": "Item 1",
        "price": 100,
        "quantity": 1
      }
    ],
    "total": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Create Order

- Requires authentication

```http request
POST /orders
```

#### Request

```json
{
  "items": [
    {
      "id": "<item-id>",
      "paymentType": "cash",
      "quantity": 1
    }
  ]
}
```

#### Response

```json
{
  "status": "success",
  "message": "Order created",
  "data": {
    "id": "<order-id>",
    "userId": "<user-id>",
    "status": "pending",
    "items": [
      {
        "id": "<item-id>",
        "name": "Item 1",
        "price": 100,
        "quantity": 1
      }
    ],
    "total": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Complete Order

- Requires authentication
- Requires admin privileges

```http request
POST /orders/<order-id>/complete
```

#### Request

```json
{
  "reason": "Marked as completed by admin"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Order completed",
  "data": {
    "id": "<order-id>",
    "userId": "<user-id>",
    "status": "completed",
    "items": [
      {
        "id": "<item-id>",
        "name": "Item 1",
        "price": 100,
        "quantity": 1
      }
    ],
    "reason": "Marked as completed by admin",
    "total": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Cancel Order

- Requires authentication
- Requires admin privileges

```http request 
POST /orders/<order-id>/cancel
```

#### Request

```json
{
  "reason": "Cancelled by admin"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Order cancelled",
  "data": {
    "id": "<order-id>",
    "userId": "<user-id>",
    "status": "cancelled",
    "items": [
      {
        "id": "<item-id>",
        "name": "Item 1",
        "price": 100,
        "quantity": 1
      }
    ],
    "total": 100,
    "reason": "Cancelled by admin",
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Delete Order

- Requires authentication
- Requires admin privileges

```http request
DELETE /orders/<order-id>
```

#### Response

```json
{
  "status": "success",
  "message": "Order deleted"
}
```

### Order Payment

- Requires authentication
- Requires admin privileges

```http request
GET /orders/<order-id>/payment
```

#### Response

```json
{
  "status": "success",
  "message": "Payment created",
  "data": {
    "id": "<payment-id>",
    "userId": "<user-id>",
    "orderId": "<order-id>",
    "type": "cash",
    "status": "pending",
    "amount": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

## Items

### Get Items

```http request
GET /items
```

#### Response

```json
{
  "status": "success",
  "message": "Items retrieved",
  "data": [
    {
      "id": "<item-id>",
      "name": "Item 1",
      "price": 100,
      "size": "small",
      "stock": 10,
      "quantity": 100,
      "createdAt": "2021-01-01T00:00:00.000Z",
      "updatedAt": "2021-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Item

```http request
GET /items/<item-id>
```

#### Response

```json
{
  "status": "success",
  "message": "Item retrieved",
  "data": {
    "id": "<item-id>",
    "name": "Item 1",
    "price": 100,
    "size": "small",
    "stock": 10,
    "quantity": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Create Item
- Requires authentication
- Requires admin privileges

```http request
POST /items
```

#### Request

```json
{
  "name": "Item 1",
  "price": 100,
  "size": "small",
  "quantity": 100
}
```

#### Response

```json
{
  "status": "success",
  "message": "Item created",
  "data": {
    "id": "<item-id>",
    "name": "Item 1",
    "price": 100,
    "size": "small",
    "stock": 100,
    "quantity": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Update Item
- Requires authentication
- Requires admin privileges

```http request
PUT /items/<item-id>
```

#### Request

```json
{
  "name": "Item 1",
  "price": 100,
  "size": "small"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Item updated",
  "data": {
    "id": "<item-id>",
    "name": "Item 1",
    "price": 100,
    "size": "small",
    "stock": 100,
    "quantity": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Delete Item
- Requires authentication
- Requires admin privileges

```http request
DELETE /items/<item-id>
```

#### Response

```json
{
  "status": "success",
  "message": "Item deleted"
}
```

### Stock History
- Requires authentication
- Requires admin privileges

```http request
GET /items/<item-id>/stocks
```

#### Response

```json
{
  "status": "success",
  "message": "History retrieved",
  "data": [
    {
      "id": "<stock-id>",
      "itemId": "<item-id>",
      "quantity": 100,
      "type": "restock",
      "createdAt": "2021-01-01T00:00:00.000Z",
      "updatedAt": "2021-01-01T00:00:00.000Z"
    }
  ]
}
```

### Restock Item
- Requires authentication
- Requires admin privileges

```http request
POST /items/<item-id>/stock
```

#### Request

```json
{
  "quantity": 100
}
```

#### Response

```json
{
  "status": "success",
  "message": "Stock added",
  "data": {
    "id": "<stock-id>",
    "itemId": "<item-id>",
    "quantity": 100,
    "type": "restock",
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

## Payments

### Get Payments
- Requires authentication
- Requires admin privileges

```http request
GET /payments
```

#### Response

```json
{
  "status": "success",
  "message": "Payments retrieved",
  "data": [
    {
      "id": "<payment-id>",
      "userId": "<user-id>",
      "orderId": "<order-id>",
      "type": "cash",
      "status": "pending",
      "amount": 100,
      "createdAt": "2021-01-01T00:00:00.000Z",
      "updatedAt": "2021-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Payment
- Requires authentication
- Requires admin privileges

```http request
GET /payments/<payment-id>
```

#### Response

```json
{
  "status": "success",
  "message": "Payment retrieved",
  "data": {
    "id": "<payment-id>",
    "userId": "<user-id>",
    "orderId": "<order-id>",
    "type": "cash",
    "status": "pending",
    "amount": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Mark Payment as Completed
- Requires authentication
- Requires admin privileges

```http request
POST /payments/<payment-id>/complete
```

#### Response

```json
{
  "status": "success",
  "message": "Payment completed",
  "data": {
    "id": "<payment-id>",
    "userId": "<user-id>",
    "orderId": "<order-id>",
    "type": "cash",
    "status": "completed",
    "amount": 100,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z"
  }
}
```

### Delete Payment
- Requires authentication
- Requires admin privileges

```http request
DELETE /payments/<payment-id>
```

#### Response

```json
{
  "status": "success",
  "message": "Payment deleted"
}
```

## Common Responses

### Success

```json
{
  "status": "success",
  "message": "Success message",
  "data": {
    "key": "value"
  }
}
```

### Error

```json
{
  "status": "error",
  "message": "Error message"
}
```

### Validation Error

```json
{
  "status": "error",
  "message": "Validation error",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### Unauthorized

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

### Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
}
```

### Not Found

```json
{
  "status": "error",
  "message": "Not found"
}
```

### Method Not Allowed

```json
{
  "status": "error",
  "message": "Method not allowed"
}
```

### Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error"
}
```
