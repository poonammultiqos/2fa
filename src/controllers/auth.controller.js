const User = require("../models/user.model");
const {authenticator} = require('otplib')
const QRCode = require('qrcode')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        const secretKey = authenticator.generateSecret();
        const email = req.body.email;
        const uses = new User({
            email: email,
            secret: secretKey
        });
        let userSave = await uses.save();
        if (!userSave) {
            console.log('user not saved');
        }
        console.log("user saved")
        //generate qr and put it in session
        await QRCode.toDataURL(authenticator.keyuri(email, '2FA Node App', secretKey), (err, url) => {
            if (err) {
                throw err
            }
            req.session.qr = url
            req.session.email = req.body.email
            res.redirect('/sign-up-2fa')
        })
    } catch (err) {
        console.log("error", err);
    }
};

exports.signup2Fa = async (req, res) => {
    try {
        if (!req.session.email) {
            return res.redirect('/')
        }
        const email = req.session.email, code = req.body.code
        return verifyLogin(email, code, req, res, '/sign-up-2fa')
    } catch (err) {
        console.log(err)
    }
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email, code = req.body.code
        return verifyLogin(email, code, req, res, '/login')
    } catch (err) {
        console.log(err);
    }
}

function verifyLogin(email, code, req, res, failUrl) {
    //load user by email

    User.findOne({email: email})
        .then(user => {
            console.log(authenticator.check(code, user.secret));
            if (!authenticator.check(code, user.secret)) {
                return res.redirect(failUrl)
            }
            //correct, add jwt to session
            req.session.qr = null
            req.session.email = null
            req.session.token = jwt.sign(email, 'supersecret')
            //redirect to "home" page
            return res.redirect('/home')
        })
        .catch(err => {
            return err;
        });
}