const users = [];
const adduser=(name,room)=>{
name= name;
room= room;
const user={name,room}
users.push(user)
console.log(users);
return(user);
}

const deleteuser=({name,room})=>{
const index = users.findIndex((user)=>user.name=name);
users.splice(index,1)
return(users);
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports={adduser,deleteuser,getUsersInRoom};