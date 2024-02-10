
# What is This ? 
this is a fully funcitonel api that you can use to create a real time messanger clone or any chat app clone 


## Installation
```bash
$ npm install
```
## development
```bash
$ npm run start:dev
```
## Deployment

To deploy this project run

```bash
  npm run start:prod
```


## API Reference

#### Signup new user

```http
  POST /auth/signup
```

| Parameter | Type     |
| :-------- | :------- |
| `Name` | `string` |
| `Username` | `string` |
| `Passsword` | `string` |

#### Login user

```http
  GET /auth/login
```

| Parameter | Type     |
| :-------- | :------- |
| `Username` | `string` |
| `Passsword` | `string` |

#### Create Chat

```http
  POST /chat  'require auth'
```

| Parameter | Type     |
| :-------- | :------- |
| `Name`    | `string` |
| `IsGroup` | `boolean` |
| `ImageUrl`| `string` |
|`Participants`| `array` |

#### Get all my chats

```http
  Get /chat  'require auth'
```
#### Get a single Chat

```http
  Get /chat/:ChatId  'require auth'
```
#### Send a new message
```http
  POST /message/:ChatId  'require auth'
```

| Parameter | Type     |
| :-------- | :------- |
| `Message`    | `string` |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`MONGO_URI`

