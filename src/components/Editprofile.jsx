// import React, { useState } from 'react';
// import axios from 'axios';
// import { baseurl } from '../utils/constants';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userslice';

// const Editprofile = ({ user }) => {
//   const [firstname, setfirstname] = useState(user.firstname);
//   const [lastname, setlastname] = useState(user.lastname);
//   const [age, setage] = useState(user.age || "");
//   const [gender, setgender] = useState(user.gender || "");
//   const [about, setabout] = useState(user.about || "");
//   const [skills, setskills] = useState(user.skills || []);
//   const [photourl, setphotourl] = useState(user.photourl || "");
//   const [showtoast, setshowtoast] = useState(false);
//   const [error, seterror] = useState("");

//   const dispatch = useDispatch();

//   // Save profile function
//   const saveprofile = async () => {
//     seterror("");
//     try {
//       const data = { firstname, lastname, age, gender, about, skills, photourl };

//       const res = await axios.patch(baseurl + "/profile/edit", data, {
//         withCredentials: true,
//       });

//       dispatch(addUser(res?.data?.data));
//       setshowtoast(true);
//       setTimeout(() => setshowtoast(false), 3000);
//     } catch (err) {
//       seterror(err.response?.data || "Something went wrong");
//     }
//   };

//   return (
//     <div className='min-h-screen flex flex-col items-center py-10 px-4 bg-gradient-to-br from-indigo-50 to-indigo-100'>
//       <div className='flex flex-col lg:flex-row justify-center items-start lg:items-center gap-10 w-full max-w-6xl'>

//         {/* Edit Profile Form */}
//         <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md p-8 transform hover:scale-[1.01] transition-all duration-300 ease-in-out border border-gray-200">
//           <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Edit Profile</h2>

//           <div className="space-y-4">
//             {/* Text inputs */}
//             <div className="relative border border-gray-300 rounded-md">
//               <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">First name:</legend>
//               <input type="text" className="w-full px-4 py-3 pt-4 bg-transparent" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
//             </div>
//             <div className="relative border border-gray-300 rounded-md">
//               <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Last name:</legend>
//               <input type="text" className="w-full px-4 py-3 pt-4 bg-transparent" value={lastname} onChange={(e) => setlastname(e.target.value)} />
//             </div>
//             <div className="relative border border-gray-300 rounded-md">
//               <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Age:</legend>
//               <input type="text" className="w-full px-4 py-3 pt-4 bg-transparent" value={age} onChange={(e) => setage(e.target.value)} />
//             </div>
//             <div className="relative border border-gray-300 rounded-md">
//               <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Gender:</legend>
//               <input type="text" className="w-full px-4 py-3 pt-4 bg-transparent" value={gender} onChange={(e) => setgender(e.target.value)} />
//             </div>
//             <div className="relative border border-gray-300 rounded-md">
//               <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Skills:</legend>
//               <input type="text" className="w-full px-4 py-3 pt-4 bg-transparent" value={skills} onChange={(e) => setskills(e.target.value)} />
//             </div>
//             <div className="relative border border-gray-300 rounded-md">
//               <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">About:</legend>
//               <textarea className="w-full px-4 py-3 pt-4 bg-transparent min-h-[80px]" value={about} onChange={(e) => setabout(e.target.value)}></textarea>
//             </div>

//             {/* Photo URL input */}
//             <div className="relative border border-gray-300 rounded-md">
//               <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Photo URL:</legend>
//               <input type="text" className="w-full px-4 py-3 pt-4 bg-transparent" value={photourl} onChange={(e) => setphotourl(e.target.value)} placeholder="https://example.com/photo.jpg"/>
//             </div>
//           </div>

//           {error && <p className='text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mt-6 text-sm text-center'>{error}</p>}

//           <div className="mt-8 text-center">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg" onClick={saveprofile}>
//               Save Profile
//             </button>
//           </div>
//         </div>

