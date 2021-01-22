import React, { useState} from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({ socket, Room, Name }: any) => {
    
  const [message, setmessage] = useState("");
  const sendmessage = (event: any) => {
    if (event.key === "Enter") {
      socket?.emit("sendmessage", { message, Room, Name });
    }
    
  };
  return (
    <div>
      <TextField
        id="outlined-secondary"
        onChange={(event) => setmessage(event.target.value)}
        onKeyDown={(event) => {
          sendmessage(event);
        }}
      />
    </div>
  );
};
export default Input;
