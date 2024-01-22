
const dbauser=require("./dbauser");
const find_group=dbauser.find_g;
module.exports=(req,res)=>
{
    let g=find_group(req.userId)
    g.then(function(g)
    {
        if(g)
        { 
            // const arr=[];
            // for(let i=0;i<g.length;i++)
            // {
            //    arr.push(g[i]);
            // }
            // console.log(arr);
            res.send(JSON.stringify(g));
            return;
        }
    })   
}