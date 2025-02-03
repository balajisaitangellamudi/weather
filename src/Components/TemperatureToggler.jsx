import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTemperatureUnitType } from "../Store/Slices/temperatureToogleSlice";

const TemperatureToggle = () => {
  const unitsType = useSelector((state) => state.unitsType);
  const dispatch = useDispatch();

  return (
    <div className="d-flex text-light px-3">
      <p
        className={`mb-0 ${unitsType === "F" ? "fw-bold text-warning" : ""}`}
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(setTemperatureUnitType("F"))}
      >
        °F
      </p>
      <span className="px-1">|</span>
      <p
        className={`mb-0 ${unitsType === "C" ? "fw-bold text-warning" : ""}`}
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(setTemperatureUnitType("C"))}
      >
        °C
      </p>
    </div>
  );
};

export default TemperatureToggle;
