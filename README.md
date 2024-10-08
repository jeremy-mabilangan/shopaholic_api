# Shopaholic API

Shopaholic API is a node js API for the e-commerce website using Node.js, Express, and MongoDB (mongoose).

## Getting Started

- Clone the repository

```
git clone https://github.com/jeremy-mabilangan/shopaholic_api.git
```

- Install dependencies

```
npm install
```

- Create .env file
- Create a MongoDB cluster and paste it into the .env file

```
MONGODB_URL="mongodb_cluster_url"
PORT=3000
JWT_SECRET_KEY=sEcrEt-k3y
```

- Run the project

```
node index.js
```

## API Endpoints

| HTTP Method | Endpoint                       | User Role     | Description                      |
| ----------- | ------------------------------ | ------------- | -------------------------------- |
| `POST`      | `/users`                       |               | Create user                      |
| `POST`      | `/users/login`                 |               | Login user                       |
| `GET`       | `/users`                       | `admin, user` | Get user details                 |
| `POST`      | `/users/cart`                  | `user`        | Add to cart or update cart items |
| `GET`       | `/users/cart`                  | `user`        | Get user cart                    |
| `POST`      | `/products`                    | `admin`       | Add products                     |
| `POST`      | `/products/edit/:product_id`   | `admin`       | Edit product details             |
| `GET`       | `/products`                    |               | Get products list                |
| `DELETE`    | `/products/delete/:product_id` | `admin`       | Delete product                   |
| `POST`      | `/orders`                      | `user`        | Create Order                     |
| `GET`       | `/orders`                      | `admin, user` | Get Order                        |
| `PUT`       | `/orders/orderId`              | `admin`       | Update Order Status              |

## User Role

Accessing some APIs depend on the account role. Here are the available roles:

| Code | Role  |
| ---- | ----- |
| R1   | admin |
| R2   | user  |

## Create User API

- `POST /users`
- Payload

```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "123456",
  "confirmPassword": "123456",
  "role": "R1" // Check the user role above.
}
```

- Response

```json
// Success
{
    "status": 201,
    "message": "Added User Successfully"
}

// Error
// Email is already been taken
{
    "status": 422,
    "errors": [
        {
            "type": "field",
            "value": "johndoe@gmail.com",
            "msg": "Email is already been taken.",
            "path": "email",
            "location": "body"
        }
    ]
}
```

## Login User API

- `POST /users/login`
- Payload

```json
{
  "email": "johndoe5@gmail.com",
  "password": "123456"
}
```

- Response

```json
{
  "status": 200,
  "token": "exampletokenstring"
}
```

## Get User API

- `GET /users`
- Headers
  - Authorization: Bearer {token}
- Response

```json
{
  "status": 200,
  "user": {
    "cart": {
      "items": [
        {
          "product_id": "123",
          "quantity": 1,
          "_id": "989"
        }
      ]
    },
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "__v": 0
  }
}
```

## Add to Cart API

- `POST /users/cart`
- Headers
  - Authorization: Bearer {token}
- Payload

```json
// Add to cart or increment the quantity
{
    "product_id": "123"
}

// Instant update quantity
// Example: From 1 quantity to 5 quantity
{
    "product_id": "123",
    "quantity": 5
}

// Remove to cart
{
    "product_id": "123",
    "quantity": 0
}
```

- Response

```json
{
  "status": 200,
  "message": "Cart updated successfully"
}
```

## Get Cart API

- `GET /users/cart`
- Headers
  - Authorization: Bearer {token}
- Response

```json
{
  "status": 200,
  "cart": {
    "items": [
      {
        "product_id": "123",
        "name": "Item 1",
        "price": 50,
        "description": "Item 1",
        "imageUrl": "https://image.com/item1.jpg",
        "quantity": 5
      }
    ]
  }
}
```

## Add Products API

- `POST /products`
- Payload

```json
{
  "name": "Item 1",
  "price": 50,
  "description": "Item 1",
  "imageUrl": "https://image.com/item1.jpg"
}
```

- Response

```json
{
  "status": 201,
  "message": "Added Product Successfully"
}
```

## Get Products API

- `GET /products

- Response

```json
{
  "status": 200,
  "products": [
    {
      "id": "123",
      "name": "Item 1",
      "price": 50,
      "description": "Item 1",
      "imageUrl": "https://image.com/item1.jpg"
    },
    {
      "id": "124",
      "name": "Item 2",
      "price": 50,
      "description": "Item 2",
      "imageUrl": "https://image.com/item2.jpg"
    }
  ]
}
```

## Edit Products API

- `POST /products/edit/123`
- Payload

```json
{
  "name": "Item 1",
  "price": 50,
  "description": "Item 1",
  "imageUrl": "https://image.com/item1.jpg"
}
```

- Response

```json
{
  "status": 200,
  "product": {
    "_id": "123",
    "name": "Item 1",
    "price": 50,
    "description": "Item 1",
    "imageUrl": "https://image.com/item1.jpg"
  }
}
```

## Delete Products API

- `DELETE products/delete/66dffa877e4b2bf8a2648afb`

````
- Response

```json
{
  "status": 200,
  "message": "Deleted Successfully"
}
````

## Create Order API

- `POST /orders`
- Headers
  - Authorization: Bearer {token}
- Payload

````json
{
    "cart": [
        {
            "product_id": "123",
            "name": "Item 1",
            "price": 50,
            "description": "Item 1",
            "imageUrl": "https://image.com/item1.jpg",
            "quantity": 5
        },
        {
            "product_id": "124",
            "name": "Item 2",
            "price": 50,
            "description": "Item 2",
            "imageUrl": "https://image.com/item2.jpg",
            "quantity": 6
        }
    ]
}
- Response

```json
{
  "status": 201,
  "message": "Order Created!"
}
````

## Get Order API

- `GET /orders`
- Headers
  - Authorization: Bearer {token}
- Response

```json
{
  "status": 200,
  "result": [
    {
      "_id": "555",
      "user_id": "6666",
      "status": "pending",
      "total_amount": 550,
      "items": [
        {
          "product_id": "123",
          "name": "Item 1",
          "price": 50,
          "description": "Item 1",
          "imageUrl": "https://image.com/item1.jpg",
          "quantity": 5
        },
        {
          "product_id": "124",
          "name": "Item 2",
          "price": 50,
          "description": "Item 2",
          "imageUrl": "https://image.com/item2.jpg",
          "quantity": 6
        }
      ],
      "__v": 0
    }
  ]
}
```

## Update Order Status API

- `PUT /orders/:orderId`
- Headers
  - Authorization: Bearer {token}
- Payload

```json
{
  "status": "preparing"
}
```

- Response

```json
{
  "success": true,
  "message": "Order status updated successfully"
}
```
