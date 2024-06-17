const connection=require("./connection");
function finduser(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM users where email="${email}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                if(JSON.parse(JSON.stringify(result)).length==0)
                {
                  resolve(2);
                }
                else{
                  resolve(1);
                }
                 
              }
            });
          });
    })
    
      
      
}
function finduser_2(name)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM users where email="${name}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                if(JSON.parse(JSON.stringify(result)).length==0)
                {
                  resolve(2);
                }
                else{
                  resolve(1);
                }
                 
              }
            });
          });
    })
    
      
      
}
function createuser(user)
{
    //  console.log(user);
      return new Promise(function(resolve,reject)
      {
        var con=connection();
        con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into users values("${user.email}","${user.password}","${user.name}","${user.region}","${user.mailToken}",${user.isvalid})`,function (err,result,fields)
            {
                if(err) return reject(err);
                if(result){
                  // console.log(result);
                    resolve(1);
                }
            });
          });
      })
      
}
function findunique(email,password,name)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from users where email="${email}" AND password="${password}" AND name="${name}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
              
            });
          });
    })
}
function findtoken(token)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from users where mailtoken="${token}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
              
            });
          });
    })
}
function update_valid(token)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update users set isvalid="1" where mailToken="${token}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
              
            });
          });
    })
}
function update_pass(email,pass)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update users set password="${pass}" where email="${email}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
              
            });
          });
    })
}
function find(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM users where email="${email}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                
                  resolve(JSON.parse(JSON.stringify(result)));
              }
                
                 
              
            });
          });
    })
    
      
      
}
function find_g(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * from \`groups\` where group_id in (SELECT g_id from group_user where state!="I" AND user_id=(select mailtoken from users where email="${email}"))`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                // SELECT * from groups where group_id in (SELECT g_id from group_user where user_id=(select mailtoken from users where email="manisha.213004@maimt.com"))
                  resolve(JSON.parse(JSON.stringify(result)));
              }
                
                 
              
            });
          });
    })
    
      
      
}
// function creategroup(id,name,date,email)
// {
//     return new Promise(function(resolve,reject)
//     {
//       var con=connection();
//           console.log("connected");
//           con.connect(function(err) {
//             if (err) throw err;
//             con.query(`Insert into groups values("${id}","${name}","${date}","${email}")`, function (err, result, fields) {
//               if (err) return reject(err);
//               if(result)
//               {
//                 con.query(`select * from  where group_id="${id}"`, function (err, result, fields) {
//                   if (err) return reject(err);
//                   if(result)
//                   {
                    
//                     console.log(result);
//                       resolve(result);
//                   }
//                 });
//                 console.log(result);
//                   resolve(result);
//               }
//             });
//           });
//     })
    
