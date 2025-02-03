import { createSlice } from "@reduxjs/toolkit";

const initialState = "F";

export const temperatureUnitsTypeSlice = createSlice({
  name: "unitsType",
  initialState,
  reducers: {
    setTemperatureUnitType: (state, action) => action.payload,
  },
});

export const { setTemperatureUnitType } = temperatureUnitsTypeSlice.actions;
export default temperatureUnitsTypeSlice.reducer;
