import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../utils/constants";

export default function Found() {
  const users = useSelector((store) => store.userfound);
  // This is the correct placement for the "No users found" message
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen text-center">
        <p className="text-gray-600 text-lg">
          No users found. Please try a different name.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const fetchUserView = async (targetuserid) => {
    try {
      const res = await axios.get(baseurl + "/userview/" + targetuserid, { withCredentials: true });
      console.log(res.data);

    }
    catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="my-10 max-w-4xl mx-auto px-4 font-sans">
        {users.map((user) => (
          <Link to={"/user/" + user._id} onClick={() => fetchUserView(user._id)}>
            <div
              key={user._id}
              className="flex items-center bg-indigo-50 rounded-xl shadow-lg p-6 mb-4 transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200"
            >
              <div className="flex items-center justify-center">
                {user?.photourl && user.photourl !== "http://peoplepost-default.png" ? (
                  <img
                    src={user.photourl}
                    alt={user?.firstname || "User"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-6xl text-gray-400">
                    {(user?.firstname?.charAt(0).toUpperCase() || "") +
                      (user?.lastname?.charAt(0).toUpperCase() || "")}
                  </div>
                )}
              </div>

              <div className="text-left mx-4 flex-grow">
                <h2 className="font-extrabold text-xl text-gray-900">
                  {user.firstname} {user.lastname}
                </h2>
                {user.age && user.gender && (
                  <p className="text-gray-700 text-sm line-clamp-2">
                    Age: {user.age}, Gender: {user.gender}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center py-5">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </Link>
      </div>
    </>
  );
}

