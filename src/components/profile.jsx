import React from 'react'
import Editprofile from './Editprofile'
import { useSelector } from 'react-redux'
import Post from './Post'
const Profile = () => {
  const user = useSelector((store) => store.user.data);
  return (user && (
    <div>
      <Editprofile user={user} />
      {/* <Post user={user}/> */}
    </div>
  ));
}

export default Profile
