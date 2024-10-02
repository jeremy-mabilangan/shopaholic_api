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
MONGO_URL="mongodb_cluster_url"
PORT=3000
SECRET_KEY=sEcrEt-k3y
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
          "product_id": "66ea821cd96c8bf3b4e3cc1c",
          "quantity": 1,
          "_id": "66fba25860df1f0efc2a4860"
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
    "product_id": "66ea821cd96c8bf3b4e3cc1c"
}

// Instant update quantity
// Example: From 1 quantity to 5 quantity
{
    "product_id": "66ea821cd96c8bf3b4e3cc1c",
    "quantity": 5
}

// Remove to cart
{
    "product_id": "66ea821cd96c8bf3b4e3cc1c",
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
        "product_id": "66ea821cd96c8bf3b4e3cc1c",
        "name": "Chicken",
        "price": 91,
        "description": "Chickenjoy",
        "imageUrl": "https://f4.bcbits.com/img/a2002470507_16.jpg",
        "quantity": 1
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
  "name": "Chicken",
  "description": "Chickenjoy",
  "price": "91",
  "imageUrl": "https://f4.bcbits.com/img/a2002470507_16.jpg"
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
      "_id": "66dff75806841fab29853f7b",
      "name": "Spaghetti",
      "price": 79,
      "description": "Jolly Spaghetti",
      "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jollibeefoods.com%2Fproducts%2Fjolly-spaghetti&psig=AOvVaw1txgfkPiU_dwInWFFw1y2I&ust=1724224908041000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjesruEg4gDFQAAAAAdAAAAABAE",
      "__v": 0
    },
    {
      "_id": "66fba6f7ae68c075ed2bedd9",
      "name": "Chicken",
      "price": 95,
      "description": "Chickenjoy",
      "imageUrl": "https://f4.bcbits.com/img/a2002470507_16.jpg",
      "__v": 0
    }
  ]
}
```

## Edit Products API

- `POST /products/edit/66ea821cd96c8bf3b4e3cc1c`
- Payload

```json
{
  "name": "Chicken",
  "description": "Chickenjoy",
  "price": "99",
  "imageUrl": "https://f4.bcbits.com/img/a2002470507_16.jpg"
}
```

- Response

```json
{
  "status": 200,
  "product": {
    "_id": "66ea821cd96c8bf3b4e3cc1c",
    "name": "Chicken",
    "price": 99,
    "description": "Chickenjoy",
    "imageUrl": "https://f4.bcbits.com/img/a2002470507_16.jpg",
    "__v": 0
  }
}
```

## Delete Products API

- `DELETE products/delete/66dffa877e4b2bf8a2648afb`
- Response

```json
{
  "status": 200,
  "message": "Deleted Successfully"
}
```

## Create Order API

- `POST /orders`
- Headers
  - Authorization: Bearer {token}
- Response

```json
{
  "status": 201,
  "message": "Order Created!"
}
```

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
      "_id": "66fbb7e00faea05073d6af02",
      "user_id": "66e3f1c421d0824656ae487f",
      "status": "pending",
      "total_amount": 194,
      "items": [
        {
          "name": "Chicken",
          "price": 95,
          "imageUrl": "https://f4.bcbits.com/img/a2002470507_16.jpg",
          "description": "Chickenjoy",
          "quantity": 3,
          "_id": "66fbb7e00faea05073d6af03"
        },
        {
          "name": "Chicken",
          "price": 99,
          "imageUrl": "https://f4.bcbits.com/img/a2002470507_16.jpg",
          "description": "Chickenjoy",
          "quantity": 1,
          "_id": "66fbb7e00faea05073d6af04"
        }
      ],
      "__v": 0
    }
  ]
}
```
