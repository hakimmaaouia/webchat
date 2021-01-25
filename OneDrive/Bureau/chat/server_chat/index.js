const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { join } = require("path");
const router = require("./router");
const { adduser, deleteuser, getUsersInRoom } = require("./users/users");
const {time}= require("./time");
const cors = require('cors')
app.use(router);
app.use(cors());
io.on("connection", (socket) => {
  console.log("connection")
  socket.on("join", ({ Name, Room }) => {
    const add = adduser(Name, Room);
    socket.join(Room);
    io.to(Room).emit("messages", {
      Name: "admin",
      message: `${Name} join the room `,
      dates:time()
    });
  });
  socket.on("sendmessage", ({ message, Room, Name }) => {
    io.to(Room).emit("messages", { Name, message,dates:time()});
    
  });



socket.on("typing",({typing,Name,Room})=>{
  socket.to(Room).emit("ntyping",{Name,typing})
})


  socket.on("disconnect", () => {
    console.log("left!!!!");
  });
});

http.listen(process.env.PORT || 5000, function () {
  console.log("listening on port 5000");
});
