import React, { useState, useRef } from "react";
import styles from "./Chatarea.module.css";
import axios from "axios";

function Chatarea() {
  // const [messages, setMessages] = useState([]);
  // const [reply, setReply] = useState([]);
  // const messageInputRef = useRef(null);

  const [conversation, setConversation] = useState([]);
  const messageInputRef = useRef(null);

  // const sendMessage = async () => {
  //   const message = messageInputRef.current.value.trim();
  //   if (message) {
  //     setMessages([...messages, message]);
  //     console.log(message);
  //     messageInputRef.current.value = "";
  //     try {
  //       // Send the message to the Flask API
  //       const response = await axios.post('http://localhost:5000/ask_question', {
  //         question: message
  //       });
  //       // Handle the API response
  //       if (response.data && response.data.reply) {
  //       // Append the API's reply to the messages list
  //         setReply(prevReply => [...prevReply, response.data.reply]);
  //       } else {
  //         console.error('Error in response:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error sending message:', error);
  //     }

  //   }
  // };

  const sendMessage = async () => {
    const question = messageInputRef.current.value.trim();
    if (question) {
      const newConversation = [...conversation, { question, answer: null }];
      setConversation(newConversation);
      console.log(question);
      messageInputRef.current.value = "";
      try {
        const response = await axios.post(
          "https://16.171.250.97:5000/ask_question",
          {
            question,
          }
        );
        if (response.data && response.data.reply) {
          const updatedConversation = newConversation.map((item, index) =>
            index === newConversation.length - 1
              ? { ...item, answer: response.data.reply }
              : item
          );
          setConversation(updatedConversation);
        } else {
          console.error("Error in response:", response.data);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
      
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  console.log(styles);
  return (
    <div className="w-[100%] h-[91vh]  z-[4]  backdrop-blur-sm flex justify-center items-center">
      <div className="text-white px-5 py-6 w-[90%] h-[84%]  rounded-[40px] bg-zinc-900/90  flex-shrink-0">
        <div className="relative w-full h-full">
          <div
            className={`${styles["custom-scroll"]} absolute top-0 h-[91%] w-full mb-1 mt-0  flex-grow overflow-y-scroll overflow-x-hidden`}
          >
            {/* {messages.map((message, index) => (
              <article className="flex gap-5 py-1">
                <span className="text-lg leading-tight font-semibold text-blue-600">Q</span>
                <p key={index} className="text-lg  leading-tight font-semibold text-blue-600 break-words whitespace-pre-wrap overflow-x-hidden">
                  {message}
                </p>
              </article>
            ))}
            {reply.map((message, index) => (
              <article className="flex gap-5 py-1">
                <span className="text-lg leading-tight font-semibold text-green-600">A</span>
                <p key={index} className="text-lg  leading-tight font-semibold text-green-600 break-words whitespace-pre-wrap overflow-x-hidden">
                  {message}
                </p>
              </article>
            ))} */}
            {conversation.map((item, index) => (
              <div key={index}>
                <article className="flex gap-5 py-1">
                  <span className="text-lg leading-tight font-semibold text-blue-600">
                    Q
                  </span>
                  <p className="text-lg leading-tight font-semibold text-blue-600 break-words whitespace-pre-wrap overflow-x-hidden">
                    {item.question}
                  </p>
                </article>
                {item.answer && (
                  <article className="flex gap-5 py-1">
                    <span className="text-lg leading-tight font-semibold text-green-600">
                      A
                    </span>
                    <p className="text-lg leading-tight font-semibold text-green-600 break-words whitespace-pre-wrap overflow-x-hidden">
                      {item.answer}
                    </p>
                  </article>
                )}
                <br />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 w-full left-0 mt-3 flex items-center">
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
