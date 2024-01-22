const dbauser=require("./dbauser");
const dbforgot_token=dbauser.findtoken;
const jwt=require("jsonwebtoken");
module.exports=(req,res)=>
{
    const {token} =req.params;
    let data=dbforgot_token(token);
    data.then((data)=>
    {
        // console.log(data);
        // req.session.user=data[0];
        // req.session.email=data[0].email;
        // req.session.user.isvalid=true;
        // req.session.is_logged_in=true;
        const id=data[0].email;
        const token=jwt.sign({id},"jwtSecret");
        // res.redirect("/changepassword");
        // res.status(201).end();
        res.status(200).end();
    },()=>
    {
        // console.log("err");
        // res.redirect("/forgot");
        res.status(201).end();
    })     
}
