// Chatbot.js
import React, { useState } from "react";
import { chatbot } from "../../../Services/userApi";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    // Add the user message to the conversation
    setConversation([...conversation, { author: "user", message }]);

    await chatbot(message).then((response) => {
      setConversation([
        ...conversation,
        { author: "chatbot", message: response.data.message },
      ]);
    });

    // Clear the input field
    setMessage("");
  };

  return (
    <div>
      <div className="conversation">
        {conversation.map((entry, index) => (
          <div key={index} className={entry.author}>
            <span>{entry.message}</span>
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
