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
  return (
    <>
      <Topbar />
      <div className="test">
        <div className="testWrapper">
          <input
            className="testInput"
            type="text"
            placeholder="Write something"
          />
          <button className="testSend">Send</button>
        </div>
      </div>
      ;
    </>
  );
}
