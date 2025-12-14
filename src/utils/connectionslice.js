import { createSlice } from "@reduxjs/toolkit";

const connectionslice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnection: (state, action) => action.payload,
        removeConnection: () => null,
    },
});


export const { addConnection, removeConnection } = connectionslice.actions;

export default connectionslice.reducer;