const usercard1 = ({ user }) => {
  const { _id, firstname, lastname, age, gender, about, photourl } = user;
  // const dispatch=useDispatch();

  // const handlesendrequest=async(status,userid)=>{
  //   try
  //   {
  //       const res=await axios.post(baseurl+"/request/send/"+status+"/"+userid,{},{withCredentials:true});
  //       dispatch(removeuserfeed(userid));
  //   }
  //   catch(error)
  //   {
  //     console.log(error);

  //   }
  // }
  return (
    <>
      <div className="card bg-indigo-50 w-96 h-130 shadow-sm">
        <figure>
          <img
            src={user.photourl ? photourl : ""}
            alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstname + " " + lastname}</h2>
          {age && gender && <p>{age + " , " + gender}</p>}
          <p>{about}</p>
          {/* {!user&&
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={()=>handlesendrequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handlesendrequest("interested",_id)}>Interested</button>
      </div>} */}
        </div>
      </div>
    </>
  )
}

export default usercard1;
