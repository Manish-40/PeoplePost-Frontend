import axios from 'axios';
import { useEffect } from 'react';
import { baseurl } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../utils/feedslice';
import Usercard from './usercard';
import Post from './Post';

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getfeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(baseurl + "/feed", { withCredentials: true });
      dispatch(addfeed(res.data));
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);
  if (!feed) return;
  if (feed.length <= 0) return <h1 className="justify-center flex my-10">No new user found</h1>;
  return (feed && (<div className='flex justify-center my-10'>
    <Usercard user={feed[0]} /></div>
  )
  );
};

export default Feed