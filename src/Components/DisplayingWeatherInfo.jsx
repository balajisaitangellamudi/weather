import React, { useCallback, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useDispatch, useSelector } from "react-redux";
import {
  apiKey,
  convertTemperature,
  fetcher,
  fetchWeatherIcon,
  formatDate,
  formatString,
  getDailyFirstForecast,
} from "../Utils/Helpers";
import { Spinner } from "./SearchInput";
import { showSnackbar } from "../Store/Slices/snackbarSlice";
import Error from "../Components/Error/Error";

const CurrentWeather = ({ currentWeather, unitsType }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="w-100">
        <div className="text-center">
          <h5 className="mb-0">{currentWeather?.weather?.[0]?.main}</h5>
          <p className="mb-0">{currentWeather?.weather?.[0]?.description}</p>
        </div>
        <div
          style={{ width: "100%", margin: "0 auto", padding: "10px 0px 30px" }}
        >
          <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-between align-items-center w-100 mx-auto">
            <img
              src={fetchWeatherIcon(
                currentWeather?.weather?.[0]?.icon || "10n"
              )}
              className="fluid-img"
              alt=""
            />
            <div style={{ margin: "0px", fontSize: "70px" }}>
              {`${convertTemperature(
                currentWeather?.main?.temp,
                unitsType
              )}°${unitsType}`}
              {/* {(currentWeather?.main?.temp, unitsType)}° */}
            </div>
            <div style={{ fontSize: "20px", display: "grid", gap: "5px" }}>
              {Object.entries(currentWeather?.main || {})
                .filter(
                  ([key]) => !["temp", "temp_min", "temp_max"].includes(key)
                )
                .map(([key, value], index) => (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 10px 1fr",
                    }}
                  >
                    <div className="text-start">{formatString(key)}</div>
                    <div className="text-center">:</div>
                    <div className="text-end">
                      {(key == "feels_like" &&
                        `${convertTemperature(
                          value,
                          unitsType
                        )}°${unitsType}`) ||
                        value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="d-flex flex-wrap gap-2 pt-5 pt-sm-3"
            style={{ fontSize: "16px" }}
          >
            <p className="flex-grow-1">
              <i className="bi bi-brightness-high px-2"></i>
              {`Rise: ${formatDate(
                currentWeather?.sys?.sunrise,
                currentWeather.timezone,
                true
              )}`}
            </p>
            <p className="flex-grow-1">
              <i className="bi bi-brightness-high-fill px-2"></i>
              {`Set: ${formatDate(
                currentWeather?.sys?.sunset,
                currentWeather?.timezone,
                true
              )}`}
            </p>
            <p className="flex-grow-1">
              <i className="bi bi-thermometer-half px-2"></i>
              {`Temp max: ${convertTemperature(
                currentWeather?.main?.temp_max,
                unitsType
              )}°${unitsType}`}
            </p>
            <p className="flex-grow-1">
              <i className="bi bi-thermometer px-2"></i>
              {`Temp min: ${convertTemperature(
                currentWeather?.main?.temp_min,
                unitsType
              )}°${unitsType}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FiveDayForecast = ({ forecast, unitsType }) => {
  return (
    <div>
      <h4 className="mb-1">5 DAYS FORECAST</h4>
      <div style={{ border: "1px solid #fff" }}></div>
      <div className="d-flex flex-wrap mt-3 gap-2">
        {getDailyFirstForecast(forecast?.list)
          ?.slice(1, 5)
          .map((item, index) => (
            <div className="text-center flex-grow-1 mt-2" key={index}>
              <p>
                {formatDate(item.dt, forecast?.city?.timezone, false, true)}
              </p>

              {console.log(item.dt)}
              <img
                src={fetchWeatherIcon(item?.weather?.[0]?.icon)}
                className="fluid-img"
                alt=""
              />
              <p className="mb-0">
                {`${convertTemperature(
                  item?.main?.temp,
                  unitsType
                )}°${unitsType}`}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

const DisplayingWeatherInfo = () => {
  const dispatch = useDispatch();
  const { lat, lon, city, country } = useSelector((state) => state.coordinates);
  const unitsType = useSelector((state) => state.unitsType);

  if (!apiKey) {
    return (
      <div className="text-center mt-5">
        <h6>Error: API key is missing. Please check your configuration.</h6>
      </div>
    );
  }

  const current_weather_api =
    lat && lon
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      : null;

  const five_days_weather_api =
    lat && lon
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      : null;

  const {
    data: currentWeather,
    error: currentWeatherError,
    isLoading: currentWeatherLoading,
  } = useSWR(current_weather_api, fetcher, { revalidateOnFocus: false });

  const {
    data: fiveDaysWeather,
    error: fiveDaysWeatherError,
    isLoading: fiveDaysWeatherLoading,
  } = useSWR(five_days_weather_api, fetcher, { revalidateOnFocus: false });

  // Re-fetch every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (current_weather_api) mutate(current_weather_api);
      if (five_days_weather_api) mutate(five_days_weather_api);

      dispatch(showSnackbar("Data is refreshed!"));
    }, 8000);

    return () => clearInterval(interval);
  }, [current_weather_api, five_days_weather_api]);

  return (
    <div className="text-light">
      {lat && lon ? (
        <>
          {city && country && (
            <div className="d-flex justify-content-center align-items-center py-4 text-light fs-bold">
              <div className="text-center">
                <p className="mb-1">
                  {formatDate(currentWeather?.dt, currentWeather?.timezone)}
                </p>
                <h4 className="fw-bold">{`${city}, ${country}`}</h4>
              </div>
            </div>
          )}

          {/* Current Weather Section */}
          {currentWeatherLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "425px" }}
            >
              <Spinner />
            </div>
          ) : currentWeatherError || currentWeather?.cod !== 200 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "425px" }}
            >
              <Error
                statusCode={currentWeather?.cod || "Network Error"}
                msg={currentWeather?.message || "Failed to fetch weather data."}
              />
            </div>
          ) : (
            <CurrentWeather
              currentWeather={currentWeather}
              unitsType={unitsType}
            />
          )}

          {/* 5-Day Forecast Section */}
          {fiveDaysWeatherLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "175px" }}
            >
              <Spinner />
            </div>
          ) : fiveDaysWeatherError || fiveDaysWeather?.cod !== "200" ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "175px" }}
            >
              <Error
                statusCode={fiveDaysWeather?.cod || "Network Error"}
                msg={
                  fiveDaysWeather?.message || "Failed to fetch forecast data."
                }
              />
            </div>
          ) : (
            <FiveDayForecast forecast={fiveDaysWeather} unitsType={unitsType} />
          )}
        </>
      ) : (
        <div className="text-center mt-5">
          <h6>Please Search City!</h6>
        </div>
      )}
    </div>
  );
};

export default DisplayingWeatherInfo;
