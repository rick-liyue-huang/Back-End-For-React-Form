
JWT: JSON WEB TOKEN

access token:
short time
sent as json 
client stores in mememory, 
can be lost when app is closed, so 
do not store in local storage or cookie
issued at authorization
client uses for api access until expires
verified with middleware
new token issued at refresh request

refresh token:
long time
sent as httponly cookie
not accessible via js
must have expired at some point
issued at authorization
client uses to request new access token
verified with endpoint & database
must be allowed to expire or logout

xss: cross site scripting
csrf: cs request forgery


Authentication vs Authorization

Authentication:
refer to the process of verifying who someomeis
act as login

Authorization:
refer to the process of verify what resources a user has access to


so JWT
confirm authentication
allow access to API endpoint
endponts provide data resources
user authorization header



`require('crypto').randomBytes(64).toString('hex')` to get token secret key
