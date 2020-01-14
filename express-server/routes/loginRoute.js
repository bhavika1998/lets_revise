var express = require('express');
    router = express.Router();

const controller =  require('../controllers');


router.post('/',controller.LoginController.login);

module.exports = router;