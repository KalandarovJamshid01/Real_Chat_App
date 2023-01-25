import "./conversations.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      const res = await axios("/users?userId=" + friendId);
      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src="../../../public/assets/person/noAvatar.png"
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user.username}</span>
    </div>
  );
}
