import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { baseurl } from "../utils/constants";
import axios from "axios";
import { addUser, removeUser } from "../utils/userslice";
const AuthLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${baseurl}/api/me`, { withCredentials: true })
            .then(res => {
                if (!res.data.user) throw new Error();
                console.log("res.status: ", res.status);
                return res.data;
            })
            .then(data => {
                console.log("then.data: ", data)
                dispatch(addUser(data.user));
            })
            .catch((e) => {
                console.log(e)
                dispatch(removeUser());
            });
    }, [dispatch]);

    return children;
};

export default AuthLoader;
