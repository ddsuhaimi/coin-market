# Crypto API

Simple API for getting cyptocurrencies data (utilizing third party Coin Market API)

## Demo

If you want to test it without running locally, you can make request to [coin-market-node.herokuapp.com/api](https://coin-market-node.herokuapp.com/api)

---

## Features

- Logging to various transport (file, console, and MongoDB)
- Storing hashing password instead of plaintext
- Automatically generated access token for new user

---

## Tech Stack

**Server:** Node, Express, MongoDB

**Others:** Winston (for logging), bcryptjs (for hashing), jsonwebtoken(for generating token)

---

## Installation

Install with npm:

**Step 1.** Go to project directory

```
cd coinMarket
```

**Step 2.** Install all dependecies

```
npm install
```

**Step 3.** Fill in environment variables

a) Open file `.env.example`

b) Fill in all environment variables

```
PROD_DB_URI = <mongodb uri>
PROD_JWT_SECRET = <jwt secret>
PROD_COIN_MARKET_API_KEY = <coin market api key>

DEV_APP_PORT = 5005
DEV_DB_URI = mongodb://127.0.0.1:27017/coinmarket
DEV_JWT_SECRET = secret
DEV_COIN_MARKET_API_KEY = <coin market api key>
```

**Step 4.** Remove `.example` extension from `.env.example` filename

**Step 5.** Run the server

```
npm run dev
```

for development. or 
```
npm run prod
```

for production.

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Notes:** Those that starts with `PROD` are for production and `DEV` are for development. 

`PROD_DB_URI`

`PROD_JWT_SECRET`

`PROD_COIN_MARKET_API_KEY`

`DEV_APP_PORT`

`DEV_DB_URI`

`DEV_JWT_SECRET`

`DEV_COIN_MARKET_API_KEY`

<br />

For production, the server will run on whatever port defined in `process.env.PORT`.

---
## API Reference
:information_source: You can get the postman collection on `.submit` folder.

#### Register user

```http
  POST /api/users
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |
<br/>
#### Login user

```http
  POST /api/users/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |
<br/>
#### Get cryptocurrency list

```http
  GET /api/listings
```

| Header          | Type     | Description                                      |
| :-------------- | :------- | :----------------------------------------------- |
| `Authorization` | `string` | **Required**. Your token, created after register |
<br/>
---
## Screenshots
Register user: POST /api/users

![api/users](https://i.postimg.cc/HLJRbDQZ/api-users.png)

Login user: POST /api/users/login

![api/users/login](https://i.postimg.cc/2S9gq8BL/api-users-login.png)

Get cryptocurrency list: GET /api/listings

![api/listings](https://i.postimg.cc/x11WTbqS/api-listings.png)

---
## Folder structure
```
+-- .env
+-- package.json
+-- src
|   +-- config
|   +-- middlewares
|   +-- routes
|       +-- api
|   +-- constants
|   +-- utils
|   +-- models
```