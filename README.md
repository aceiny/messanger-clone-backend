#Rest API for messanger clone built using nest js 
##a fully funcitonel api that you can use to create a real time messanger clone or any chat app clone 
*signup and signin
*send's read and delete messages
*evrything is realtime

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
response time : 80ms-150ms-500ms

### auth/login  //POST user login
<details>
<summary><code>Json Object</code></summary>
```json
{
    login : {
    Username: string;
    Password: string // min length 8
    }
}
</details>
### auth/signup  //POST user signup
<details>
<summary><code>Json Object</code></summary>
```tsx
Signup : {
    Name : string ;
    Username: string;
    Password: string
    }
```
</details>