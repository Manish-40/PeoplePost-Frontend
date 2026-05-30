import axios from "axios";
import { baseurl, baseurlIndicator } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeuserfeed } from "../utils/feedslice";
import { useEffect, useState } from "react";
import img from "../utils/profile.png"

const UserCard = ({ user }) => {
  const { _id, firstname, lastname, age, gender, about, photourl } = user;
  console.log(photourl);
  const dispatch = useDispatch();

  const [imOnline, setImOnline] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(baseurlIndicator + "/heartbeat/" + _id, { withCredentials: true });
        console.log("res-ind: ", response.data.online)
        setImOnline(response.data.online);
      } catch (err) {
        setImOnline(false);
      }
    };

    checkStatus();
    // Poll every 30 seconds to update the UI
    const timer = setInterval(checkStatus, 21000);
    return () => clearInterval(timer);
  }, [_id]);

  const defaultPhoto =
    img

  const handleSendRequest = async (status, userid) => {
    try {
      await axios.post(`${baseurl}/request/send/${status}/${userid}`, {}, { withCredentials: true });
      dispatch(removeuserfeed(userid));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-xs mx-auto my-3 border border-gray-200 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="text-center py-3 bg-gray-50 border-b border-gray-200">

          <h3 className="tracking-wide text-3xl font-bold text-gray-800">

            {/* {imOnline === true ? "online" : "offline"} */}
            Add to Friend
          </h3>
        </div>
        <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
          {imOnline === true ? (<span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
          </span>) : (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
          )}
          <img
            src={photourl ? `${photourl}` : defaultPhoto}
            alt={`${firstname} ${lastname}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = defaultPhoto;
            }}
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">
            {firstname + " " + lastname}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">{age}</span> years old,{" "}
              <span className="font-medium">{gender}</span>
            </p>
          )}
          {about && (
            <p className="text-gray-700 text-sm leading-snug mb-4 line-clamp-3">
              {about}
            </p>
          )}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
