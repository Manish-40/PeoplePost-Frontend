import { createSlice } from "@reduxjs/toolkit";

const userpostslice = createSlice({
    name: "userpost",
    initialState: null,
    reducers: {
        addUserPost: (state, action) => action.payload,
        removeUserPost: () => null,
    },
});


export const { addUserPost, removeUserPost } = userpostslice.actions;

export default userpostslice.reducer;