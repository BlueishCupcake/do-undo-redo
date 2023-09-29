import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  markerType: "",
  markerColor: "#000",
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
    changeMarker: (state, action) => {
      state.markerType = action.payload;
    },
    changeMarkerColor: (state, action) => {
      state.markerColor = action.payload;
    },
    addMarker: (state, action) => {
      const { markerType, marker } = action.payload;

      switch (markerType) {
        case "circle":
          state.markers.circle = [...state.markers.circle, marker];
          break;
        case "square":
          state.markers.square = [...state.markers.square, marker];
          break;
        default:
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  changeMarker,
  changeMarkerColor,
  addMarker,
} = konvaSlice.actions;

export default konvaSlice.reducer;
