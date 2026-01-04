import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseurl } from '../utils/constants';
import { useRef } from 'react';

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector(store => store.user.data);
  const userId = user?._id;
  const autoScroll = useRef(null);

  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const [photourl, setPhotourl] = useState("");
  const [targetFirstname, setFirstname] = useState("");
  const [targetLastname, setLastname] = useState("");

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(baseurl + "/chat/" + targetUserId, { withCredentials: true });
      const chatMessages = chat?.data?.messages.map(msg => {
        const { senderId, text } = msg;
        const { createdAt } = msg;
        return { firstname: senderId?.firstname, lastname: senderId?.lastname, text, createdAt };
      });
      setMessages(chatMessages);
      setIsOnline(chat.data.targetUser.isOnline);
      setLastSeen(chat.data.targetUser.lastSeen);
      setPhotourl(chat.data.targetUser.photourl);
      setFirstname(chat.data.targetUser.firstname);
      setLastname(chat.data.targetUser.lastname);
      console.log(chat);
      console.log(chat?.data?.messages[0]?.createdAt);
      console.log(targetFirstname);



    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    autoScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  // useEffect(() => {
  //   const loadMessages=async()=>{
  //     const fetchedMessages=await fetchChatMessages();
  //     setMessages(fetchedMessages.messages);
  //   };
  //     loadMessages();
  //   },[targetUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", { firstname: user.firstname, userId, targetUserId });
    socket.emit("registerUser", userId)
    socket.on("messageReceived", ({ firstname, lastname, text, createdAt }) => {
      setMessages(messages => [...messages, { firstname, lastname, text, createdAt }]);
    });

    socket.on("userStatus", ({ userId, isOnline, lastSeen }) => {
      if (userId == targetUserId) {
        setIsOnline(isOnline);
        if (lastSeen) setLastSeen(lastSeen);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstname]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstname: user.firstname, lastname: user.lastname, userId, targetUserId, text: newMessage });
    setNewMessage("");
  };
  console.log("lastseen", lastSeen);
  if (lastSeen) {
    console.log("date", new Date(lastSeen).toLocaleString());
  }
  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Unavailable";

    const date = new Date(lastSeen);
    if (isNaN(date.getTime())) return "Unavailable";

    return date.toLocaleString();
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-4 sm:p-0'>
      {/* Main chat container. This is responsive based on screen size. */}
      {/* w-full on mobile, then w-3/4, w-2/3, and w-1/2 for larger screens */}
      <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-screen sm:h-[80vh] flex flex-col border border-gray-400 rounded-xl shadow-lg bg-gray-200'>
        {/* Chat header */}
        <div className='p-5 border-b border-gray-400 flex items-center gap-3'>
          {/* Avatar */}
          {photourl && photourl !== "http://peoplepost-default.png" ? (
            <img
              src={photourl}
              alt={targetFirstname || "User"}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 text-4xl text-gray-800">
              {(targetFirstname?.charAt(0).toUpperCase() || "") +
                (targetLastname?.charAt(0).toUpperCase() || "")}
            </div>
          )}

          {/* Name and status */}
          <div className="flex flex-col">
            <h1 className='text-2xl font-semibold'>{targetFirstname} {targetLastname}</h1>
            <span className="text-sm text-gray-600">
              {isOnline ? "🟢 Online" : `Last seen: ${formatLastSeen(lastSeen)}`}
            </span>
          </div>
        </div>





        {/* Chat messages display area with a flexible height and scroll */}
        <div className='flex-1 overflow-y-auto p-5 space-y-4'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${user.firstname === msg.firstname ? 'justify-end' : 'justify-start'}`}
            >

              <div className={`p-3 rounded-lg max-w-[80%] break-words ${user.firstname === msg.firstname ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-400 text-black rounded-bl-none'}`}>
                <div className="text-xs text-gray-200 mb-1">{msg.createdAt}</div> {/* ✅ formatted time */}
                <div className="font-semibold text-sm">{msg.firstname}</div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
          {/* Invisible element to scroll to */}
          <div ref={autoScroll} />
        </div>

        {/* Message input and send button container */}
        {/* The 'flex' container automatically manages space between the input and button. */}
        <div className="p-4 border-t border-gray-400 flex flex-col sm:flex-row items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full sm:flex-1 border border-gray-400 bg-gray-100 text-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>

      </div>
    </div >
  );
};

export default Chat;
