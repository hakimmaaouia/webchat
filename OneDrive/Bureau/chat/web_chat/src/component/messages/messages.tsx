import React, { useState, useEffect ,useRef } from "react";
import Message from "./message";
import "./message.css";
const Messages = ({ socket, Name }: any) => {
  
  const [messages, setmessages] = useState<any[]>([]);
  useEffect(() => {
    socket?.on("messages", (message: any) => {
      setmessages((messages) => [...messages, message]);
      if(messageEl.current){
     let scroll=messageEl.current.scrollHeight-messageEl.current.clientHeight
     messageEl.current.scrollTo(0, scroll);
        
      }
  
    });
  }, []);
  const messageEl = useRef<HTMLInputElement>(null);
  
 



  return (
    <div className="chatbox" ref={messageEl} >
      {messages.map((message: any, i: any) => (
        <Message key={i} message={message} Name={Name}  />
      ))}
    
    </div>
  );
};
export default Messages;
