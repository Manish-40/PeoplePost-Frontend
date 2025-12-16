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

  // --------------- 1. Fetch old messages ---------------
  useEffect(() => {
    const fetchChatMessages = async () => {
      // Don't fetch if we don't have the ID yet
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

  // --------------- 2. Socket connection Logic ---------------
  useEffect(() => {
    // CRITICAL: Wait for userId (Redux state) to be available after refresh
    if (!userId || !targetUserId) return;

    // Initialize connection
    socketRef.current = createSocketConnection();

    // Join the specific chat room
    socketRef.current.emit("joinChat", { userId, targetUserId });

    // Listen for incoming messages
    socketRef.current.on("messageReceived", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount or when IDs change
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId, targetUserId]); // Re-runs when Redux finishes loading userId

  // --------------- 3. Send message ---------------
  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
      firstname:user.firstname,
      lastname:user.lastname
    });

    setNewMessage("");
  };

  // --------------- 4. Auto scroll ---------------
  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Loading state if user data isn't in Redux yet
  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading chat session...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-screen sm:h-[80vh] flex flex-col bg-gray-200 rounded-xl shadow-lg border">
        {/* Header */}
        <div className="p-5 border-b bg-white rounded-t-xl">
          <h1 className="text-2xl font-semibold text-gray-800">Chat</h1>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                  msg.senderId === userId
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-black border rounded-bl-none"
                }`}
              >
                <div className={`text-xs mb-1 opacity-75 font-bold ${
                   msg.senderId === userId ? "text-blue-100" : "text-gray-500"
                }`}>
                  {msg.firstname} {msg.lastname}
                </div>
                <div className="break-words">{msg.text}</div>
              </div>
            </div>
          ))}
          <div ref={autoScrollRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t bg-white rounded-b-xl flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;