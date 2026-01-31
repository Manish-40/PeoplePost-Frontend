import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userslice';
import { Link, useNavigate } from 'react-router-dom';
import { baseurl } from '../utils/constants';
const Login = () => {
  const [emailid, setemailid] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [isloginform, setisloginform] = useState(true);
  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "", firstName: "", lastName: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateForm = () => {
    const nextErrors = { email: "", password: "", firstName: "", lastName: "" };
    if (!isValidEmail(emailid)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    if (!isloginform) {
      if (!firstname.trim()) nextErrors.firstName = "First name is required";
      if (!lastname.trim()) nextErrors.lastName = "Last name is required";
    }
    setFormErrors(nextErrors);
    return Object.values(nextErrors).every(v => v === "");
  };

  const handlelogin = async () => {
    try {
      if (!validateForm()) return;
      setIsLoading(true);
      const res = await axios.post(
        baseurl + "/login", {
        emailid,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/")
    }
    catch (error) {
      seterror(error?.response?.data || "something went wrong");
    }
    finally {
      setIsLoading(false);
    }
  };


  const handlesignup = async () => {
    try {
      if (!validateForm()) return;
      setIsLoading(true);
      const res = await axios.post(baseurl + "/signup", { firstname, lastname, emailid, password }, { withCredentials: true });

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }
    catch (error) {
      seterror(error?.response?.data || "something went wrong");

    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100'>

      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden w-full max-w-md animate-fade-in-down transform transition-all duration-300 hover:scale-[1.01] border border-gray-200">
        <div className="p-8">
          <div className="text-center mb-8">
            {/* <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
        <span className="text-2xl font-bold">D</span>
      </div> */}
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {isloginform ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              {isloginform ? "Sign in to continue to PeoplePost" : "Join PeoplePost to connect and collaborate"}
            </p>
          </div>

          {!isloginform && (
            <>
              <div className="relative mb-4 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
                <label htmlFor="firstName" className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 pt-4 text-gray-800 rounded-md focus:outline-none bg-transparent"
                  placeholder=" " /* Use placeholder as a visual cue, but the label handles the primary role */
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  aria-invalid={!!formErrors.firstName}
                />
                {formErrors.firstName && <p className="px-2 pt-1 text-xs text-red-600">{formErrors.firstName}</p>}
              </div>

              <div className="relative mb-4 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
                <label htmlFor="lastName" className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 pt-4 text-gray-800 rounded-md focus:outline-none bg-transparent"
                  placeholder=" "
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  aria-invalid={!!formErrors.lastName}
                />
                {formErrors.lastName && <p className="px-2 pt-1 text-xs text-red-600">{formErrors.lastName}</p>}
              </div>
            </>
          )}

          <div className="relative mb-4 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
            <label htmlFor="email" className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Email Address</label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 pt-4 text-gray-800 rounded-md focus:outline-none bg-transparent"
              placeholder=" "
              value={emailid}
              onChange={(e) => setemailid(e.target.value)}
              aria-invalid={!!formErrors.email}
            />
            {formErrors.email && <p className="px-2 pt-1 text-xs text-red-600">{formErrors.email}</p>}
          </div>

          <div className="relative mb-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
            <label htmlFor="password" className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Password</label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 pt-4 text-gray-800 rounded-md focus:outline-none bg-transparent"
                placeholder=" "
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                aria-invalid={!!formErrors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="px-3 text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formErrors.password && <p className="px-2 pt-1 text-xs text-red-600">{formErrors.password}</p>}
          </div>


          {isloginform &&<div className="flex justify-end mb-4">
            <Link
              to="/user/forgotPassword"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>}


          <div className="flex items-center justify-between mb-6">
            {/* <label className="inline-flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" className="checkbox checkbox-sm" checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)} />
        Remember me */}
            {/* </label> */}

          </div>

          {error && <p className='text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-6 text-sm text-center font-medium animate-fade-in'>{error}</p>}

          <div className="text-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg w-full text-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              onClick={isloginform ? handlelogin : handlesignup}
              disabled={isLoading}
            >
              {isLoading ? (isloginform ? "Signing in..." : "Creating account...") : (isloginform ? "Sign in" : "Sign up")}
            </button>
          </div>

          <p
            className='mt-6 text-center text-blue-600 text-sm cursor-pointer hover:underline font-medium transition-colors duration-200'
            onClick={() => setisloginform((value) => !value)}
          >
            {isloginform ? "New to PeoplePost? Create an account" : "Already have an account? Sign in"}
          </p>
          <p className="mt-2 text-center text-xs text-gray-500">By continuing, you agree to our Terms and Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
};


export default Login


//<div className='flex justify-center'>
//    <div className="card card-border bg-base-100 w-96 m-5">
//   <div className="card-body">
//     <h2 className="card-title justify-center ">{isloginform ? "Login" : "Sign Up"}</h2>
//     {!isloginform &&<><fieldset className="fieldset">
//   <legend className="fieldset-legend">First Name</legend>
//   <input type="text" className="input" placeholder="" value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
// </fieldset>

//   <fieldset className="fieldset">
//   <legend className="fieldset-legend">Last Name</legend>
//   <input type="text" className="input" placeholder="" value={lastname} onChange={(e)=>setlastname(e.target.value)}/>
// </fieldset></>}

// <fieldset className="fieldset">
//   <legend className="fieldset-legend">EmailId</legend>
//   <input type="text" className="input" placeholder="" value={emailid} onChange={(e)=>setemailid(e.target.value)}/>
// </fieldset>

// <fieldset className="fieldset">
//   <legend className="fieldset-legend">Password</legend>
//   <input type="password" className="input" placeholder="" value={password} onChange={(e)=>setpassword(e.target.value)}/>
// </fieldset>
// <p className='text-red-500'>{error}</p>
//     <div className="card-actions justify-center m-2" >
//       <button className="btn btn-primary"onClick={isloginform ? handlelogin : handlesignup}>{isloginform ? "Login" : "Sign Up"}</button>
//     </div>
//     <p className='m-auto cursor-pointer py-2' onClick={()=>setisloginform((value)=>!value)}>{isloginform ? "New User? Sign Up Here" : "Existing User? Login Here"}</p>
//   </div>
// </div>
// </div>