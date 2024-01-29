const dbauser=require("./dbauser");
const findunique=dbauser.find;
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
module.exports=function postlogin(req, res) {

    console.log(req.body);
      const name=req.body.name;
       const email=req.body.email;
       const password=req.body.password;
         let user=findunique(email)
       user.then(async function(data)
       {
        // console.log(data);
          if(data.length>0)
          {
            // console.log(data[0]);
            // req.session.email=data[0].email;
            // req.session.is_logged_in = true;
            // req.session.user=data[0];
            // const name=data[0].name;
            if(data[0].isvalid===1)
            {
              //  console.log(data[0]);
              const backpass=data[0].password;
              const a=await bcrypt.compare(password,backpass);
              // console.log(a);
              if(a){
                  // response.status(200);
                  // response.json({ token: token });
              

              const id=data[0].email;
                const token=jwt.sign({id},"jwtSecret");
            
                  res.send(JSON.stringify({"auth":true,"token":token,"status":201}));
                  return;
               }
               else{
                res.send(JSON.stringify({"auth":true,"status":202}));
                return;
               }
              }
               else if(data[0].isvalid==0)
               {
                // res.send(203).end();
                // res.sendStatus(203).end();
                res.send(JSON.stringify({"auth":true,"status":203}));
                  return;
                return;
               }
          }
               else{
                //  res.redirect("/product");
                res.send(JSON.stringify({"auth":true,"status":202}));
                // res.status(403).end();
                 return;
 
             }
           

            
          })
          
        }
    