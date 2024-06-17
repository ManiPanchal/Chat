const dbauser=require("./dbauser");

module.exports=(req,res)=>{
    console.log(req.body.id);
    let data=dbauser.getuserdetails(req.body.id)
    .then(function(data)
    {
        if(data)
        {
            res.send(JSON.stringify(data));
            return;
        }
    })
}