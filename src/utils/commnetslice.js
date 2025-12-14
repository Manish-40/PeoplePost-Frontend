import { createSlice } from "@reduxjs/toolkit";

const commentslice = createSlice({
    name: "likecomment",
    initialState: null,
    reducers: {
        addComment: (state, action) => {
            return action.payload;
        },
        removeComment: (state, action) => {
            return null;
        },
    },
});

export const { addComment, removeComment } = commentslice.actions;

export default commentslice.reducer;