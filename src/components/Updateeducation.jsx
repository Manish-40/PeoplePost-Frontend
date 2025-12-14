import React, { useState } from 'react';
import axios from 'axios';
import { baseurl } from '../utils/constants';
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import { addEducation } from '../utils/editeducationslice';
import { useNavigate } from 'react-router-dom';

const Updateeducation = ({ education }) => {

    const [open, setOpen] = useState(true);

    const [school, setSchool] = useState(education?.school || "");
    const [degree, setDegree] = useState(education?.degree || "");
    const [field_of_study, setField] = useState(education?.field_of_study || "");
    const [grade, setGrade] = useState(education?.grade || "");

    // Convert array → string for input
    const [skill, setSkill] = useState(
        Array.isArray(education?.skills)
            ? education?.skills.join(", ")
            : education?.skills || ""
    );

    const [from, setFrom] = useState(education?.from || "");
    const [to, setTo] = useState(education?.to || "");

    const [fromRaw, setFromRaw] = useState(education?.from || "");
    const [toRaw, setToRaw] = useState(education?.to || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);


    const handleUpdateEducation = async () => {
        try {
            const skillsArray = skill
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s);

            const data1 = { school, degree, field_of_study, grade, skills: skillsArray, from: fromRaw, to: toRaw };

            const res = await axios.patch(
                baseurl + "/education/" + education._id,
                data1,
                { withCredentials: true }
            );

            dispatch(addEducation(res.data));

            // 1. Show toast first
            setShowToast(true);
            setOpen(false);
            // 2. Delay navigation (and closing the dialog) to allow toast to display
            setTimeout(() => {
                setShowToast(false);
                // 3. Close the dialog and navigate AFTER the toast has been displayed

                navigate("/profile");
            }, 1500); // 1.5 seconds delay

        } catch (error) {
            console.log(error);
        }
    };

    // Ensure manual closure also navigates away
    const handleToClose = () => {
        setOpen(false);
        navigate("/profile");
    };


    const formatMonthYear = (value) => {
        if (!value) return "";
        const date = new Date(value);
        return date
            .toLocaleString("en-US", { month: "short", year: "numeric" })
            .replace(" ", " - ");
    };
    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gradient-to-br from-indigo-50 to-indigo-100">
            {/* Education Dialog */}
            <Dialog open={open} onClose={handleToClose} fullWidth maxWidth="lg">
                <DialogTitle>Update Education</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="space-y-4 mt-2">
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    School:
                                </legend>
                                <input type="text" value={school} placeholder="Ex: Boston University" className="w-full p-3 border rounded" onChange={(e) => setSchool(e.target.value)} />
                            </div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Degree:
                                </legend>
                                <input type="text" value={degree} placeholder="Ex: Bachelor of Science" className="w-full p-3 border rounded" onChange={(e) => setDegree(e.target.value)} /></div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Field of Study:
                                </legend>
                                <input type="text" value={field_of_study} placeholder="Ex: Business" className="w-full p-3 border rounded" onChange={(e) => setField(e.target.value)} /></div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Grade:
                                </legend>
                                <input type="text" value={grade} placeholder="Grade" className="w-full p-3 border rounded" onChange={(e) => setGrade(e.target.value)} /></div>
                            <div className="relative w-full">
                                <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">
                                    Skills:
                                </legend>
                                <input type="text" value={skill} placeholder="Separate skills with commas (e.g., Python, SQL)" className="w-full p-3 border rounded" onChange={(e) => setSkill(e.target.value)} /></div>

                            <div className='flex gap-4'>
                                <div className="w-1/2 relative">
                                    <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">From:</legend>
                                    <input type="text" value={from} className="w-1/2 p-3 border rounded" readOnly />
                                    <input type="month" value={fromRaw} placeholder="MM - YYYY" className="w-1/2 p-3 border rounded" onChange={(e) => { setFromRaw(e.target.value); setFrom(formatMonthYear(e.target.value)); }} />
                                </div>
                                <div className="w-1/2 relative">
                                    <legend className="absolute -top-2 left-2 px-1 text-xs text-gray-600 bg-white">To:</legend>
                                    <input type="text" value={to} className="w-1/2 p-3 border rounded" readOnly />
                                    <input type="month" value={toRaw} placeholder="MM-YYYY" className="w-1/2 p-3 border rounded" onChange={(e) => { setToRaw(e.target.value); setTo(formatMonthYear(e.target.value)); }} />
                                </div>
                            </div>

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleUpdateEducation}>Update</Button>
                    <Button onClick={handleToClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            {/* Toast */}
            {showToast && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-xl w-[90%] max-w-md z-50 text-center">
                    Education updated successfully.
                </div>
            )}
        </div>
    )
}

export default Updateeducation