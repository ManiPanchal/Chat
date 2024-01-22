const dbauser=require("./dbauser");

module.exports=(req,res)=>{
    let data=dbauser.find(req.userId)
    .then(function(data)
    {
        if(data)
        {
            res.send(JSON.stringify(data));
            return;
        }
    })
}