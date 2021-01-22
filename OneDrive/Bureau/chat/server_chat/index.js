const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { join } = require("path");
const router = require("./router");
const {adduser,deleteuser,getUsersInRoom} = require("./users/users");
app.use(router);

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("join", ({ Name, Room }) => {
    const add = adduser(Name,Room)
    socket.join(Room);
    io.to(Room).emit('messages',{Name:"admin",message:`${Name} join the room `})
  });
  socket.on("sendmessage",({message,Room,Name})=>{
    io.to(Room).emit('messages',{Name,message})
  })
  socket.on("disconnect", () => {
    console.log("left!!!!");
  });
});

http.listen(5000, function () {
  console.log("listening on port 4000");
});
