const userdba = require("./dbauser");
const find_token=userdba.findtoken;
const updateuser=userdba.update_valid;
const data_from_table=userdba.data_from_table;
module.exports=function verifytoken(req,res)
{
    // console.log("gffh");
    const {token} =req.params;
   let users=find_token(token)
  users.then(function(users)
  {
        if(users.length>0)
        {
            // console.log("sdghxfcjgv");
            // const id=data[0].email;
            // const token=jwt.sign({id},"jwtSecret");
            let d=updateuser(token)
            d.then(function(d)
            {
                // console.log("aesrd");
                if(d)
                {
                    // console.log("gewrhdf");
                   res.redirect("http://localhost:5173/login");
                    // res.send(JSON.stringify({"auth":true,"token":token,"status":201}));
                    return;
                }
            })
        }
        else if(users.length==0)
        {
            res.redirect("http://localhost:5173/login");
            // res.send(JSON.stringify({"auth":true,"status":202}));
            return;
        }
                 
}
,function(err)
  {
     res.send(202).end();
  })
  }
 