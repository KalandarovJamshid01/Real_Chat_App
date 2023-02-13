import "./test.css";
import Topbar from "../../components/topbar/Topbar.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";
export default function Test() {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [notifyNumberSocket, setNotifyNumberSocket] = useState(false);

  const socket = useRef(io("ws://localhost:8900"));
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    console.log(socket);
    socket.current.on("getNotify", (data) => {
      console.log(data);
      setNotifyNumberSocket(true);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  console.log(notifyNumberSocket);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notify = {
      userId: "63d16a254d7d234e80d0f1d5",
      documentId: "1234567890",
      text: newMessage,
    };
    const res = await axios.post("/notifies", notify);

    socket.current.emit("sendNotify", {
      receiverId: "63d16a254d7d234e80d0f1d5",
      text: newMessage,
    });
    console.log(res);
  };
  return (
    <>
      <Topbar notifyNumberSocket={notifyNumberSocket} />
      <div className="test">
        <div className="testWrapper">
          <input
            className="testInput"
            type="text"
            placeholder="Write something"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="testSend" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
      ;
    </>
  );
}
