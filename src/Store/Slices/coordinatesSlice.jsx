import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lon: null,
};

export const coordinateSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.state = action.payload.state;
    },
    clearCoordinates: (state) => {
      state.lat = null;
      state.lon = null;
      state.city = null;
      state.country = null;
      state.state = null;
    },
  },
});

// Export actions and reducer
export const { setCoordinates, clearCoordinates } = coordinateSlice.actions;
export default coordinateSlice.reducer;
