var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Let\'s Revise Database'
})

// try{
   connection.connect();
// } catch(ex) {
//   console.log(ex);
// }

module.exports = connection;