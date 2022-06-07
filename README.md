##Add Authentication with Google Authenticator in Node.js with MongoDB

####1) Start by creating a directory for our project and changing to it


    mkdir 2fa-tutorial
    
    cd 2fa-tutorial

####2) Initialize the project with NPM
`npm init -y`

####3) Install the dependencies
`npm i express ejs body-parser express-session express-jwt jsonwebtoken sqlite3 otplib qrcode nodemon
`

####4) Create Server
- Imports all the dependencies 
- Create database connection with mongodb
- Create users table, for simplicity, will only have the columns id, email and secret.

####5) Create Sign Up, QR code, Home, Login page
- Form with only an email input and a submit button. 
- After the user enters their email and clicks on submit, their account will be redirected and will be redirected to scan the QR code page.
- Scan QR and enter code
- 2fa authentication enabled if redirect to home 
- Login to user 
- Add 2fa code ,check with database secretkey and redirect to home
- Logout user and session destroy

####6) Test it Out
`npm run dev`