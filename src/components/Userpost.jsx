import React, { useState } from 'react'
import axios from 'axios';
import { baseurl } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUserPost } from '../utils/userpostslice';
import { setLikes, updateLike } from '../utils/likeslice'
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage, AiOutlineDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
const Userpost = () => {
  const userpostsave = useSelector((store) => store.userpost);
  const likes = useSelector((store) => store.like);
  //   console.log(userpostsave.author._id);
console.log(userpostsave);

  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogHandleToOpen = (id) => {
    setSelectedPostId(id);
    setDialogOpen(true);
  };

  const dialogHandleToClose = () => {
    setDialogOpen(false);
    setSelectedPostId(null);
  };
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loader, setLoader] = useState(false);


  const dispatch = useDispatch();
  const userpost = async () => {
    try {
      const res = await axios.get(baseurl + "/post/user", { withCredentials: true });
      dispatch(addUserPost(res.data.data));

      fetchLikesForAllPosts(res.data.data);
    }
    catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    userpost();
  }, []);
  const fetchLikesForAllPosts = async (posts) => {
    const likeData = {};
    await Promise.all(
      posts.map(async (post) => {
        try {
          const res = await axios.get(`${baseurl}/like/${post._id}`, { withCredentials: true });
          likeData[post._id] = res.data.likeCount;
        } catch {
          likeData[post._id] = 0;
        }
      })
    );
    dispatch(setLikes(likeData));
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`${baseurl}/like/${postId}`, {}, { withCredentials: true });
      dispatch(updateLike({ postId, likeCount: res.data.likeCount }));
    } catch (error) {
      if (error.response?.data?.message === "Already liked this post") {
        alert("You already liked this post");
      } else {
        console.log(error);
      }
    }
  };

  const fetchUserPostView = async (targetpostid) => {
    try {
      await axios.get(baseurl + "/userpostview/" + targetpostid, { withCredentials: true });
    }
    catch (error) {
      console.log(error);
    }
  }
  const fetchUserView = async (targetuserid) => {
    try {
      await axios.get(baseurl + "/userview/" + targetuserid, { withCredentials: true });
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    if (!selectedPostId) return;

    try {
      setLoader(true); // Start loader
      setDialogOpen(false); // Close dialog immediately

      await axios.delete(baseurl + "/post/" + selectedPostId, { withCredentials: true });

      // FIX: Update Redux state so post disappears from UI
      const updatedPosts = userpostsave.filter(post => post._id !== selectedPostId);
      dispatch(addUserPost(updatedPosts));
      
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
      alert("Failed to delete post");
    }
  }
  if (!userpostsave) return;

  if (userpostsave.length === 0) return <h1 className='flex justify-center my-10'>No collections found</h1>;
  return (
    <div className='my-10 max-w-4xl mx-auto px-4'>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">My Posts: {userpostsave.length}</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {userpostsave.map((post) => {

          const { url, description, firstname, lastname, photourl, _id, createdAt, userPostViewCount } = post;
          const liked = (likes?.[_id] ?? 0) > 0;
          const { author } = post;
          const style = firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
          return (
            <div
              key={_id}
              className='bg-white rounded-xl shadow-lg
                            transform hover:scale-[1.01] transition-all duration-300 ease-in-out border border-gray-200'
            >

              <Link to={"/user/" + author} onClick={() => fetchUserView(author)}>
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    {photourl !== "http://peoplepost-default.png" ? (
                      <img
                        src={photourl}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700 font-semibold">
                        {style}
                      </div>
                    )}
                  </div>

                  <div className="font-semibold text-gray-900">
                    {firstname || "User"} {lastname || ""}
                  </div>

                  <div className="ml-auto text-gray-500 text-sm font-semibold">
                    {createdAt}
                  </div>
                </div>

              </Link>

              <Link to={"/post/user/" + _id} onClick={() => fetchUserPostView(_id)}>
                <div className='relative w-full ' style={{ paddingBottom: '100%' }}>
                  {url && <img
                    alt="Post photo"
                    className="absolute inset-0 w-full h-full object-cover"
                    src={url}
                    onError={(e) => e.target.src = "https://placehold.co/600x600/E5E7EB/4B5563?text=Image+Not+Found"}
                  />}
                </div>



                <div className='p-4'>
                  <p className="text-gray-700 text-base leading-tight">
                    <span className="font-semibold">{firstname|| "User"} {lastname || "User"}</span> {description}
                  </p>
                </div>
              </Link>
              {/* Like + Comment Section */}
              <div className="px-4 py-3 flex items-center justify-between border-t">

                {/* Like Button */}
                <button
                  onClick={() => handleLike(_id)}
                  className="flex items-center gap-2 text-gray-800 hover:text-red-500 transition"
                >
                  {liked ? (
                    <AiFillHeart className="text-red-500 text-2xl" />
                  ) : (
                    <AiOutlineHeart className="text-gray-700 text-2xl" />
                  )}
                  <span className="font-medium">
                    {likes[_id] ?? 0}
                  </span>
                </button>

                {/* Comment Button */}
                <Link
                  to={`/comment/${_id}`}
                  className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition"
                >
                  <AiOutlineMessage className="text-gray-700 text-2xl" />
                  <span className="font-medium">Comment</span>
                </Link>

              </div>
              {/* VIEWS AND DELETE SECTION (Aligned Right) */}
              <div className="px-4 py-2 border-t mt-auto flex items-center justify-between">
                <div className="text-gray-600 text-xs">
                  👁️ <span className="font-semibold">{userPostViewCount}</span> views
                </div>

                {/* Delete Icon on the far right */}
                <button
                  onClick={() => dialogHandleToOpen(_id)}
                  className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                  title="Delete Post"
                >
                  <AiOutlineDelete size={22} />
                </button>
              </div>

              {/* Confirmation Dialog */}
              <Dialog open={dialogOpen} onClose={dialogHandleToClose} fullWidth maxWidth="xs">
                <DialogTitle>Delete Post?</DialogTitle>
                <DialogContent>
                  <DialogContentText component="div">
                    Are you sure you want to delete this post?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={dialogHandleToClose}>Cancel</Button>
                  <Button
                    onClick={handleDeletePost}
                    variant="contained"
                    sx={{ bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

            </div>
          );
        })}
      </div>
      {/* 1. LOADER OVERLAY */}
      {loader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-sm pointer-events-none">
          <div className="bg-gray-800 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 text-lg font-semibold pointer-events-auto">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Deleting your post...
          </div>
        </div>
      )}
    </div>
  );
};

export default Userpost


