const dbauser=require("./dbauser");
const find_details=dbauser.find_details;
module.exports=(req,res)=>{
    // console.log(req.body.id);
    let details=find_details(req.body.id,req.userId)
    .then(function(data)
    {
        if(data.length>0)
        {
            // console.log(data);
            res.send(JSON.stringify(data));
            return;
        }
    })
}