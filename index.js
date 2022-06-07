require('./src/connections/db');

const express = require('express')
const session = require('express-session')

const {expressjwt: expressJwt} = require('express-jwt');
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const userModel = require("../2fa-tutorial/src/models/user.model")
app.set('view engine', 'ejs')
app.use(session({secret: "supersecret", resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: false}))


app.listen(port, () => {
    console.log(`2FA Node app listening at http://localhost:${port}`)
})

//Signup page open
app.get('/', (req, res) => {
    res.render('signup.ejs');
})

const authRoutes = require("./src/routes/auth.route");
app.use("/auth", authRoutes);

//2fa page open
app.get('/sign-up-2fa', (req, res) => {
    if (!req.session.qr) {
        return res.redirect('/')
    }
    return res.render('signup-2fa.ejs', {qr: req.session.qr})
})

//Login page open
app.get('/login', (req, res) => {
    return res.render('login.ejs')
})

const jwtMiddleware = expressJwt({
    secret: 'supersecret', algorithms: ['HS256'], getToken: (req) => {
        return req.session.token
    }
})

//home page
app.get('/home', jwtMiddleware, (req, res) => {
    return res.render('home.ejs', {email: req.user})
})

//logout
app.get('/logout', jwtMiddleware, (req, res) => {
    req.session.destroy()
    return res.redirect('/')
})