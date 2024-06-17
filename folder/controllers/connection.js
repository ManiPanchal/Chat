const mysql = require('mysql2');
module.exports=function()
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "chatapp"
  });
  
  return con;
}