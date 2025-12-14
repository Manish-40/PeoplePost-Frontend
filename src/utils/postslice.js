import { createSlice } from "@reduxjs/toolkit";

const postslice = createSlice({
    name: "collection",
    initialState: null,
    reducers: {
        addPost: (state, action) => action.payload,
        removePost: () => null,
    },
});


export const { addPost, removePost } = postslice.actions;

export default postslice.reducer;