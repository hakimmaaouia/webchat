import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Picker from "emoji-picker-react";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";

import "./input.css";
const Input = ({ socket, Room, Name }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [message, setmessage] = useState("");
  const sendmessage = (event: any) => {
    if (message.trim().length > 1) {
      socket?.emit("sendmessage", { message, Room, Name });
    }
    setmessage("");
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setmessage(message + emojiObject.emoji);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let timeout: any;
  timeout = 2000;
  const [typing, settyping] = useState(false);

  const keyup = () => {
    settyping(true);
    socket.emit("typing", { typing, Name, Room });
    clearTimeout(timeout);
    timeout = setTimeout(is_typing, 2000);
  };
  const is_typing = () => {
    settyping(false);
    socket.emit("typing", { typing, Name, Room });
  };

  return (
    <div className="send">
      <InputBase
        placeholder="Message"
        inputProps={{ "aria-label": "Message" }}
        onChange={(event) => setmessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendmessage(event);
          }
        }}
        value={message}
        onKeyUp={() => keyup()}
        className="inputmessage"
      />
      <span className="hidden">
        <IconButton
          aria-label="emoji"
          aria-describedby={id}
          onClick={handleClick}
        >
          <SmileOutlined />
        </IconButton>
      </span>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={(e) => sendmessage(e)}
        endIcon={<SendOutlined />}
        style={{ color: "#f3ffb6", background: "#12496d" }}
      >
        Send
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>
    </div>
  );
};
export default Input;
