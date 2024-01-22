const dbauser=require("./dbauser");
const update=dbauser.update;
module.exports=(req,res)=>{
    // const {g_id}=req.params.id;
    // const {u_id}=req.params.token;
    const { id: g_id } = req.params;
    const { token: u_id } = req.params;

    let data=update(g_id,u_id)
    .then(function(data)
    {
        if(data==1)
        {
            res.redirect("http://localhost:5173/login");
            return;
        }
        else{
            res.redirect("http://localhost:5173/login");
            return;
        }
    })
}