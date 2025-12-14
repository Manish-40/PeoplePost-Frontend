import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addfeed: (state, action) => {
            return action.payload;
        },
        removeuserfeed: (state, action) => {
            const newfeed = state.filter(u => u._id != action.payload)
            return newfeed;
        },
    },
});

export const { addfeed, removeuserfeed } = feedslice.actions;
export default feedslice.reducer;