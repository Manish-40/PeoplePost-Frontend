import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { baseurl } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userslice';
import { addUserfound } from '../utils/userfoundslice';

const Navbar = () => {
  const user = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const handlelogout = async () => {
    try {
      await axios.post(baseurl + "/logout", { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");

    } catch (error) {
      console.log(error);

    }
  }
  const handlesearch = async () => {
    try {
      const res = await axios.post(
        baseurl + "/search", {
        firstname
      }, { withCredentials: true });
      if (!Array.isArray(res.data) || res.data.length === 0) {
        dispatch(addUserfound([]));
      } else {
        dispatch(addUserfound(res.data));
      }
      navigate("/found");
      // dispatch((addUserfound(res.data)));
      // navigate("/found");
    }
    catch (error) {
      console.log(error);
      dispatch(addUserfound([]));
      navigate("/found");
    }
  }



  return (
    <>
      <div className="navbar bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg py-3 px-4 sticky top-0 z-50 border-b border-gray-700/40">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-center gap-3">


          <div className="flex-1 flex justify-start items-center gap-4 mb-2 md:mb-0">
            <Link to="/" className="text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md py-1 px-2">
              DevMatch
            </Link>
            {user &&
              <>

                <Link to="/postfeed" className="text-sm sm:text-base font-medium hover:text-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md py-1 px-2">
                  All Posts
                </Link>
                <Link to="/userpost" className="text-sm sm:text-base font-medium hover:text-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md py-1 px-2">
                  My Posts
                </Link>
              </>
            }
          </div>


          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {user && (
              <div className="flex-grow flex items-center justify-end gap-2 md:gap-4 w-full">

                <div className="flex items-center bg-white rounded-full shadow-md flex-grow">
                  <span className="pl-3 text-gray-400" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l3.817 3.817a1 1 0 01-1.414 1.414l-3.816-3.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                  </span>
                  <input
                    type="text"
                    aria-label="Search users"
                    className="px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full border-none"
                    placeholder="Search users..."
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                  />

                  <button
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2 px-4 rounded-r-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 border-none"
                    onClick={handlesearch}
                    aria-label="Search"
                  >
                    Search
                  </button>

                </div>


                <div className="dropdown dropdown-end flex mx-5">
                  <p className='hidden lg:block text-sm mr-2 mx-4 my-2'>Welcome, <span className="font-bold">{user.firstname}</span></p>


                  <div tabIndex={0} role="button" className="btn border-amber-50 btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full my-4">
                      {user?.photourl !== "http://peoplepost-default.png" ? (
                        <img
                          alt="user photo"
                          src={user.photourl}
                          onError={(e) => e.target.src = 'https://placehold.co/40x40/94A3B8/FFFFFF?text=NA'}
                          className='w-full h-full object-contain'
                        />) : (
                        <div className="items-center w-10 text-center rounded-full my-2 mr-4">
                          {user?.firstname.charAt(0).toUpperCase() + user?.lastname.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[99] mt-3 w-52 p-2 shadow-lg text-gray-800"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li><Link to="/connections">Connections</Link></li>
                    <li><Link to="/requests">Requests</Link></li>
                    <li><Link to="/posts">Create Post</Link></li>
                    {/* <li><Link to="/group">Groups</Link></li> */}
                    <li><a onClick={handlelogout}>Logout</a></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
