var connection = require('../database');

class LoginController {
    static login = (req,res) => {
        console.log(req.body);
        console.log(req.body.username);
        console.log(req.body.password);
        res.json({status:1,username:req.body.username});
    }
}

module.exports = LoginController;