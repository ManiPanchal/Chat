let p=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,15}$/;
        let p2=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let region=document.getElementById("region");
        let fname=document.getElementById("name");
        let email=document.getElementById("email_i");
        let password=document.getElementById("pass");
        let submit=document.getElementById("submit_signup")
        submit.addEventListener("click",()=>{
            if(fname.value.trim()==""&&email.value.trim()==""&&password.value.trim()==""&&region.value.trim()=="")
            {
                swal({
                    title:"Please fill out all the fields",
                    icon:"warning"});
            }
            else if(!pass.value.trim().match(p))
            {
               swal({title:"please choose a strong password",
               icon:"warning"});
            }
            else if(!email.value.trim().match(p2))
            {
                swal({title:"please enter a valid email",
                 icon:"warning"});
            }
            else 
            {
                const request=new XMLHttpRequest();
                request.open("POST","/signup");
                request.setRequestHeader("content-type","application/json");
                request.send(JSON.stringify({name:fname.value.trim(),email:email.value.trim(),password:password.value.trim(),regino:region.value.trim()}));
                request.addEventListener("load",()=>
                {
                    if(request.status==201)
                    {
                       document.getElementById("e").style.display="block"; 
                       document.getElementById("c").style.display="none";
                    }
                    if(request.status==200)
                    {
                        document.getElementById("c").style.display="block";
                        document.getElementById("e").style.display="none";
                    }
                })
            }
        })
        
