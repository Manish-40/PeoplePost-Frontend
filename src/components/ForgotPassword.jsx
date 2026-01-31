import axios from 'axios';
import React, { useState } from 'react'
import { baseurl } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [emailid, setemailid] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError]=useState("");
    const navigate = useNavigate();

    const forgotPassword = async () => {
        try {
            const res = await axios.patch(baseurl + "/user/forgotPassword", { emailid, newPassword: password }, { withCredentials: true });
            console.log(res.data);
            return navigate("/login");
        }
        catch (error) {
            setError(error?.response?.data?.message || "something went wront");
            console.log(error?.response?.data?.message);
        }
    }
    return (
        <div>
            <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100'>

                <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden w-full max-w-md animate-fade-in-down transform transition-all duration-300 hover:scale-[1.01] border border-gray-200">
                    <div className='p-8'>
                        <div className='text-center mb-8'>
                            <h2 className='text-3xl font-extrabold text-gray-900 tracking-tight'>PeoplePost</h2>
                            <h1>Forgot Password</h1>
                        </div>
                        <div className="p-4">

                            <div className="relative mb-4 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
                                <label htmlFor="email" className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Email Address</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full px-4 py-3 pt-4 text-gray-800 rounded-md focus:outline-none bg-transparent"
                                    placeholder=" "
                                    value={emailid}
                                    onChange={(e) => setemailid(e.target.value)}
                                />
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
                                
                            </div>
                            {error&&<p className="px-2 pt-1 text-xs text-red-600">{error}</p>}
                            <div className="p-2 text-center">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg w-full text-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                    onClick={forgotPassword}>Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
