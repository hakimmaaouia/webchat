import React, { useState, useEffect } from "react";
const Message = ({ message: { Name, message } }: any) => {
  console.log(Name, message);
  return (
    <div>
      <h3>{Name}</h3>
      {message}
    </div>
  );
};
export default Message;
