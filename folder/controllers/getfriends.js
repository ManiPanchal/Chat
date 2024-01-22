const dbauser=require("./dbauser");
const find_f=dbauser.find_f;
module.exports=(req,res)=>{
    // console.log(req.body.g_id);
    const data=find_f(req.body.g_id)
    .then(function(data)
    {
        // console.log(data);
        res.send(JSON.stringify(data));
        return;
    })
    
}