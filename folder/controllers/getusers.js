const dbauser=require("./dbauser");

module.exports=(req,res)=>{
    // console.log(req.userId);
    let data=dbauser.getalluser(req.userId)
    .then(function(data)
    {
        if(data)
        {
            res.send(JSON.stringify(data));
            return;
        }
    })
}