import axios from "axios";
import { baseurl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeuserfeed } from "../utils/feedslice";

const UserCard = ({ user }) => {
  const { _id, firstname, lastname, age, gender, about, photourl } = user;
  const dispatch = useDispatch();

  const defaultPhoto =
    "https://openseauserdata.com/files/7f16cec1cc177a7e148067006e73c02a.png";

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
            Add to Friend
          </h3>
        </div>
        <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
          <img
            src={photourl ? `${baseurl}/${photourl}` : defaultPhoto}
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
