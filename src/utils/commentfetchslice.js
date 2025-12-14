import { createSlice } from "@reduxjs/toolkit";

const commentfetchslice = createSlice({
    name: "commentfetch",
    initialState: null,
    reducers: {
        addCommentfetch: (state, action) => action.payload,
        removeCommentfetch: () => null,
    },
});


export const { addCommentfetch, removeCommentfetch } = commentfetchslice.actions;

export default commentfetchslice.reducer;