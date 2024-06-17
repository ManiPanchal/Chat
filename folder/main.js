const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
// const dba=require("./sql/db");
server.listen(8000, () => {
    console.log("server started");
});
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        method:["GET","POST"],
    },});
// require("./socket")(io)
let users=[];
const adduser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}
const removeUser = (socketId) => {
    users = users.filter(user => { user.socketId !== socketId });
}
const getuser = (userid) => {
    return users.find(users => users.userId === userid);
}
io.on("connection", (socket) => {
    // let i=0
    // console.log("new-message "+i+1, socket.id);
    socket.on("join_group", (id) => {
        console.log("id", id);
        socket.join(id);
    })
    socket.on("userId", userId => {
        adduser(userId, socket.id);
        io.emit("getusers", users);
    })
    socket.on("disconnect", () => {
        removeUser(socket.id);
    })
    socket.on('sendMessage', async (ob) => {
        const user = getuser(ob.receiverId);
        console.log("user", user);
        console.log("id", ob)
        let userId = jwt.verify(ob.senderId, "jwtSecret", (err, decoded) => {
            if (err) {
                return;
            }
            else {
                return decoded.id;
            }
        });
        console.log(userId);
        //  savemsg(obj)
        const obj = { g_id: ob.receiverId, message: ob.message }
        let data = await savemsg(obj, userId);
        // console.log(data);
        console.log('inside')
        if (data == 200) {
            return;
        }
        else {
            if (data[1].flag === 300) {
                console.log('sooooo')
                data.pop();
                console.log(data)
                console.log('sid', user.socketId);
                io.to(user.socketId).emit("getmessage", { userId, data })
                //  socket.emit('message',data)
            }
        }
    })
    socket.on("new-message", async (obj) => {
        console.log(obj);
        let token = obj.token;
        let userId = jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                return;
            }
            else {
                return decoded.id;
            }
        });
        console.log(userId);
        //  savemsg(obj)
        let data = await savemsg(obj, userId);
        // console.log(data);
        console.log('inside')
        if (data == 200) {
            return;
        }
        else {
            if (data[1].flag === 300) {

                console.log('sooooo')
                // console.log(data);
                // io.emit("server-message",data)
                // socket.to(obj.g_id).emit("server-message",data);
                // io.emit("server-message",data);
                data.pop();
                socket.emit('message', data)
            }
            else {
                socket.to(obj.g_id).emit("server-message", data);
            }
        }

        // if(data==200)
        // {
        //     return;
        // }
        // else{
        //     console.log(data);
        //     io.emit("server-message",data);
        // }
    });
})

const postsignup = require("./controllers/postsignup");
// const getsignup = require("./controllers/getsignup");
// const getlogin = require("./controllers/getlogin");
const postlogin = require("./controllers/postlogin");
const getverifymail = require("./controllers/verifytoken");
const postforgot = require("./controllers/postforgot");
const postchange = require("./controllers/postchange");
const forgot_token = require("./controllers/forgot_token");
const getgroups = require("./controllers/getgroups");
const creategroup = require("./controllers/creategroup");
const getfriends = require("./controllers/getfriends");
const getdetails = require("./controllers/getdetails");
const invite = require("./controllers/invite");
const sendinvitation = require("./controllers/sendinvitation");
const getall = require("./controllers/getall");
const getmessages = require("./controllers/getmessages");
const savemsg = require("./controllers/savemsg");
const getname = require("./controllers/getname");
const search = require("./controllers/search");
const topgroups = require("./controllers/topgroups");
const topusers = require("./controllers/topusers");
const topregion = require("./controllers/topregion");
const participants = require("./controllers/participants");
const getusers = require("./controllers/getusers");
const getuserdetails = require("./controllers/getuserdetails");
const getchatmessages = require("./controllers/getchatmessages");
// const gethome = require("./controllers/gethome");
// const =require("./controllers/invite");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.use(express.static(__dirname+"/public"));
// app.listen(8000,()=>{
//     console.log("server running at 8000");
// })
const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    // console.log(token);
    if (!token) {
        res.send("we need token");
    }
    else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            // console.log(token);
            if (err) {
                // res.json({auth:false,message:"failed"});
                return res.status(401).json({ auth: false, message: 'Invalid token' });
            }
            else {
                req.userId = decoded.id;
                next();
            }

        })
    }
}

app.post("/signup", postsignup);
// app.get("/signup",getsignup);
// app.get("/login",getlogin);
app.post("/login", postlogin);
// app.get("/home",gethome);
app.get("/verifymail/:token", getverifymail);
app.post("/forgot", postforgot);
app.post("/change_password", verifyJWT, postchange);
app.get("/forgot/:token", forgot_token);
app.post("/getgroups", verifyJWT, getgroups);
app.post("/creategroup", verifyJWT, creategroup);
app.post("/getfriends", verifyJWT, getfriends);
app.post("/getdetails", verifyJWT, getdetails);
// app.post("/invite",verifyJWT,invite);
app.post("/sendinvitation", verifyJWT, sendinvitation);
app.get("/invitation/:token/:id", invite);
app.post("/getall", verifyJWT, getall);
app.post("/getmessages", verifyJWT, getmessages);
app.post("/savemsg", verifyJWT, savemsg);
app.post("/getname", verifyJWT, getname);
app.post("/search", verifyJWT, search);
app.post("/topgroup", topgroups);
app.post("/topuser", topusers);
app.post("/topregion", topregion);
app.post("/getparticipants", participants);
app.post("/getalluser", verifyJWT, getusers);
app.post("/getuserdetails", getuserdetails);
app.post("/getchatmessages", verifyJWT, getchatmessages)