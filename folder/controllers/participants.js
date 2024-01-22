const dbauser=require("./dbauser");
module.exports=(req,res)=>{
    let data=dbauser.find_p(req.body.id)
    .then(function(data){
        if(data)
        {
            // console.log(data);
            res.send(JSON.stringify(data));
            return;

        }
    })
}