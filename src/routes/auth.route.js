//  demo for Node.js Express Rest API example that supports Token Based Authentication with JSONWebToken (JWT).
var router = require("express").Router();
const controller = require("../controllers/auth.controller");
router.post("/sign-up", controller.signup);
router.post("/sign-up-2fa", controller.signup2Fa);
router.post("/login", controller.login);

module.exports = router;