//         {/* User Card Preview */}
//         <div className="flex-shrink-0 transform hover:scale-[1.01] transition-all duration-300 ease-in-out">
//           <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden max-w-xs mx-auto my-6 border border-gray-300">
//             <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-6xl font-light">
//               {photourl ? (
//                 <img
//                   src={photourl}
//                   alt={`${firstname} ${lastname}'s profile`}
//                   className="w-full h-full object-contain"
//                 />
//               ) : (
//                 <span>👤</span>
//               )}
//             </div>
//             <div className="p-6 text-center">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">{firstname} {lastname}</h2>
//               {age && gender && <p className="text-sm text-gray-600 mb-2">{age} years old, {gender}</p>}
//               {about && <p className="text-gray-700 text-sm leading-snug mb-4 line-clamp-3">{about}</p>}
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Toast */}
//       {showtoast && (
//         <div className="fixed justify-center">
//           <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-2">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//             <span>Profile saved successfully.</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Editprofile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userslice';
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { stateCityMaster } from '../hooks/useEmployment';
import { Link, useNavigate } from 'react-router-dom';
import { addEducation } from '../utils/editeducationslice';
import { addExperience } from '../utils/editexperienceslice';
import { setSelectedExperience } from '../utils/updateexperience';

const Editprofile = ({ user }) => {
  // === State Hooks (unchanged) ===
  const [firstname, setfirstname] = useState(user.firstname);
  const [lastname, setlastname] = useState(user.lastname);
  const [age, setage] = useState(user.age || "");
  const [gender, setgender] = useState(user.gender || "");
  const [about, setabout] = useState(user.about || "");
  const [skills, setskills] = useState(user.skills || []);
  const [photo, setphoto] = useState(null);
  const [previewUrl, setpreviewUrl] = useState(user.photourl || "");
  const [showtoast, setshowtoast] = useState(false);
  const [error, seterror] = useState("");
  const { userViewCount } = user;
  const [view, setView] = useState("");

  const [open, setOpen] = useState(false);
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [field_of_study, setField] = useState("");
  const [grade, setGrade] = useState("");
  const [skill, setSkill] = useState([]);
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
  const [fromRaw, setFromRaw] = useState("");
  const [toRaw, setToRaw] = useState("");
  const [educationList, setEducationList] = useState([]);

  const [title, setTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  const [description, setDescription] = useState("");
  const [profileHeadline, setProfileHeadline] = useState("");
  const [experienceSkills, setExperienceSkills] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState("");
  const [experienceFromRaw, setExperienceFromRaw] = useState("");
  const [experienceToRaw, setExperienceToRaw] = useState("");
  const [openExperience, setOpenExperience] = useState(false);
  const [experienceList, setExperienceList] = useState([]);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const selectedState = stateCityMaster.find((s) => s.stateName === state);

  const [isPresent, setIsPresent] = useState(false);
  // const [show,setShow] =useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // === File upload preview ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setphoto(file);
      setpreviewUrl(URL.createObjectURL(file));
    }
  };

  // const formatMonthYear = (value) => {
  //   if (!value) return "";
  //   const date = new Date(value);
  //   return date.toLocaleString("en-US", { month: "short", year: "numeric" }).replace(" ", " - ");
  // };

  // === Save profile ===
  const saveprofile = async () => {
    seterror("");
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);
      formData.append("skills", skills);
      if (photo) formData.append("photo", photo);

      const res = await axios.patch(baseurl + "/profile/edit", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(addUser(res?.data?.data));
      setshowtoast(true);
      setTimeout(() => setshowtoast(false), 3000);
    } catch (err) {
      seterror(err.response?.data || "Something went wrong");
    }
  };

  // === Education Handlers ===
  const handleClickToOpen = () => setOpen(true);
  const handleToclose = () => setOpen(false);
  console.log("fromRow: ", fromRaw);
  const handleAddEducation = async () => {
    try {
      if (!fromRaw) {
        alert("Select From date");
        return;
      }
      const skillsArray = skill.split(",").map(s => s.trim()).filter(s => s);
      const data1 = { school, degree, field_of_study, grade, skills: skillsArray, from: fromRaw, to: toRaw };
      await axios.post(baseurl + "/education", data1, { withCredentials: true });
      fetchEducation();
      setOpen(false);
      setSchool(""); setDegree(""); setField(""); setGrade(""); setSkill([]); setFromRaw(""); setToRaw(""); setFromRaw(""); setToRaw("");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchEducation = async () => {
    try {
      const res = await axios.get(baseurl + "/education", { withCredentials: true });
      console.log("res: ", res.data);

      setEducationList(res.data || []);
      dispatch(addEducation(res.data))
    } catch (err) {
      console.log(err);
    }
  };

  // === Experience Handlers ===
  const handleClickToOpenExperience = () => setOpenExperience(true);
  const handleToCloseExperience = () => setOpenExperience(false);
  const handleAddExperience = async () => {
    try {
      const newLocation = city + ", " + state;
      const skillsArray = experienceSkills.split(",").map(s => s.trim()).filter(s => s);
      if (isPresent) {
        setExperienceToRaw("Present");
      }
      const data2 = {
        title, employmentType, company, location: newLocation, locationType, description, profileHeadline,
        skills: skillsArray, currentlyWorking, from: experienceFromRaw, to: experienceToRaw
      };
      await axios.post(baseurl + "/experience", data2, { withCredentials: true });
      fetchExperience();
      setOpenExperience(false);



      setTitle(""); setEmploymentType(""); setCompany(""); setLocation(""); setLocationType("");
      setDescription(""); setProfileHeadline(""); setExperienceSkills(""); setCurrentlyWorking("");
      setExperienceFromRaw(""); setExperienceToRaw("");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchExperience = async () => {
    try {
      const res = await axios.get(baseurl + "/experience", { withCredentials: true });
      setExperienceList(res.data || []);
      dispatch(addExperience(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchEducation(); fetchExperience(); }, []);
  const grouped = Object.entries(experienceList);

  const fetchViewedBy = async () => {
    try {
      const res = await axios.get(baseurl + "/user/" + firstname, { withCredentials: true });
      setView(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchViewedBy()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Left Column */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow p-6 flex flex-col items-center space-y-6">

          {/* Profile Picture */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={`${firstname} ${lastname}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-6xl text-gray-400">
                👤
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-xl font-semibold text-gray-900 text-center">
            {firstname} {lastname}
          </h1>

          {/* About */}
          {about !== "" && <p className="text-gray-700 text-sm text-center">{about}</p>}

          {/* Upload Section + View Count + View List */}
          <div className="w-full bg-white rounded-lg shadow p-6 space-y-4">

            <h3 className="text-lg font-semibold text-gray-800">
              Upload Profile Photo:
            </h3>
            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded text-sm"
            />

            {/* Profile Viewed Count */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Profile Viewed: {userViewCount}
              </h3>
            </div>

            {/* Viewed By List */}
            <h3 className="text-lg font-semibold text-gray-800">Profile Viewed By:</h3>

            {view?.viewedBy?.length > 0 ? (
              view.viewedBy.map((e) => (
                <div
                  key={e._id}
                  className="p-3 mb-2 border rounded hover:shadow transition"
                >
                  {e.firstname} {e.lastname}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No viewers yet.</p>
            )}

          </div>

        </div>


        {/* Right Column */}
        <div className="lg:w-2/3 flex flex-col space-y-6">

          {/* Profile Form */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Edit Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 text-sm">First Name</label>
                <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} className="w-full p-3 border rounded" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Last Name</label>
                <input type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} className="w-full p-3 border rounded" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Age</label>
                <input type="text" value={age} onChange={(e) => setage(e.target.value)} className="w-full p-3 border rounded" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Gender</label>
                <select type="text" value={gender} onChange={(e) => setgender(e.target.value)} className="w-full p-3 border rounded" >
                  <option value="">Please Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-600 text-sm">Skills</label>
                <input type="text" value={skills} onChange={(e) => setskills(e.target.value)} className="w-full p-3 border rounded" />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-600 text-sm">About</label>
                <textarea value={about} onChange={(e) => setabout(e.target.value)} className="w-full p-3 border rounded min-h-[80px]" />
              </div>
            </div>
            <div className="text-right">
              <button onClick={saveprofile} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold shadow">
                Save
              </button>
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>}
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Educations</h3>
              <button onClick={handleClickToOpen} className="text-blue-600 font-semibold hover:underline">Add Education</button>
            </div>
            {educationList.length === 0 ? (
              <p className="text-gray-500 text-sm">No education added yet.</p>
            ) : (
              educationList.map((edu) => (
                <div key={edu._id} className="p-3 mb-2 border rounded hover:shadow">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{edu.school}</p>
                    <Link to={"/education/" + edu._id}>
                      <button className="text-sm text-amber-500 hover:underline">Edit</button>
                    </Link>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.degree} in {edu.field_of_study}</p>
                  {edu.grade && <p className="text-gray-500 text-sm">Grade: {edu.grade}</p>}
                  <p className="text-gray-400 text-xs">{edu.from} - {edu.to}</p>
                </div>
              ))
            )}
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
              <button onClick={handleClickToOpenExperience} className="text-blue-600 font-semibold hover:underline">Add Experience</button>
            </div>
            {grouped.map(([company, items]) => (
              <div key={company} className="mb-4">
                <h4 className="font-bold text-gray-800 mb-2">{company}</h4>
                {items.map((e) => (
                  <div key={e._id} className="p-3 mb-2 border rounded hover:shadow">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold">{e.title} ({e.employmentType})</p>
                      <button onClick={() => { dispatch(setSelectedExperience(e)); navigate("/experience/" + e._id); }} className="text-amber-500 text-sm hover:underline">Edit</button>
                    </div>
                    {e.profileHeadline && <p className="text-gray-500 text-sm">Headline: {e.profileHeadline}</p>}
                    <p className="text-gray-400 text-xs">{e.from} - {e.to}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* === Dialogs === */}
      {/* Education Dialog */}
      <Dialog open={open} onClose={handleToclose} fullWidth maxWidth="lg">
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="space-y-4 mt-2">
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">School:</legend>
                <input type="text" value={school} placeholder="Ex: Boston University" className="w-full p-3 border rounded" onChange={(e) => setSchool(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Degree:</legend>
                <input type="text" value={degree} placeholder="Ex: Bachelor of Science" className="w-full p-3 border rounded" onChange={(e) => setDegree(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Field of Study:</legend>
                <input type="text" value={field_of_study} placeholder="Ex: Business" className="w-full p-3 border rounded" onChange={(e) => setField(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Grade:</legend>
                <input type="text" value={grade} placeholder="Grade" className="w-full p-3 border rounded" onChange={(e) => setGrade(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Skills:</legend>
                <input type="text" value={skill} placeholder="Skills" className="w-full p-3 border rounded" onChange={(e) => setSkill(e.target.value)} />
              </div>
              <div className='flex gap-4'>
                <div className="w-1/2 relative">
                  <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">From:</legend>
                  <input type="month" value={fromRaw} className="w-full p-3 border rounded" onChange={(e) => { setFromRaw(e.target.value); }} />
                </div>
                <div className="w-1/2 relative">
                  <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">To:</legend>
                  <input type="month" value={toRaw} className="w-full p-3 border rounded" onChange={(e) => { setToRaw(e.target.value); }} />
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleAddEducation}>Add</Button>
          <Button onClick={handleToclose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Experience Dialog */}
      <Dialog open={openExperience} onClose={handleToCloseExperience} fullWidth maxWidth="lg">
        <DialogTitle>Add Experience</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="space-y-4 mt-2">
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Title:</legend>
                <input type="text" value={title} placeholder="Ex: Retail Sales Manager" className="w-full p-3 border rounded" onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                  Employment Type:
                </legend>
                <select type="select" value={employmentType} placeholder="Please Select" className="w-full p-3 border rounded" onChange={(e) => setEmploymentType(e.target.value)} >
                  <option value="">Please Select</option>
                  <option value="full time">Full Time</option>
                  <option value="part time">Part Time</option>
                  <option value="self employee">Self Employee</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                  <option value="apprenticeship">Apprenticeship</option>
                </select>
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Company:</legend>
                <input type="text" value={company} placeholder="Company Name" className="w-full p-3 border rounded" onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div className="relative w-full"> <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white"> State: </legend>
                <select type="text" value={state} className="w-full p-3 border rounded" onChange={(e) => { setState(e.target.value); setCity(""); }} >
                  <option value="">Please select</option> {stateCityMaster.map((s, index) => {
                    return (<option key={index} value={s.stateName}>{s.stateName}</option>)
                  })} </select> </div> <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white"> City: </legend>
                <select type="text" value={city} className="w-full p-3 border rounded" onChange={(e) => setCity(e.target.value)} disabled={!selectedState} >
                  <option value="">Please Select</option> {selectedState?.cities.map((c, index) => {
                    return (<option key={index} value={c}>{c}</option>)
                  })} </select>
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                  Location Type:
                </legend>
                <select type="text" value={locationType} placeholder="Please Select" className="w-full p-3 border rounded" onChange={(e) => setLocationType(e.target.value)} >
                  <option value="">Please Select</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Description:</legend>
                <textarea value={description} className="w-full p-3 border rounded min-h-[80px]" onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Headline:</legend>
                <input type="text" value={profileHeadline} placeholder="Ex: Software Developer @Google" className="w-full p-3 border rounded" onChange={(e) => setProfileHeadline(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">Skills:</legend>
                <input type="text" value={experienceSkills} placeholder="Ex: C,C++" className="w-full p-3 border rounded" onChange={(e) => setExperienceSkills(e.target.value)} />
              </div>
              <div className="relative w-full">
                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                  Currently Working:
                </legend>
                <select type="text" value={currentlyWorking} placeholder="Ex: yes, no" className="w-full p-3 border rounded"
                  onChange={(e) => {
                    setCurrentlyWorking(e.target.value)
                    const value = e.target.value;
                    if (value == "yes") {
                      setIsPresent(true);
                      setExperienceToRaw("Present");
                    }
                    else {
                      setIsPresent(false);
                      setExperienceToRaw("");
                    }
                  }} >
                  <option value="">Please Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  {/* {currentlyWorking=="yes" && setToRaw("") && setIsPresent(true)} */}
                </select>
              </div>
              <div className='flex gap-4'>
                <div className="w-1/2 relative">
                  <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">From:</legend>
                  <input type="month" value={experienceFromRaw} className="w-full p-3 border rounded" onChange={(e) => { setExperienceFromRaw(e.target.value); }} />
                </div>
                <div className="w-1/2 relative">
                  <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">To:</legend>

                  {experienceToRaw === "Present" ? (
                    <input value={experienceToRaw} className='w-full p-3 border rounded' readOnly></input>
                  ) : (
                    <input type="month" value={experienceToRaw} disabled={isPresent} className="w-full p-3 border rounded" onChange={(e) => { setExperienceToRaw(e.target.value); }} />
                  )}
                </div>
                {/* PRESENT CHECKBOX */}
                {/* <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isPresent}
                    onChange={(e) => {
                      setIsPresent(e.target.checked);

                      if (e.target.checked) {
                        // setTo("Present");
                        setToRaw("");
                      }
                    }}
                  />
                  <label className="text-sm text-gray-700">
                    I currently work here
                  </label>
                </div> */}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleAddExperience}>Add</Button>
          <Button onClick={handleToCloseExperience} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {showtoast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-xl w-[90%] max-w-md z-50 text-center">
          Profile saved successfully.
        </div>
      )}

    </div>
  );
};

export default Editprofile;

