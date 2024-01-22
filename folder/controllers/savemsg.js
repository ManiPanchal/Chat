const dbauser=require("./dbauser");

module.exports=(req,res)=>{
    let data=dbauser.find_mailtoken(req.userId)
    .then(function(data)
    {
        if(data)
        {
            let current_date = new Date().toISOString().split('T')[0];
            let time = new Date().toLocaleTimeString();
            let data2=dbauser.insert_m(data[0].mailtoken,req.body.g_id,req.body.message,current_date,time)
            .then(function(data2)
            {
                if(data2.length>0)
                {
                    // console.log(data2);
                    res.send(JSON.stringify(data2));
                    return;
                }
            })
        }
    })
}