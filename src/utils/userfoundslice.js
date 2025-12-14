import { createSlice } from "@reduxjs/toolkit";

const userfoundslice = createSlice({
    name: "userfound",
    initialState: [],
    reducers: {
        addUserfound: (state, action) => action.payload,
        removeUserfound: () => [],
    },
});


export const { addUserfound, removeUserfound } = userfoundslice.actions;

export default userfoundslice.reducer;