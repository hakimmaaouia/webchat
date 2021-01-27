const users = [];
const adduser=(name,room,id)=>{
name= name;
room= room;
const user={name,room,id}
users.push(user)
console.log(users);
return(user);
}

const deleteuser=(id)=>{
const index = users.findIndex((user)=>user.id===id);
room=users[index]
users.splice(index,1)
console.log(users);
if (users.length<=0){
    room="last"
}
return(room);
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports={adduser,deleteuser,getUsersInRoom};