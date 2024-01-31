const { json } = require("express");
const dbauser=require("./dbauser");

module.exports=async (obj,userId)=>{
    let data=await dbauser.find_mailtoken(userId)
    // .then(async function(data)
    // {   
        
        if(data)
        {
            let check=await dbauser.check(data[0].mailtoken,obj.g_id)
        // .then(async function(check)
        // {
            //  console.log(check);
            if(check.length>0)
            {
                
        //    console.log(check);
            let current_date = new Date().toISOString().split('T')[0];
            let time = new Date().toLocaleTimeString();
            let data2=await dbauser.insert_m(data[0].mailtoken,obj.g_id,obj.message,current_date,time)
            // .then(function(data2)
            // {
                if(data2.length>0)
                {
                    // console.log(data2);
                    // res.send(JSON.stringify(data2));
                    // resolve(data2);
                    return data2 ;
                }
            // })
        // }})
    }
        else{
            // res.status(201).end();
            // res.send(JSON.stringify(201));
            return 201;
        }
    }
}
        
   
