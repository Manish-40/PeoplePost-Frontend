import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../utils/constants";

const Like = () => {
  const { targetpostid } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch post data including likes
  const fetchLikes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseurl}/post/${targetpostid}`, {
        withCredentials: true,
      });

      setPost(res.data);
      // Assuming you have a separate API to get all likes for this post
      const likesRes = await axios.get(`${baseurl}/like/${targetpostid}`, {
        withCredentials: true,
      });

      setLikes(likesRes.data);

      // Check if current user liked the post
      const userId = res.data.user?._id; // or get logged-in user from store
      setLiked(likesRes.data.some((l) => l.user._id === userId));
    } catch (err) {
      console.error("Error fetching likes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [targetpostid]);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${baseurl}/like/${targetpostid}`,
        {},
        { withCredentials: true }
      );

      // Update likes list based on API response
      if (res.data.message === "Post liked") {
        setLiked(true);
        setLikes((prev) => [...prev, res.data.user]); // add new user
      } else if (res.data.message === "Post unliked") {
        setLiked(false);
        setLikes((prev) => prev.filter((l) => l._id !== res.data.user._id));
      }
    } catch (err) {
      console.error("Error liking/unliking post:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-3 max-w-lg mx-auto bg-white rounded shadow">
      {/* Post Image */}
      <div className="w-full max-h-[400px] overflow-hidden rounded">
        <img
          src={post?.url || "https://placehold.co/600x600?text=No+Image"}
          alt="Post"
          className="w-full object-contain"
        />
      </div>

      {/* Like Button */}
      <div className="my-2 flex items-center gap-2">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded text-white ${liked ? "bg-red-500" : "bg-blue-500"
            }`}
        >
          {liked ? "Unlike ❤️" : "Like 👍"}
        </button>
        <span>{likes.length} {likes.length === 1 ? "Like" : "Likes"}</span>
      </div>

      {/* List of Users who liked */}
      <div className="flex flex-wrap gap-2 mt-2">
        {likes.map((l) => (
          <div key={l._id} className="flex items-center gap-1">
            <img
              src={
                l.user?.photourl ||
                "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg"
              }
              alt={l.user?.firstname}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm">{l.user?.firstname || "User"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Like;
