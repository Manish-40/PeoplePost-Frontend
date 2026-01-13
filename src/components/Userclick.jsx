import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseurl, baseurlIndicator } from "../utils/constants";

const Userclick = () => {
  const { userid } = useParams();
  console.log(userid);


  const [user, setUser] = useState(null);
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  // Fetch USER by firstname
  const fetchUser = async () => {
    try {
      const res = await axios.get(baseurl + "/user/" + userid, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userid]);

  // Fetch EDUCATION of clicked user
  const fetchEducation = async () => {
    try {
      if (!user?._id) return;
      const res = await axios.get(baseurl + "/education/" + user._id, {
        withCredentials: true,
      });
      setEducationList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch EXPERIENCE of clicked user
  const fetchExperience = async () => {
    try {
      if (!user?._id) return;
      const res = await axios.get(baseurl + "/experience/" + user._id, {
        withCredentials: true,
      });
      setExperienceList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // When user loads -> now fetch edu + exp
  useEffect(() => {
    if (user && user._id) {
      fetchEducation();
      fetchExperience();
    }
  }, [user]);

  // GROUP EXPERIENCE BY COMPANY
  const groupedExperience = Object.entries(
    experienceList.reduce((acc, exp) => {
      if (!acc[exp.company]) acc[exp.company] = [];
      acc[exp.company].push(exp);
      return acc;
    }, {})
  );


  const [imOnline, setImOnline] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get(baseurlIndicator + "/heartbeat/" + user?._id, { withCredentials: true });
        console.log("res-ind: ", response.data.online)
        setImOnline(response.data.online);
      } catch (err) {
        setImOnline(false);
      }
    };

    checkStatus();
    // Poll every 30 seconds to update the UI
    const timer = setInterval(checkStatus, 21000);
    return () => clearInterval(timer);
  }, [user?._id]);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* LEFT COLUMN FOR USER INFO */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow p-6 flex flex-col items-center space-y-6">

          {/* Profile Image */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-200">

              {user?.photourl !== "http://peoplepost-default.png" ? (
                <img
                  src={user?.photourl}
                  alt={`${user?.firstname} ${user?.lastname}`}
                  className="w-full h-full object-contain border-1 border-gray-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-6xl text-gray-400">
                  {user?.firstname.charAt(0).toUpperCase() + user?.lastname.charAt(0).toUpperCase()}
                </div>
              )}


            </div>
            {imOnline ? (
              <span className="absolute top-6 right-5 flex h-3 w-3 z-10">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
              </span>
            ) : (
              <span className="absolute top-6 right-5 flex h-3 w-3 z-10">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
              </span>
            )}
          </div>

          {/* Name */}
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            {user?.firstname} {user?.lastname}
          </h1>

          {/* Age + Gender
          {user?.age && user?.gender && (
            <p className="text-gray-600 text-sm">
              {user.age} years old, {user.gender}
            </p>
          )} */}

          {/* About */}
          {user?.about && (
            <p className="text-gray-700 text-sm text-center">{user.about}</p>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:w-2/3 flex flex-col space-y-6">

          {/* EDUCATION SECTION */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Education</h3>

            {educationList.length === 0 ? (
              <p className="text-gray-500 text-sm">No education added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationList.map((edu) => (
                  <div
                    key={edu._id}
                    className="p-4 border rounded-lg hover:shadow transition-all duration-200"
                  >
                    <p className="font-semibold text-gray-800">{edu.school}</p>
                    <p className="text-gray-600 text-sm">
                      {edu.degree} in {edu.field_of_study}
                    </p>

                    {edu.grade && (
                      <p className="text-gray-500 text-sm">Grade: {edu.grade}</p>
                    )}

                    <p className="text-gray-400 text-xs">
                      {edu.from} - {edu.to}
                    </p>

                    {edu.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {edu.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EXPERIENCE SECTION */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Experience</h3>

            {groupedExperience.length === 0 ? (
              <p className="text-gray-500 text-sm">No experience added yet.</p>
            ) : (
              <div className="space-y-4">
                {groupedExperience.map(([company, items]) => (
                  <div
                    key={company}
                    className="border rounded-lg p-4 hover:shadow transition-all duration-200"
                  >
                    <h4 className="font-bold text-gray-800 mb-2">{company}</h4>

                    {items.map((exp) => (
                      <div
                        key={exp._id}
                        className="p-3 mb-2 border rounded hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold">
                            {exp.title} ({exp.employmentType})
                          </p>

                        </div>

                        {exp.profileHeadline && (
                          <p className="text-gray-500 text-sm">
                            Headline: {exp.profileHeadline}
                          </p>
                        )}

                        <p className="text-gray-400 text-xs">
                          {exp.from} - {exp.to}
                        </p>

                        {exp.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {exp.skills.map((s, idx) => (
                              <span
                                key={idx}
                                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Userclick;
