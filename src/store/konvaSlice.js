import { createSlice } from "@reduxjs/toolkit";
import undoable from "redux-undo";

const initialState = {
  markerType: "",
  markerColor: "#000000",
  markerIsSelected: false,
  markers: {
    circle: [],
    square: [],
  },
};

export const konvaSlice = createSlice({
  name: "konva",
  initialState,
  reducers: {
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
    updateMarker: (state, action) => {
      const { markerType, index, marker } = action.payload;

      switch (markerType) {
        case "circle":
          state.markers.circle[index] = marker;
          break;
        case "square":
          state.markers.square[index] = marker;
          break;
        default:
          break;
      }
    },
    selectMarker: (state) => {
      state.markerIsSelected = true;
    },
    deselectMarker: (state) => {
      state.markerIsSelected = false;
    },
  },
});

export const {
  changeMarker,
  changeMarkerColor,
  addMarker,
  updateMarker,
  selectMarker,
  deselectMarker,
} = konvaSlice.actions;

const undoableKonvaReducer = undoable(konvaSlice.reducer);
export default undoableKonvaReducer;
