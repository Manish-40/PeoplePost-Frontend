import axios from 'axios'
import React from 'react'
import { baseurl } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGroupname } from '../utils/groupnameslice'
import { Link } from 'react-router-dom'
const Group = () => {
  const dispatch = useDispatch();
  const groupnames = useSelector((store) => store.groupname);
  const fetchgroup = async () => {
    try {
      const res = await axios.get(baseurl + "/group", { withCredentials: true });
      console.log("data", res);
      const groupname = res?.data?.data[0]?.groupName;
      const groupParticipants = res?.data?.data[0]?.groupMessages?.participants?.map((msg) => {
        const { firstname, lastname } = msg;
        console.log("participants name " + firstname + " " + lastname);
      });
      // const { senderId, text } = msg;
      // return { firstname: senderId?.firstname, lastname: senderId?.lastname, text };
      console.log("groupname", groupname);
      console.log(groupParticipants);
      dispatch(addGroupname(res.data.data))
    }
    catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchgroup();
  }, []);
  return (
    <div className='my-10 max-w-7xl mx-auto px-4'>
      {groupnames?.map((msg) => {
        const { _id, groupName, groupMessages } = msg;
        return (
          <div
            key={_id}
            className='bg-white rounded-xl shadow-lg p-6 mb-4 transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200'
          >
            {/* Group Name */}
            <h1 className="font-extrabold text-2xl text-gray-900 mb-3">
              {groupName}
            </h1>

            {/* Members + Chat Button Row */}
            <div className="flex justify-between items-center flex-wrap">
              {/* Members */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-700">
                {groupMessages?.participants?.map((name, index) => {
                  const { firstname, lastname } = name;
                  return (
                    <h2 key={index} className='text-gray-700'>
                      {firstname} {lastname}
                    </h2>
                  );
                })}
              </div>

              {/* Chat Button */}
              <Link to={"/group/chat"}>
                <button className='py-2 px-4 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-colors'>
                  Chat
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>


  )
}

export default Group
