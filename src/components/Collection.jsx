import React, { useEffect } from "react";
import axios from "axios";
import { baseurl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPostFeed } from "../utils/postfeedslice";
import { setLikes, updateLike } from "../utils/likeslice";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";


const Collection = () => {
  const collections = useSelector((store) => store.postfeed);
  //const user=useSelector((store)=>store.user);
  const likes = useSelector((store) => store.like);
  //const {targetuserid}=useParams();
  //const {targetpostid}=useParams();


  const dispatch = useDispatch();

  // Fetch posts
  const fetchpostfeed = async () => {
    try {
      const res = await axios.get(`${baseurl}/post/feed`, { withCredentials: true });
      console.log(res.data);
      dispatch(addPostFeed(res.data));
      fetchLikesForAllPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch like count for all posts
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

  useEffect(() => {
    fetchpostfeed();
  }, []);

  // Handle Like
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

  const fetchUserView = async (targetuserid) => {
    try {
      await axios.get(baseurl + "/userview/" + targetuserid, { withCredentials: true });
    }
    catch (error) {
      console.log(error);
    }
  }
  // useEffect(()=>{
  //   if(targetuserid)
  //   {
  //   fetchUserView(targetuserid);
  //   }
  // },[targetuserid]);

  const fetchUserPostView = async (targetpostid) => {
    try {
      await axios.get(baseurl + "/userpostview/" + targetpostid, { withCredentials: true });
    }
    catch (error) {
      console.log(error);
    }
  }

  // useEffect(()=>{
  //   if(targetpostid)
  //   {
  //   fetchUserPostView(targetpostid);
  //   }
  // },[targetpostid]);

  //   const PostViewTracker = ({ postId }) => {
  //   useEffect(() => {
  //     axios.get(`${baseurl}/userpostview/${postId}`, { withCredentials: true });
  //   }, [postId]);

  //   return null;
  // };

  // const UserViewTracker=({authorId})=>{
  //   useEffect(()=>{
  //     axios.get(`${baseurl}/userview/${authorId}`,{withCredentials:true});
  //   },[authorId]);
  //   return null;
  // }


  if (!collections) return null;
  if (collections.length === 0) return <h1 className="flex justify-center my-10">No collections found</h1>;

  return (
    <div className="my-10 max-w-7xl mx-auto px-4">
      <div className="flex flex-col items-center">
        {collections.map((collection) => {
          const { url, description, firstname,lastname, createdAt } = collection;
          const { photourl } = collection.author;
          const postId = collection._id;
          const style=firstname?.charAt(0).toUpperCase() + lastname?.charAt(0).toUpperCase()
          console.log(style);
          const authorId = collection.author._id;
          const liked = (likes?.[postId] ?? 0) > 0; // If you want to show filled heart

          return (
            <div
              key={postId}
              className="w-full max-w-lg bg-white rounded-xl shadow-lg my-4 border border-gray-200 overflow-hidden"

            >
              <Link to={"/user/" + authorId} onClick={() => fetchUserView(authorId)}>
                {/* User info */}
                <div className="flex items-center justify-between w-full h-16">
                  {/* Left Side - Avatar + Name */}
                  <div className="flex items-center">

                    {/* <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ml-3">
                      <img
                        src={photourl || "https://placehold.co/50x50/E5E7EB/4B5563?text=User"}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div> */}
                    {/* Profile Picture */}
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ml-3">
                      {photourl !== "http://peoplepost-default.png" ? (
                        <img
                          src={photourl}
                          alt="User avatar"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 rounded-full">
                          {style}
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {firstname} {lastname}
                    </div>

                  </div>

                  {/* Right Side - Time */}
                  <div className="text-gray-500 text-xs mr-5">{createdAt}</div>
                </div>
              </Link>


              {/* Post image */}

              <Link to={"/post/user/" + collection._id} onClick={() => fetchUserPostView(postId)}>
                {url &&
                  <div className="w-full max-h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                    <img src={url} alt="Post" className="w-full h-full" />
                  </div>
                }


                {/* Description */}

                <div className="p-3">
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">{firstname} {lastname}</span> {description}
                  </p>
                </div>
              </Link>

              {/* Like Button */}
              <div className="p-3 flex">
                <button
                  onClick={() => handleLike(postId)}
                  className="flex items-center gap-2 bg-white py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
                >
                  {liked ? <AiFillHeart className="text-red-500 text-xl" /> : <AiOutlineHeart className="text-gray-800 text-xl" />}
                  <span>Like</span>
                </button>

                {/* Like Count */}
                <div className="flex px-1 py-7 text-gray-700 text-sm">
                  {likes[postId] ?? 0} {likes[postId] === 1 ? "Like" : "Likes"}
                </div>

                {/* Comment Button */}
                <div className="p-3">
                  <Link to={`/comment/${postId}`}>
                    <button className="flex items-center gap-2 w-full bg-white py-3 text-gray-900 font-semibold hover:bg-gray-100 transition rounded">
                      <AiOutlineMessage className="text-gray-800 text-xl" />
                      <span>Comment</span>
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
