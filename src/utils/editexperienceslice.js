import { createSlice } from "@reduxjs/toolkit";

const editexperienceslice = createSlice({
    name: "experience",
    initialState: [],
    reducers: {
        addExperience: (state, action) => {
            return action.payload;
        },

        removeExperience: () => null,
    },
});


export const { addExperience, removeExperience } = editexperienceslice.actions;

export default editexperienceslice.reducer;