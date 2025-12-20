import React, { useEffect } from 'react'
import Navbar from "./navbar"
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { baseurl } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userslice';
import AiChatbot from './AiChatbot';
const body = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userdata = useSelector((store) => store.user.data);
  const fetchuser = async () => {
    if (userdata) return;
    try {
      const res = await axios.get(baseurl + "/profile/view",
        { withCredentials: true, }
      );
      dispatch(addUser(res.data))
    }
    catch (error) {
      if (error.status === 401) {
        return navigate("/login");

      }
      console.log(error);

    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <div>
      {userdata && <Navbar />}
      <div className='min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4'>
        <Outlet />
        {/* <AiChatbot /> */}
      </div>
    </div>
  )
}

export default body

