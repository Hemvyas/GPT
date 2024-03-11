import React, { useEffect, useRef, useState } from 'react'
import Sidemenu from "../sidebar/sidemenu";
import NearMeIcon from "@mui/icons-material/NearMe";
import "./chatbox.css"
import useUserStore from '../../store';
import axios from 'axios';
const Chatbot = () => {
    const [isOverflowing, setIsOverflowing] = useState(true);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();
    const ChatsRef = useRef(null);
    const user = useUserStore((state) => state.user);
    const senderId=user.userInfo._id;
    useEffect(() => {
      if (ChatsRef.current) {
        const overflowing =
          ChatsRef.current.scrollHeight > ChatsRef.current.clientHeight;
        setIsOverflowing(overflowing);
      }
    }, [message]);

    const handleClick=async(e)=>{
      e.preventDefault();
      if(newMessage.trim()==="")
      {
        alert("Enter a message");
        return;
      }
      const messages = {
        sender: senderId,
        text: newMessage,
      };
      try {
        const res = await axios.post(
          "http://localhost:5000/api/message",
          messages
        );
        console.log(res.data);
        setMessage([...message,res.data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
      <Sidemenu />
      <div className="chatbox">
        <div className="chat" ref={ChatsRef}>
          {message.map((msg, index) => (
            <div className="chat-message" key={index}>
              <div className="img"></div>
              <div className="message">{msg.text}</div>
            </div>
          ))}
          <div className="chat-message gpt">
            <div className="img"></div>
            <div className="message">
              test
            </div>
          </div>
        </div>
        <div className="inputbox">
          <textarea
            className="inputbox-textarea"
            rows="1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask Something"
          ></textarea>
          <button className="btn" onClick={handleClick}>
            <NearMeIcon
              style={{
                fontSize: 20,
                display: "flex",
                alignItems: "center",
              }}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chatbot