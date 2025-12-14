import React from 'react'
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { addExperience } from '../utils/editexperienceslice';
import { stateCityMaster } from '../hooks/useEmployment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../utils/constants';
import axios from 'axios';
const Updateexperience = ({ experience }) => {
    console.log(experience)
    const [title, setTitle] = useState(experience?.title || "");
    const [employmentType, setEmploymentType] = useState(experience?.employmentType || "");
    const [company, setCompany] = useState(experience?.company || "");
    // const [location, setLocation] = useState(experience?.location|| "");
    const [locationType, setLocationType] = useState(experience?.locationType || "");
    const [description, setDescription] = useState(experience?.description || "");
    const [profileHeadline, setProfileHeadline] = useState(experience?.profileHeadline || "");
    const [experienceSkills, setExperienceSkills] = useState(
        Array.isArray(experience?.skills)
            ? experience?.skills.join(", ")
            : experience?.skills || ""
    );

    const [currentlyWorking, setCurrentlyWorking] = useState(experience?.currentlyWorking === true ? "yes" : "no");
    const [experienceFromRaw, setExperienceFromRaw] = useState(experience?.from || "");
    const [experienceToRaw, setExperienceToRaw] = useState(experience?.to || "");
    const [openExperience, setOpenExperience] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [isPresent, setIsPresent] = useState(false);

    const handleToCloseExperience = () => {
        setOpenExperience(false);
        navigate("/profile");
    };


    const [state, setState] = useState(experience?.location?.split(", ")[0] || "");



    const [city, setCity] = useState(experience?.location?.split(", ")[1] || "");
    const selectedState = stateCityMaster.find((s) => s.stateName === state);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateExperience = async () => {
        try {
            const newLocation = city + ", " + state;
            const skillsArray = experienceSkills.split(",").map(s => s.trim()).filter(s => s);
            const data2 = {
                title, employmentType, company, location: newLocation, locationType, description, profileHeadline,
                skills: skillsArray, currentlyWorking, from: experienceFromRaw, to: experienceToRaw
            };
            const res = await axios.patch(baseurl + "/experience/" + experience._id, data2, { withCredentials: true });
            dispatch(addExperience(res.data));
            setShowToast(true);
            setOpenExperience(false)
            setTimeout(() => {
                setShowToast(false);
                navigate("/profile");
            }, 1500)


        }
        catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            {/* Experience Dialog */}
            <Dialog open={openExperience} onClose={handleToCloseExperience} fullWidth maxWidth="lg">
                <DialogTitle>Update Experience</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="space-y-4 mt-2">

                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Title:
                                </legend>
                                <input type="text" value={title} placeholder="Ex: Retail Sales Manager" className="w-full p-3 border rounded" onChange={(e) => setTitle(e.target.value)} /></div>
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
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Company:
                                </legend>
                                <input type="text" value={company} placeholder="Ex: Microsoft" className="w-full p-3 border rounded" onChange={(e) => setCompany(e.target.value)} /></div>

                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    State:
                                </legend>
                                {/* <input type='text' value={state} className="w-full p-3 border rounded" readOnly></input> */}
                                <select type="select" value={state} className="w-full p-3 border rounded" onChange={(e) => { setState(e.target.value); setCity(""); }} >

                                    <option value="">Please select</option>
                                    {stateCityMaster.map((s, index) => {
                                        return (
                                            <option key={index} value={s.stateName}>{s.stateName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    City:
                                </legend>
                                {/* <input type='text' value={city} className="w-full p-3 border rounded" readOnly></input> */}
                                <select type="select" value={city} className="w-full p-3 border rounded" onChange={(e) => setCity(e.target.value)} disabled={!selectedState} >
                                    <option value="">Please Select</option>
                                    {selectedState?.cities.map((c, index) => {
                                        return (
                                            <option key={index} value={c}>{c}</option>
                                        )
                                    })}
                                </select>
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
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Description:
                                </legend>
                                <input type="text" value={description} className="w-full p-3 border rounded" onChange={(e) => setDescription(e.target.value)} /></div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Profile Headline:
                                </legend>
                                <input type="text" value={profileHeadline} placeholder="Ex: Software Developer @Google" className="w-full p-3 border rounded" onChange={(e) => setProfileHeadline(e.target.value)} /></div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Skills:
                                </legend>
                                <input type="text" value={experienceSkills} placeholder="Ex: C,C++" className="w-full p-3 border rounded" onChange={(e) => setExperienceSkills(e.target.value)} /></div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Currently Working:
                                </legend>
                                <select type="text" value={currentlyWorking} className="w-full p-3 border rounded"
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
                                </select>
                            </div>

                            <div className='flex gap-4'>
                                <div className="w-1/2 relative">
                                    <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">From:</legend>
                                    <input type="month" value={experienceFromRaw} className="w-1/2 p-3 border rounded" onChange={(e) => { setExperienceFromRaw(e.target.value); }} />
                                </div>
                                <div className="w-1/2 relative">
                                    <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">To:</legend>
                                    {experienceToRaw === "Present" ? (
                                        <input type="text" value={experienceToRaw} className='w-1/2 p-3 border rounded'></input>
                                    ) : (
                                        <input type="month" value={experienceToRaw} className="w-1/2 p-3 border rounded" onChange={(e) => { setExperienceToRaw(e.target.value); }} />
                                    )}

                                </div>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleUpdateExperience}>Update</Button>
                    <Button onClick={handleToCloseExperience} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Toast */}
            {showToast && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-xl w-[90%] max-w-md z-50 text-center">
                    Experience updated successfully.
                </div>
            )}
        </div>
    )
}

export default Updateexperience
