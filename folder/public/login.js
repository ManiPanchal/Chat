let ptrn=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let email=document.getElementById("email_i");
        // let uname=document.getElementById("name");
        let pass=document.getElementById("pass");
        // let region=document.getElementById("region");
        let btn=document.getElementById("data_submit");
        btn.addEventListener("click",function()
        {
            if(email.value.trim()==""&&pass.value.trim()=="")
            {
                swal({
                    title:"Fillout all the fields",
                   icon:"warning"});
            }
            else if(!email.value.trim().match(ptrn))
            {
                swal({titel:"enter valid email",
                icon:"warning"});
            }
            else{
                const request=new XMLHttpRequest();
                request.open("POST","/login");
                request.setRequestHeader("content-type","application/json");
                request.send(JSON.stringify({email:email.value.trim(),password:password.value.trim()}));
                request.addEventListener("load",()=>
                {
                    console.log(request.status);
                    if(request.status==201)
                    {
                       document.getElementById("e").style.display="block"; 
                    //    document.getElementById("c").style.display="none";
                    }
                    // if(request.status==200)
                    // {
                    //     document.getElementById("c").style.display="block";
                    //     document.getElementById("e").style.display="none";
                    // }
                }) 
            }
        })