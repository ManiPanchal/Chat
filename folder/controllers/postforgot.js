const sendMail=require("../methods/sendmail");
const dbauser=require("./dbauser");
const jwt=require("jsonwebtoken");
const find_email=dbauser.find;
module.exports=(req,res)=>{
    // console.log(req.body.value);
    let user=find_email(req.body.id)
    user.then(function(user2)
    {
        // console.log(user2);
        // console.log(data);
        if(user2.length>0)
        {
            let data=user2[0].mailtoken;
            sendMail(user2[0].email,user2[0].mailtoken,`<h1>Welcome </h1><h2>Click the link to reset your password</h2><a href="http://localhost:5173/forgot/${data}">clickhere...</a>`,function(err,data)
                {
                    if(err)
                    {
                        res.render("forgot",{data:"something went wrong"});
                        return;
                    }
                    // req.session.is_logged_in=true;
                    // console.log("ys");
                    const id=user2[0].email;
                    const token=jwt.sign({id},"jwtSecret");
                    res.send(JSON.stringify({"auth":true,"token":token,"status":201}));
                    //  res.status(201).end();
                     return;
                })
        }
        else{
            res.status(203).end();
            return;
        }           
    }) 
}