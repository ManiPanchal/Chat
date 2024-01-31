const dbauser=require("./dbauser");
const find_msg=dbauser.find_msg;
module.exports=(req,res)=>{
    let data=find_msg(req.body.id,req.body.value)
    .then(function(data)
    {
        if(data)
        {
            res.send(JSON.stringify(data));
            return;
        }
    })
}