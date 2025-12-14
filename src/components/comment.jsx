import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseurl } from "../utils/constants";
import { addComment } from "../utils/commnetslice";

const Comment = () => {
  const { targetpostid } = useParams();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  // const user = useSelector((store) => store.user);
  // const userid = user?._id;


  // const collections = useSelector((store) => store.postfeed);
  const dispatch = useDispatch();

  // ---------------------------
  // Get the post based on ID
  // ---------------------------  

  // ---------------------------
  // Fetch comments from backend
  // ---------------------------
  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseurl}/comment/${targetpostid}`, {
        withCredentials: true,
      });
      console.log("comments: ", res.data)
      setComments(res.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(
        baseurl + `/post/${targetpostid}`, { withCredentials: true });
      return res.data.data;
    } catch (error) {
      console.error("error while fetching post: ", error);
    }
  }
  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost(); // wait for API response
      const postData = { ...data, photourl: data.author.photourl }
      setPost(postData);
      fetchComments();
    };

    getPost();
  }, [targetpostid]);

  // ---------------------------
  // Add new comment
  // ---------------------------
  const handleAddComment = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(
        `${baseurl}/comment/${targetpostid}`,
        { text },
        { withCredentials: true }
      );

      // Add new comment to local state and Redux store
      setComments((prev) => [...prev, res.data]);
      dispatch(addComment(res.data));
      setText("");
      await fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
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

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="p-3 flex flex-col items-center">
      <div className="my-10 max-w-7xl mx-auto px-4">
        <div
          key={post._id}
          className="w-full max-w-lg bg-white rounded-xl shadow-lg my-4
                     transform hover:scale-[1.01] transition-all duration-300 ease-in-out 
                     border border-gray-200 overflow-hidden"
        >
          {/* User info */}
          <Link to={"/user/" + post.name} onClick={() => fetchUserView(post.author)}>
            <div className="flex items-center p-3">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src={
                    post.photourl || "user"
                    // "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  }
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-gray-900 text-sm">
                {post.name || "User"}
              </div>

              <div className="font-semibold text-gray-900 text-sm ml-10">
                {post.createdAt}
              </div>
            </div>
          </Link>


          {/* Post image */}

          {post.url && <div className="w-full max-h-[600px] bg-gray-100 rounded-lg overflow-y-auto">
            <img
              src={post.url || "https://placehold.co/600x600?text=Loading..."}
              alt="Post photo"
              className="w-full h-full object-contain"
              onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x600/E5E7EB/4B5563?text=Image+Not+Found")
              }
            />
          </div>}

          {/* Description */}
          <div className="p-3">
            <p className="text-gray-700 text-sm leading-tight line-clamp-2">
              <span className="font-semibold">{post.name || "User"}</span>{" "}
              {post.description}
            </p>
          </div>

          {/* Comments Section */}
          <div className="p-3">
            <h3 className="font-semibold mb-2">Comments: {comments.length}</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto bg-gray-50 p-3 rounded">
              {loading && <p className="text-gray-500 text-sm">Loading comments...</p>}
              {!loading && comments.length === 0 && (
                <p className="text-gray-500 text-sm">No comments yet</p>
              )}
              {!loading &&
                comments.map((c) => (
                  <div key={c._id} className="border-b pb-1 flex items-center gap-2">
                    <img
                      src={
                        c.user?.photourl ||
                        "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                      }
                      alt="avatar"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-semibold">{c.user?.firstname || "User"}:</span>
                    <span className="text-gray-700">{c.text}</span>
                    <span className="text-gray-900 text-sm font-semibold">{c.createdAt}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Comment Input */}
          <div className="p-3 flex items-center gap-2">
            <input
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border w-full p-2 rounded"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Comment;
