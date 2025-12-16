// import io from "socket.io-client";
// import { baseurl } from "./constants";

// export const createSocketConnection = () => {
//     return io(baseurl);
// };
import { io } from "socket.io-client";
import { baseurl } from "./constants";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(baseurl, {
    //   transports: ["polling"], // fallback for serverless
      withCredentials: true,                // if using cookies/session
    });
  }
  return socket;
};
