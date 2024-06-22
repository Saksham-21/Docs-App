// import React from "react";
import React, { useState, useRef } from "react";
// import "../../src/App.css";
import styles from "./Chatarea.module.css";
function Chatarea() {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);

  const sendMessage = () => {
    const message = messageInputRef.current.value.trim();
    if (message) {
      setMessages([...messages, message]);
      messageInputRef.current.value = ""; // Clear input after sending
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  console.log(styles);
  return (
    <div className="w-[100%] h-[91vh]  z-[4] bg-slate-500  backdrop-blur-sm flex justify-center items-center">
      <div className="text-white px-5 py-6 w-[90%] h-[84%]  rounded-[40px] bg-zinc-900/40 flex-shrink-0">
        <div className="bg-yellow-500 relative w-full h-full">
          <div className={`${styles["custom-scroll"]} absolute top-0 h-[92%] w-full mb-1 mt-0 flex-grow overflow-y-scroll  bg-amber-700`}>
            {messages.map((message, index) => (
              <p key={index} className="text-lg leading-tight font-semibold">
                {message}
              </p>
            ))}
          </div>
          <div className="absolute bottom-0 w-full left-0 mt-3 flex items-center bg-green-600">
            <input
              type="text"
              className="chat-input-field w-full px-3 py-2 text-black rounded-md focus:outline-none"
              placeholder="Type your message..."
              ref={messageInputRef}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chat-send-button ml-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatarea;
