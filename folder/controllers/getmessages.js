const dbauser=require("./dbauser");
const find_msg=dbauser.find_m;
module.exports=(req,res)=>{
    // console.log(req.body);
    let data=find_msg(req.body.id,req.body.start,req.body.count)
    .then(function(data)
    {
        if(data)
        {
            // console.log(data);
            res.send(JSON.stringify(data));
            return;
        }
    })
}