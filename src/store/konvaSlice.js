import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  markerType: "",
  markers: {
    circle: [],
    square: [],
  },
};

export const konvaSlice = createSlice({
  name: "konva",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    changeMarker: (state, marker) => {
      state.markerType = marker;
    },
    addMarker: (state, marker) => {
      state.markers.circle = [...state.markers.circle, marker];
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, changeMarker, addMarker } =
  konvaSlice.actions;

export default konvaSlice.reducer;
