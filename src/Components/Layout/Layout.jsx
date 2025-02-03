import React from "react";
import SearchInput from "../SearchInput";
import TemperatureToggle from "../TemperatureToggler";
import DisplayingWeatherInfo from "../DisplayingWeatherInfo";
import Snackbar from "../Snackbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const { lat, lon, city, country } = useSelector((state) => state.coordinates);
  return (
    <div>
      {/* Search and Temperature Toggle */}
      <div className="d-flex justify-content-center align-items-center p-2 pt-3">
        <SearchInput />
        {lat && lon && city && country && <TemperatureToggle />}
      </div>

      {/* Displaying current weather info */}
      <DisplayingWeatherInfo />

      <Snackbar />
    </div>
  );
};

export default Layout;