// }
function creategroup(id, name, date, email,time) {
  return new Promise(function (resolve, reject) {
    var con = connection();
    // console.log("connected");
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `INSERT INTO \`groups\` VALUES("${id}","${name}","${date}","${email}","${time}")`,
        function (err, result, fields) {
          if (err) return reject(err);
          if (result) {
            con.query(
              `SELECT * FROM \`groups\` WHERE group_id="${id}"`,
              function (err, innerResult, fields) {
                if (err) return reject(err);
                if (innerResult) {
                  // console.log(innerResult);
                  resolve(JSON.parse(JSON.stringify(innerResult)));
                }
              }
            );
          }
        }
      );
    });
  });
}
function find_f(id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from users where isvalid=1 AND mailtoken not in (select user_id from group_user where g_id="${id}") `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                // select * from users where isvalid=1 AND mailtoken  not in (select user_id from group_user where g_id="${id}")
                // console.log(result);select id,username,email from user where isvalid=1 and id not in (select user_id from members where group_id=)
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function find_details(id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT group_name,group_id,admin_name,start_date,users.name FROM \`groups\`  join users on groups.admin_name=users.email where  groups.group_id="${id}" `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function insert_invite(id,email,userId)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM group_user where g_id="${id}" AND user_id="${email}" `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                   if(result.length==0)
                   {
                    {
                      con.query(
                        `Insert into group_user values("${id}","${email}","I")`,
                        function (err, innerResult, fields) {
                          if (err) return reject(err);
                          if (innerResult) {
                            // console.log(innerResult);
                            resolve(1);
                          }
                        }
                      );
                    }
                   }
                  // resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function find_mailtoken(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM users  where email="${email}"  `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function update(g_id,u_id)
{
  // console.log(g_id,u_id);
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update group_user set state="M" where g_id="${g_id}" AND user_id="${u_id}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(1);
              }
            });
          });
    })    
}
function find_all(email)
{
  // console.log(g_id,u_id);
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from \`groups\` where group_id in (select g_id from group_user where user_id=(select mailtoken from users where email="${email}"))`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function insert_g(g_id,user_id,a)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into group_user values("${g_id}","${user_id}","${a}") `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function find_m(id,start,count)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          // console.log(start,count);
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT message,date_message,time, users.name FROM message join users on message.user_id=users.mailtoken  where  message.g_id="${id}" order by date_message desc,message.time desc limit ${start},${count}`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function insert_m(u_id,g_id,m,d,t)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into message values("${u_id}","${g_id}","${m}","${d}","${t}")`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  // resolve(JSON.parse(JSON.stringify(result)));
                  
                    con.query(
                      `SELECT message,date_message,time, users.name FROM message join users on message.user_id=users.mailtoken  where  message.g_id="${g_id}" AND message.user_id="${u_id}" AND message.message="${m}" AND message.date_message="${d}" AND message.time="${t}"`,
                      function (err, innerResult, fields) {
                        if (err) return reject(err);
                        if (innerResult) {
                          // console.log(innerResult);
                          resolve(JSON.stringify(innerResult));
                        }
                      }
                    );
                  
              }
            });
          });
    })    
}
function find_msg(id,m)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT count(message) as total FROM message join users on message.user_id=users.mailtoken  where  message.g_id="${id}" AND message.message like "%${m}%"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function find_top_group(p,past)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT groups.group_id, groups.group_name, COUNT(message.message) AS m
            FROM \`groups\`
            LEFT JOIN message ON groups.group_id = message.g_id
            WHERE message.date_message BETWEEN "${p}" AND "${past}"
            GROUP BY groups.group_id,groups.group_name
            ORDER BY m DESC
            LIMIT 0, 5`,function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function find_top_user(p,past)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT users.name, COUNT(message.message) AS m
            FROM users
            LEFT JOIN message ON users.mailtoken = message.user_id
            WHERE message.date_message BETWEEN "${p}" AND "${past}"
            GROUP BY users.mailtoken,users.name
            ORDER BY COUNT(message.message) DESC
            LIMIT 0, 5`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function find_top_region(p,past)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT users.region,COUNT(DISTINCT users.mailtoken) AS active_users_count,COUNT(message.message) AS message_count FROM users LEFT JOIN
            message ON users.mailtoken = message.user_id where message.date_message BETWEEN "${past}" AND "${p}"
        GROUP BY
            users.region
        ORDER BY
            message_count DESC
        LIMIT 0, 5;
        `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function find_p(id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT name from users where mailtoken in (SELECT user_id from group_user where g_id="${id}");`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                  resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })    
}
function check(u_id,g_id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * from group_user where g_id="${g_id}" AND user_id="${u_id}" AND (state="M" OR state="A")`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                resolve(JSON.parse(JSON.stringify(result)));
                  // resolve(1);
              }
            });
          });
    })    
}
function getalluser(id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT email,name,mailtoken,region from users where email!="${id}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                resolve(JSON.parse(JSON.stringify(result)));
                  // resolve(1);
              }
            });
          });
    })    
}
function getuserdetails(id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT email,name,mailtoken,region from users where mailtoken="${id}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                resolve(JSON.parse(JSON.stringify(result)));
                  // resolve(1);
              }
            });
          });
    })    
}

function find_msg(id1,start,count,id2)
{
  // console.log(id1,start,count,id2);
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT message,date_message,time_message, users.name FROM one_to_one join users on one_to_one.from_user_id=users.mailtoken  where  (one_to_one.from_user_id="${id2}" AND one_to_one.to_user_id="${id1}")  or (one_to_one.from_user_id="${id1}" AND one_to_one.to_user_id="${id2}") order by date_message desc,one_to_one.time_message desc limit ${start},${count}`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                resolve(JSON.parse(JSON.stringify(result)));
                  // resolve(1);
              }
            });
          });
    })    
}
function insert_m2(id1,id2,message,date,time)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          // console.log("connected");
          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into one_to_one values("${id1}","${id2}","${message}","${date}","${time}")`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                // console.log(result);
                // resolve(JSON.parse(JSON.stringify(result)));
                  // resolve(1);
                  con.query(
                    `SELECT message,date_message,time_message, users.name FROM one_to_one join users on one_to_one.from_user_id=users.mailtoken  where  one_to_one.from_user_id="${id1}" AND one_to_one.to_user_id="${id2}" AND one_to_one.message="${message}" AND one_to_one.date_message="${date}" AND one_to_one.time_message="${time}"`,
                    function (err, innerResult, fields) {
                      if (err) return reject(err);
                      if (innerResult) {
                        // console.log(innerResult);
                        resolve(JSON.stringify(innerResult));
                      }
                    }
                  );
              }
            });
          });
    })    
}
function check2(mailToken,id){
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        // console.log("connected");
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select * from user`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
              // console.log(result);
              resolve(JSON.parse(JSON.stringify(result)));
                // resolve(1);
            }
          });
        });
  })   
}
module.exports={finduser,createuser,findunique,finduser_2,findtoken,update_valid,update_pass,find,find_g,creategroup,find_f
,find_details,insert_invite,find_mailtoken,update,find_all,insert_g,find_m,insert_m,find_msg,find_top_group,find_top_user,find_top_region,find_p,check,getalluser,getuserdetails,insert_m2};