// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import { createSocketConnectionforgroup } from '../utils/socketcopy';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { baseurl } from '../utils/constants';

// const Groupchat = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [participants, setParticipants] = useState([]);
//   const user = useSelector(store => store.user);
//   const userId = user?._id;

//   const fetchChatMessages = async () => {
//     try {
//       const chat = await axios.get(baseurl + "/group", { withCredentials: true });
//       console.log("chat: ", chat);
//       const chatMessages = chat?.data?.data[0]?.groupMessages?.messages.map(msg => {
//         const { senderId, text } = msg;
//         return { firstname: senderId?.firstname, lastname: senderId?.lastname, text };
//       });
//       console.log("chatmessage: ", chatMessages);
//       const groupParticipants = chat?.data?.data[0]?.groupMessages?.participants.map(p => p._id);
//       setParticipants(groupParticipants);
//       console.log("groupParticipants: ", groupParticipants)
//       setMessages(chatMessages);
//     } catch (error) {
//       console.error("Failed to fetch chat messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnectionforgroup();
//     socket.emit("joinChatGroup", { firstname: user.firstname, userId, targetUserIds:participants });

//     socket.on("messageReceivedGroup", ({ firstname, lastname, text }) => {
//       setMessages(messages => [...messages, { firstname, lastname, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, participants, user?.firstname]);

//   const sendMessage = () => {
//     if (newMessage.trim() === "") return;
//     console.log("targetUserIds: ", ...participants)
//     const socket = createSocketConnectionforgroup();
//     socket.emit("sendMessageGroup", { firstname: user.firstname, lastname: user.lastname, userId, targetUserIds:participants, text: newMessage });
//     setMessages(messages => [
//     ...messages, 
//     { firstname: user.firstname, lastname: user.lastname, text: newMessage }
//   ]);
//     setNewMessage("");
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-4 sm:p-0'>
//       {/* Main chat container. This is responsive based on screen size. */}
//       {/* w-full on mobile, then w-3/4, w-2/3, and w-1/2 for larger screens */}
//       <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-screen sm:h-[80vh] flex flex-col border border-gray-400 rounded-xl shadow-lg bg-gray-200'>
//         {/* Chat header */}
//         <div className='p-5 border-b border-gray-400 flex justify-between items-center'>
//           <h1 className='text-2xl font-semibold'>Chat</h1>
//         </div>

//         {/* Chat messages display area with a flexible height and scroll */}
//         <div className='flex-1 overflow-y-auto p-5 space-y-4'>
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex items-end gap-2 ${user.firstname === msg.firstname ? 'justify-end' : 'justify-start'}`}
//             >
//               <div className={`p-3 rounded-lg max-w-[80%] break-words ${user.firstname === msg.firstname ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-400 text-black rounded-bl-none'}`}>
//                 <div className='font-semibold text-sm'>
//                   {msg.firstname}
//                 </div>
//                 <div>{msg.text}</div>
//               </div>
//             </div>
//           ))}
//           {/* Invisible element to scroll to */}
//         </div>

//         {/* Message input and send button container */}
//         {/* The 'flex' container automatically manages space between the input and button. */}
//         <div className='p-5 border-t border-gray-400 flex flex-wrap items-center gap-2'>
//           <input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className='flex-1 border border-gray-400 bg-gray-100 text-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder-gray-500'
//             placeholder='Type a message...'
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             className='bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors'
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Groupchat;
import React from 'react'

const Groupchat = () => {
  return (
    <div>
      groupchat
    </div>
  )
}

export default Groupchat
