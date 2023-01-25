import React from "react";

export default function Message() {
  return (
    <div className="message">
      <div className="messageTop">
        <img
          src="./../../../public/assets/person/1.jpeg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">Hello this is a message</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
