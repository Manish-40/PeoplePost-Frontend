import { useEffect } from 'react'
import { baseurl } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionslice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  var count = 0;
  const dispatch = useDispatch();

  const fetchconnection = async () => {
    try {
      const res = await axios.get(baseurl + "/user/connections", { withCredentials: true });

      const connections = Array.isArray(res.data?.data) ? res.data.data : [];

      dispatch(addConnection(connections));
    }
    catch (error) {
      console.log("error ", error);
      dispatch(addConnection([])); // prevent null issues
    }
  };


  useEffect(() => {
    fetchconnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className='flex justify-center my-10'>No connections found</h1>;
  for (let index = 0; index < connections.length; index++) {
    count = count + 1;
  }


  return (
    <>
      {/* <div className=' my-10 max-w-4xl mx-auto px-4'>
      <h1 className="text-bold text-3xl mb-8 text-left">Connections ({count})</h1>
      <button className="text-bold text-3xl mb-8 text-right border btn btn-primary" onClick={handlecheckbox}>Create Group</button>
    {connections.map((connection)=>{
      const {_id,firstname,lastname,age,gender,about,photourl}=connection;
      return (
        <>
        <div key={_id}className='flex items-center bg-white rounded-xl shadow-lg p-6 mb-4
      transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200'>
          <div><img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photourl}/></div>
          <div className='text-left mx-4'>
            <h2 className='font-extrabold text-xl text-gray-900'>{firstname+" "+lastname}</h2>
            {age && gender && <p className="text-sm text-gray-600 my-1">{age} years old, {gender}</p>}
          <p className="text-gray-700 text-sm line-clamp-2">{about}</p>
          </div>
          <Link to={"/chat/"+_id}>
         <button className='btn btn-primary'>Chat</button>
         </Link>
         {isvisible&&
         <div><input type='checkbox' className='checkbox-primary checkbox-xl' onChange={handlecheckeditems}/>
         <h1 className='text text-2xl text-center'/>selected: {firstname}</div>}
          </div>
        </>
      )
    })

    }
    </div> */}
      <div className='my-10 max-w-4xl mx-auto px-4 font-sans'>

        <div className="flex justify-between items-center mb-8">
          <h1 className="font-extrabold text-3xl text-gray-900">
            Connections ({connections.length})
          </h1>
        </div>



        {connections?.filter((c) => c && (c.userId || c._id)).map((connection) => {
          const user = connection.userId || connection;
          if (!user) return null;
          const { _id, firstname, lastname, age, gender, about, photourl } = user;
          return (
            <>
              <div
                key={_id}
                className='flex items-center bg-indigo-50 rounded-xl shadow-lg p-6 mb-4 transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200'
              >


                <div className="flex items-center justify-center">
                  {photourl && photourl !== "http://peoplepost-default.png" ? (
                    <img
                      src={photourl}
                      alt={firstname || "User"}
                      className="w-20 h-20 rounded-full object-contain border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 text-4xl text-gray-800">
                      {(firstname?.charAt(0).toUpperCase() || "") +
                        (lastname?.charAt(0).toUpperCase() || "")}
                    </div>
                  )}
                </div>


                <div className='text-left mx-4 flex-grow'>
                  <h2 className='font-extrabold text-xl text-gray-900'>{firstname + " " + lastname}</h2>
                  {age && gender && <p className="text-sm text-gray-600 my-1">{age} years old, {gender}</p>}
                  <p className="text-gray-700 text-sm line-clamp-2">{about}</p>
                </div>

                {/* Chat button */}
                <Link to={"/chat/" + _id}>
                  <button className='py-2 px-4 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-colors'>
                    Chat
                  </button>
                </Link>
              </div>

            </>
          );

        })}
      </div>
    </>
  );
};
export default Connections;
