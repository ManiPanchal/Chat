const savemsg = require("./controllers/savemsg");
const jwt = require("jsonwebtoken");
module.exports = (io)=>{
    io.on('connection',(socket)=>{
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
    
    })
}
let users = [];

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