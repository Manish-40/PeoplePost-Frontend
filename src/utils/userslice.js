import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name: "user",
    initialState: {
        data: null,
        loading: true,   // 🔑 important
    },
    reducers: {
        addUser: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            //return action.payload;
        },
        removeUser: (state, action) => {
            state.loading = false;
            state.data = null;
            //return null;
        },
    },
});

export const { addUser, removeUser } = userslice.actions;

export default userslice.reducer;