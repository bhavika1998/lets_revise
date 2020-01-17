var connection = require('../database');

class LoginController {
    static login = (req,res) => {
        console.log(req.body);
        console.log(req.body.username);
        console.log(req.body.password);
        res.json({status:1,username:req.body.username,password:req.body.password});
var username=req.body.username
var qs = "select * from user where username = '" + username + "' and password = '" + req.body.password + "'"
        connection.query(qs ,function(err,rows,fields){
            if (err) throw err
            console.log(rows);
        })
    }

}

module.exports = LoginController;