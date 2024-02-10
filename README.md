
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## about this project
```bash
response time : 80ms-150ms-500ms

/auth/login  //POST login both user and admin can login
/auth/signup //POST signup  only admin can create a new account 
signup : { 
    Firstname  : string
    Lastname:  string
    Phone  : string //DZ phone number
    Email  : string
    Password  : string //min length 8 }
login : {
    Email: string;
    Password: string // min length 8}

