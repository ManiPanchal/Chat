const { json } = require("express");
const dbauser=require("./dbauser");

module.exports=async (obj,userId)=>{
    let data=await dbauser.find_mailtoken(userId)  
        if(data)
        {
            let check=await dbauser.check(data[0].mailtoken,obj.g_id)
            if(check.length>0)
            {
            let current_date = new Date().toISOString().split('T')[0];
            let time = new Date().toLocaleTimeString();
                let data2=await dbauser.insert_m(data[0].mailtoken,obj.g_id,obj.message,current_date,time)
                if(data2.length>0)
                {
                    return data2 ;
                }    
    }
        else{
            let check=await dbauser.findtoken(obj.g_id);
            if(check.length>0){
                let current_date = new Date().toISOString().split('T')[0];
                let time = new Date().toLocaleTimeString();
                  let data2=await dbauser.insert_m2(data[0].mailtoken,obj.g_id,obj.message,current_date,time);
                  if(data2.length>0){
                    console.log('iiii');
                    var originalData2 = data2;
                    data2 = [originalData2];
                    console.log(data2);
                    data2.push({flag:300});
                    console.log(data2.length)
                    console.log(data2);
                    return data2;
                  }
            }
            else{
            return 201;
            }
        }
    }
}