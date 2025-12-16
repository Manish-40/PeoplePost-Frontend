import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseurl } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef(null);
  const autoScrollRef = useRef(null);

  // --------------- Fetch old messages ---------------
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!targetUserId) return;
      try {
        const res = await axios.get(`${baseurl}/chat/${targetUserId}`, {
          withCredentials: true,
        });

        const chatMessages = res.data.messages.map((msg) => ({
          senderId: msg.senderId?._id,
          firstname: msg.senderId?.firstname,
          lastname: msg.senderId?.lastname,
          text: msg.text,
        }));

        setMessages(chatMessages);
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      }
    };
    fetchChatMessages();
  }, [targetUserId]);

  // --------------- Socket connection ---------------
  useEffect(() => {
  socketRef.current = createSocketConnection();

  socketRef.current.emit("joinChat", { userId, targetUserId });

  socketRef.current.on("messageReceived", (msg) => {
    setMessages(prev => [...prev, msg]);
  });

  return () => {
    socketRef.current.disconnect();
  };
}, [userId, targetUserId]);

  // --------------- Send message ---------------
  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  // --------------- Auto scroll ---------------
  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-screen sm:h-[80vh] flex flex-col bg-gray-200 rounded-xl shadow-lg border">
        {/* Header */}
        <div className="p-5 border-b">
          <h1 className="text-2xl font-semibold">Chat</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg ${
                  msg.senderId === userId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-400 text-black"
                }`}
              >
                <div className="text-sm font-semibold">
                  {msg.firstname} {msg.lastname}
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
          <div ref={autoScrollRef} />
        </div>

        {/* Input */}
        <div className="p-5 border-t flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
