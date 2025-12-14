import { createSlice } from "@reduxjs/toolkit";

const editeducationslice = createSlice({
    name: "education",
    initialState: [],
    reducers: {
        addEducation: (state, action) => {
            return action.payload
        },
        removeEducation: () => null,
    },
});


export const { addEducation, removeEducation } = editeducationslice.actions;

export default editeducationslice.reducer;