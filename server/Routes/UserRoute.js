const express = require("express"),
    router = express.Router(),
    controller = require('../Controllers/UserController.js')




router.post('/getdata', controller.getdata);
router.post('/update', controller.update);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/verify_token', controller.verify_token);


module.exports = router;