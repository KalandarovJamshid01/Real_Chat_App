import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Topbar({ notifyNumberSocket }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const [notifyNumber, setNotifyNumber] = useState([]);
  useEffect(() => {
    const getNotifyNumber = async () => {
      const res = await axios.get("/notifies/" + user._id);
      setNotifyNumber(res.data);
    };
    getNotifyNumber();
  }, [user._id]);
  console.log(notifyNumberSocket);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge"></span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge"></span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">
              {notifyNumberSocket ? notifyNumber.length : notifyNumber.length++}
            </span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
