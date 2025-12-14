import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { baseurl } from '../utils/constants';

const UserPostclick = () => {
  const { targetpostid } = useParams();

  const [post, setPost] = useState("");
  const fetchpostuser = async () => {
    try {
      const userclick = await axios.get(baseurl + "/post/user/" + targetpostid, { withCredentials: true });
      setPost(userclick.data);

    }
    catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchpostuser()
  }, [targetpostid])
  const { url, description, userPostViewCount, _id, createdAt, name, viewedBy } = post;
  const photourl = post?.author?.photourl;
  return (
    // <div className='p-3'>
    //     <div className='items-center justify-between'>
    //         <img src={photourl} className='w-20 h-20 rounded-4xl'>
    //         </img>
    //         <h1>{post.name}</h1>
    //         <img src={url} className='w-full h-full object-cover'>
    //         </img>
    //         <p>{description}</p>
    //         <h1>Eye: {userPostViewCount}</h1>

    //     </div>

    // </div>
    <div className="p-3 flex flex-col items-center">
      <div className="my-10 max-w-7xl mx-auto px-4">
        <div
          key={_id}
          className="w-full max-w-lg bg-white rounded-xl shadow-lg my-4
                     transform hover:scale-[1.01] transition-all duration-300 ease-in-out 
                     border border-gray-200 overflow-hidden"
        >
          {/* User info */}
          <Link to={"/user/" + name}>
            <div className="flex items-center p-3">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src={
                    photourl || "user"
                    // "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  }
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-gray-900 text-sm">
                {name || "User"}
              </div>

              <div className="font-semibold text-gray-900 text-sm ml-10">
                {createdAt}
              </div>
            </div>
          </Link>


          {/* Post image */}
          {url && <div className="w-full max-h-[600px] bg-gray-100 rounded-lg overflow-y-auto">
            <img
              src={url || "https://placehold.co/600x600?text=Loading..."}
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
              <span className="font-semibold">{name || "User"}</span>{" "}
              {description}
            </p>
            {/* <p>Post Viewed: {userPostViewCount}</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPostclick;
