const dbauser=require("./dbauser");
// const find_msg=dbauser.find_m;
module.exports=(req,res)=>{
    // console.log(req.body);
    let mailToken=dbauser.find(req.userId)
    .then(function(mt){
        if(mt.length>0){
            // console.log(mt)
            let data=dbauser.find_msg(req.body.id,req.body.start,req.body.count,mt[0].mailtoken)
            .then(function(data)
            {
                if(data)
                {
                    // console.log(data);
                    res.send(JSON.stringify(data));
                    return;
                }
            })
            .catch(function(e){
                console.log("errr")
            })
        }
    })
    .catch(function(e){
        console.log(e)
    })
    
}