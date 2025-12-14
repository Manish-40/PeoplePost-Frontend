import io from "socket.io-client";
import { baseurl } from "./constants";

export const createSocketConnection = () => {
    return io(baseurl);
};