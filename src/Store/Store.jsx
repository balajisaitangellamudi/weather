import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./Slices/snackbarSlice";
import coordinateReducer from "./Slices/coordinatesSlice";
import temperatureUnitsTypeReducer from "./Slices/temperatureToogleSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    coordinates: coordinateReducer,
    unitsType: temperatureUnitsTypeReducer,
  },
});

export default store;
