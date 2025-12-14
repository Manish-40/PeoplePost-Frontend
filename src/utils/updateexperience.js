import { createSlice } from "@reduxjs/toolkit";

const updateexperience = createSlice({
    name: "editExperience",
    initialState: null,
    reducers: {
        setSelectedExperience: (state, action) => action.payload,
        clearSelectedExperience: () => null,
    },
});


export const { setSelectedExperience, clearSelectedExperience } = updateexperience.actions;

export default updateexperience.reducer;