import { createSlice } from "@reduxjs/toolkit";

const likeslice = createSlice({
    name: "like",
    initialState: {},
    reducers: {
    setLikes: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateLike: (state, action) => {
      const { postId, likeCount } = action.payload;
      state[postId] = likeCount;
    }
  },
});


export const { setLikes, updateLike } = likeslice.actions;

export default likeslice.reducer;