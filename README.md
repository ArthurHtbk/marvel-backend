# My Marvel tribute (back end)

Welcome to the back-end repository of my Marvel tribute!


## How to use

### /user/signup (POST)

Create an account.

| formData   | Info     | Description            |
| ---------- | -------- | ---------------------- |
| `email`    | Unique   | User's email address   |
| `password` |          | User's password        |
| `username` | Required | User's username        |
| `picture`  |          | User's profile picture |


### /user/login (POST)

Log into user's account

| Body       | Description          |
| ---------- | -------------------- |
| `email`    | User's email address |
| `password` | User's password      |


### /comics/:characterId (GET)

Get a list of comics featuring a specific character.

#### Params

| Params        | Required | Description             |
| ------------- | -------- | ----------------------- |
| `characterId` | Yes      | Character's database id |

#### Queries

| Query    | Required | Description |
| -------- | -------- | ----------- |
| `apiKey` | Yes      | API key     |


### /comics (GET)

Get a list of comics

| Query    | Required | Description                       |
| -------- | -------- | --------------------------------- |
| `apiKey` | Yes      | API key                           |
| `skip`   | No       | Number of results to ignore       |
| `title`  | No       | Search entry for a specific comic |


### /character (GET)

Get a list of characters

| Query    | Required | Description                           |
| -----    | -------- | ------------------------------------- |
| `apiKey` | Yes      | API key                               |
| `skip`   | No       | Number of results                     |
| `name`   | No       | Search entry for a specific character |


### /favorites/characters/add_delete (POST)

Add or delete a character from user's list of favorite characters.

#### Headers 

| Header  | Description  |
| ------- | ------------ |
| `token` | User's token |

#### Body

| Body | Description             |
| ---- | ----------------------- |
| `id` | Character's database id |


### /favorites/comics/add_delete (POST)

Add or delete a comic from user's list of favorite comics.

#### Headers

| Header  | Description  |
| ------- | ------------ |
| `token` | User's token |

#### Body

| Body | Description         |
| ---- | ------------------- |
| `id` | Comic's database id |


### /favorites/characters/isFavorite (POST)

Determine if a specific character is featured in user's list of favorite characters.

#### Headers

| Header  | Description  |
| ------- | ------------ |
| `token` | User's token |

#### Body

| Body | Description             |
| ---- | ----------------------- |
| `id` | Character's database id |


### /favorites/comics/isFavorite (POST)

Determine if a specific comic is featured in user's list of favorite comics.

#### Headers

| Header  | Description  |
| ------- | ------------ |
| `token` | User's token |

#### Body 

| Body | Description         |
| ---- | ------------------- |
| `id` | Comic's database id |


### /favorites/characters (GET)

Get user's list of favorite characters, no queries or params needed.

| Header  | Description  |
| ------- | ------------ |
| `token` | User's token |


### /favorites/comics (GET)

Get user's list of favorite comics, no queries or params needed.

| Header  | Description  |
| ------- | ------------ |
| `token` | User's token |


## Packages & dependencies

- [Axios](https://www.npmjs.com/package/axios)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)
- [Cors](https://www.npmjs.com/package/cors)
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express-formidable](https://www.npmjs.com/package/express-formidable)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [uid2](https://www.npmjs.com/package/uid2)


## Check this out!

- **[My Marvel tribute](https://focused-leavitt-6e6137.netlify.app/)**
- **The corresponding [front-end repository](https://github.com/ArthurHtbk/marvel-frontend)**