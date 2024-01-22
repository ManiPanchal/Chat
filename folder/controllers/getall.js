const dbauser=require("./dbauser");
const find_all=dbauser.find_all;
module.exports=(req,res)=>{
    find_all(req.userId)
    .then(function(data){
        if(data)
        {
            
            res.send(JSON.stringify(data));
            return;
        }
    })
}