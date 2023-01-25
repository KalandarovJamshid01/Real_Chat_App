import "./messenger.css";
import Topbar from "./../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations.jsx";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="search friends"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <Conversations conversation={c} currentUser={user} />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ? (
              <>
                <div className="chatBoxTop">
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                  <Message own={true} />
                  <Message />
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                  ></textarea>
                  <button className="chatSubmitButton">Send</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
