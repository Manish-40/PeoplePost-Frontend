import { createSlice } from "@reduxjs/toolkit";

const postfeedslice = createSlice({
    name: "postfeedcollection",
    initialState: null,
    reducers: {
        addPostFeed: (state, action) => action.payload,
        removePostFeed: () => null,
    },
});


export const { addPostFeed, removePostFeed } = postfeedslice.actions;

export default postfeedslice.reducer;