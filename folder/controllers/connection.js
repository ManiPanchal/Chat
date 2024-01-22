const mysql = require('mysql');
module.exports=function()
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "chatapp"
  });
  
  return con;
}