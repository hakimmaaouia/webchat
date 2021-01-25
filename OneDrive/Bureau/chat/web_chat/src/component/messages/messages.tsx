import React, { useState, useEffect, useRef } from "react";
import Message from "./message";
import "./message.css";
const Messages = ({ socket, Name }: any) => {
  const [messages, setmessages] = useState<any[]>([]);
  useEffect(() => {
    socket?.on("messages", (message: any) => {
      setmessages((messages) => [...messages, message]);
      if (messageEl.current) {
        let scroll =
          messageEl.current.scrollHeight - messageEl.current.clientHeight;
        messageEl.current.scrollTo(0, scroll);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("ntyping", ({ Name,typing }: any) => {
      console.log(typing);
    });
  }, []);
  const messageEl = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="chatbox" ref={messageEl}>
        {messages.map((message: any, i: any) => (
          <Message key={i} message={message} Name={Name} />
        ))}
      </div>
      <div>is typing</div>
    </div>
  );
};
export default Messages;
