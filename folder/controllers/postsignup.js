const sendMail=require("../methods/sendmail");
const usermodel=require("./dbauser.js");
const finduser=usermodel.finduser;
const createuser=usermodel.createuser;
const finduser_2=usermodel.finduser_2;
const bcrypt=require("bcrypt");
const saltRounds=10;
module.exports=(req, res) => {
    let user=finduser(req.body.email)
    user.then(function(user)
    {
        // console.log(user)
          if(user==1)
          {
            res.send(201).end();
            return;
          }
          else if(user==2){
            let u=finduser_2(req.body.name)
            u.then(async function(u)
            {
                if(u==1)
                {
                    res.send(202).end();
                }
                else if(u==2){
                    const salt=await bcrypt.genSalt(saltRounds);
                    const hash=await bcrypt.hash(req.body.password,salt);
                    let user={name:req.body.name,email:req.body.email,password:hash,isvalid:0,mailToken:Date.now(),region:req.body.region};
                    // req.session.email=req.body.email;
                    // req.session.mailToken=user.mailToken;
                    // req.session.user=user;
                    sendMail(req.body.email,user.mailToken,`<h1>Welcome</h1><a href='http://127.0.0.1:8000/verifymail/${user.mailToken}'>clickhere...</a>`,function(err,data)
                    {
                        if(err)
                        {
                            res.render("signup",{data:"something went wrong"});
                            return;
                        }
                        // req.session.is_logged_in=true;
                        let data2=createuser(user)
                         data2.then(function()
                        {
                            res.send(200).end();
                            return;
                        })
                        .catch(function(err)
                        {
                            res.render("signup",{data:"something went wrong"});
                        })
                        return;
                    })
                }
            })
          }
          
            
    })
            
}
           
    