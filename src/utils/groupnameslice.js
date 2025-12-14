import { createSlice } from "@reduxjs/toolkit";

const groupnameslice = createSlice({
    name: "groupname",
    initialState: null,
    reducers: {
        addGroupname: (state, action) => action.payload,
        removeGroupname: () => null,
    },
});


export const { addGroupname, removeGroupname } = groupnameslice.actions;

export default groupnameslice.reducer;