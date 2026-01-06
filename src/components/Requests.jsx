
import { useEffect } from 'react'
import { baseurl } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removerequest } from '../utils/requestslice';
import axios from 'axios';
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  var count = 0;


  const reviewrequest = async (status, _id) => {
    try {
      await axios.post(baseurl + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removerequest(_id));
    }
    catch (error) {
      console.log(error);

    }
  }

  const fetchrequest = async () => {
    try {
      const res = await axios.get(baseurl + "/user/requests/received", { withCredentials: true });
      dispatch(addRequest(res.data.data));
    }
    catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchrequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1 className='flex justify-center my-10'>No requests found</h1>;
  for (let index = 0; index < requests.length; index++) {
    count = count + 1;
  }
  return (
    // <div className='justify-center text-center my-10'>
    //   <h1 className="text-bold text-3xl w-2/3">Connection Requests {count}</h1>
    // {requests.map((request)=>{
    //   const {_id,firstname,lastname,age,gender,about,photourl}=request.fromuserid;
    //   return (
    //     <div key={_id} className='flex m-4 p-4 rounded-lg justify-between items-center bg-base-300 w-2/3 mx-auto
    //     shadow-lg overflow-hidden mx-auto my-0.5 transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-300'>
    //       <div><img alt="photo" className="w-20 h-20 rounded-full  object-cover" src={photourl}/></div>
    //       <div className='text-left mx-4'>
    //         <h2 className='font-bold text-xl'>{firstname+" "+lastname}</h2>
    //         {age && gender &&<p>{age+" "+gender}</p>}
    //         <p>{about}</p>

    //       </div>
    //      <div>
    //         <button className="btn btn-primary mx-2"onClick={()=>reviewrequest("rejected",request._id)}>Reject</button>
    //         <button className="btn btn-secondary mx-2"onClick={()=>{reviewrequest("accepted",request._id)}}>Accept</button>
    //      </div>
    //       </div>
    //   )
    // })

    // }
    // </div>
    <div className='my-10 max-w-4xl mx-auto px-4 font-sans'>

      <div className="flex justify-between items-center mb-8">
        <h1 className="font-extrabold text-3xl text-gray-900">
          Connection Requests ({requests.length})
        </h1>
      </div>


      {requests?.map((request) => {
        const user = request.fromuserid;
        if (!user) return null;

        const { _id, firstname, lastname, age, gender, about, photourl } = user;
        // const { _id, firstname, lastname, age, gender, about, photourl } = request.fromuserid;
        return (
          <div
            key={_id}
            className='flex flex-col sm:flex-row items-center bg-indigo-50 rounded-xl shadow-lg p-6 mb-4 transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200'
          >

            {photourl && photourl !== "http://peoplepost-default.png" ? (
              <div className="flex-shrink-0 mb-4 sm:mb-0 items-center justify-center">
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-contain shadow border-1 border-gray-300"
                  src={photourl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/80x80/94A3B8/FFFFFF?text=NA";
                  }}
                />
              </div>
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 text-2xl text-gray-800 shadow border-2 border-gray-300">
                {(firstname?.charAt(0)?.toUpperCase() || "") +
                  (lastname?.charAt(0)?.toUpperCase() || "")}
              </div>
            )}




            <div className='flex-grow mx-0 sm:mx-6 text-center sm:text-left mb-4 sm:mb-0'>
              <h2 className='font-extrabold text-xl text-gray-900'>{firstname + " " + lastname}</h2>
              {age && gender && <p className="text-sm text-gray-600 my-1">{age} years old, {gender}</p>}
              <p className="text-gray-700 text-sm line-clamp-2">{about}</p>
            </div>


            <div className="flex-shrink-0 flex space-x-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 shadow-md"
                onClick={() => reviewrequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 shadow-md"
                onClick={() => { reviewrequest("accepted", request._id) }}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
