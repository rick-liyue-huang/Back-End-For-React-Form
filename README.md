

## The NodeJS based Backend for the Register/Login Form by ReactJS

#### Introduction

This project is the back end part for the ReactJS based register/login form front end, through which I will use Express.js, MongoDB and Jsonwebtoken to realize back end supports of account register, login and logout functions.


#### Project Working Flow

The whole project complete the following working steps:
1. Create web server by Express.js;
2. Connect server with MongoDB by Mongoose library;
3. Config register, login and logout Routes and Controllers to match the register, login and logout form operation;
4. In register controller, I create the new account and store in MongoDB;
5. In auth/login controller, I create the access token and refresh token after login successfully;
6. In the refreshToken controller, I create the access token from refresh token;
7. I clear the refreshToken property of account to log out the current account;
8. After login and get token, the account can manual the employee list by CRUD MongoDB.


#### Access Token and Refresh Token

Another key point of this project is to differentiate the Access Token and Refresh Token, 

Access Token:
- Short term
- Send as JSON
- Client store it in memory
- Will be lost when app is closed
- Do not store in localstorage or cookie
- Issued at authorization
- Client uses for api access util expires
- Verify with middleware
- New access token issued from refresh token

Refresh Token:
- Long term
- Sent as httpOnly cookie
- Not accessible via JS
- Must have been expired at some time
- Issued at Authorization
- Client use it to get access token
- Verify with endpoint and database
- Must be allowed to expire or logout

Login to Authentication (refer to the process of verifying who is he), After login to Authorization (efer to the process of verify what resources a user has access to)

`require('crypto').randomBytes(64).toString('hex')` to get token secret key
