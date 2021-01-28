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
  },[socket]);
  const [typing, settyping] = useState<any>({ typing: false, Name: "" });
  useEffect(() => {
    socket.on("ntyping", ({ Name, typing }: any) => {
      settyping({ typing, Name });
    });
  }, [socket]);
  const messageEl = useRef<HTMLInputElement>(null);

  const typing_display = (Name: any) => {
    return (
      <>
        {Name}  is typing
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
      </>
    );
  };

  return (
    <div>
      <div className="chatbox" ref={messageEl}>
        {messages.map((message: any, i: any) => (
          <Message key={i} message={message} Name={Name} />
        ))}
      </div>

      <div className="typing_container">
        {typing.typing ? typing_display(typing.Name) : null}
      </div>
    </div>
  );
};
export default Messages;
