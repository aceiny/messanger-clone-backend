
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




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`MONGO_URI`

