const { json } = require("express");
const dbauser=require("./dbauser");
const creategroup=dbauser.creategroup;

module.exports=(req,res)=>{
    let currentDate = new Date().toISOString().split('T')[0];
    let time = new Date().toLocaleTimeString();
    let mailt=dbauser.find_mailtoken(req.userId)
    .then(function(mailt)
    {
    let g=creategroup(Date.now(),req.body.g_name,currentDate,req.userId,time)
    g.then(function(g)
    {
        if(g.length>0)
        {
            // console.log(g);
            let h=dbauser.insert_g(g[0].group_id,mailt[0].mailtoken,"A")
            .then(function(data)
            {
                if(data)
                {

                    res.send(JSON.stringify(g));
                    return;
                }
            })
            // res.send(200).end();
            return;
        }
        else{
            res.send(201).end();
            return;
        }
    })
})
}