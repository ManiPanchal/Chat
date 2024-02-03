const dbauser=require("./dbauser");

module.exports=(req,res)=>{
    // console.log(req.body);
    let currentDate = new Date().toISOString().split('T')[0];
    const currentDate2 = new Date(); 
    currentDate2.setDate(currentDate2.getDate() - req.body.v);
    let current2=currentDate2.toISOString().split('T')[0];
    // console.log(current2,currentDate);
    let data=dbauser.find_top_group(currentDate,current2)
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