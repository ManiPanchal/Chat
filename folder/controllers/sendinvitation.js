const { find_mailtoken } = require("./dbauser")
const {insert_invite}=require("./dbauser");
const sendMail=require("../methods/sendmail");
module.exports=(req,res)=>{
    let data2=find_mailtoken(req.body.email)
    .then(function(data2)
    {
        let data=insert_invite(req.body.id,data2[0].mailtoken,req.userId)
        .then(function(data)
        {
        //   console.log(data);     
        if(data==1)
        {
            sendMail(req.body.email,data2[0].mailtoken,`To Accept Group invitation <a href='http://127.0.0.1:8000/invitation/${data2[0].mailtoken}/${req.body.id}'>clickhere...</a>`,function(err,data)
                    {
                        if(err)
                        {
                            res.render("signup",{data:"something went wrong"});
                            return;
                        }
                        // req.session.is_logged_in=true;
                        // let data2=createuser(user)
                        //  data2.then(function()
                        // {
                        //     res.send(200).end();
                        //     return;
                        // })
                        // .catch(function(err)
                        // {
                        //     res.render("signup",{data:"something went wrong"});
                        // })
                        res.send(200).end();
                        return;
                    })
        }
    })
    })
    
    }
