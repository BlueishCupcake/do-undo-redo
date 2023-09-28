import { configureStore } from "@reduxjs/toolkit";
import konvaSlice from "./konvaSlice";

export const store = configureStore({
  reducer: {
    konva: konvaSlice,
  },
});
