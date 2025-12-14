import { createSlice } from "@reduxjs/toolkit"

const requestslice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state, action) => action.payload,
        removerequest: (state, action) => {
            const newArray = state.filter(r => r._id != action.payload)
            return newArray;
        }
    },
});

export const { addRequest, removerequest } = requestslice.actions;
export default requestslice.reducer;