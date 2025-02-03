export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// api key
export const apiKey = "cd9016b160b14ba9369f021f176fa28e";

function convertUnixToLocalDatetime(dt, timezone) {
  // Adjust the UTC timestamp by adding the timezone offset.
  const localTimestamp = dt + timezone;
  // Create a Date object.
  return new Date(localTimestamp * 1000);
}

export const formatDate = (
  dt,
  timezone,
  onlyTime = false,
  onlyDate = false
) => {
  // Get the local Date object.
  const localDate = convertUnixToLocalDatetime(dt, timezone);

  // When formatting, we use the "UTC" timeZone option because our Date object
  // already represents the local time after adjusting for the API's timezone offset.
  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };

  if (onlyTime) {
    return localDate.toLocaleString("en-US", timeOptions);
  } else if (onlyDate) {
    return localDate.toLocaleString("en-US", dateOptions);
  } else {
    return (
      localDate.toLocaleString("en-US", dateOptions) +
      " | Local Time: " +
      localDate.toLocaleString("en-US", timeOptions)
    );
  }
};

// fetching weather icon with changing the url with icon code.
export const fetchWeatherIcon = (str) => {
  return `https://openweathermap.org/img/wn/${str}@2x.png`;
};

// formatting string
export const formatString = (key) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getOneDayForecast = (data) => {
  if (!data?.list?.length) return null;

  const firstDate = new Date(data.list[0].dt * 1000)
    .toISOString()
    .split("T")[0];

  // Find the first forecast entry for this date
  const forecast = data.list.find(
    (entry) =>
      new Date(entry.dt * 1000).toISOString().split("T")[0] === firstDate
  );

  return forecast || null;
};

export function getDailyFirstForecast(forecastList) {
  const dailyForecast = {};

  if (forecastList) {
    forecastList.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];

      if (!dailyForecast[date]) {
        dailyForecast[date] = entry;
      }
    });
  }

  return Object.values(dailyForecast);
}

// converting the temperature
export const convertTemperature = (value, unit) => {
  let result;

  if (unit === "F") {
    result = (value - 273.15) * (9 / 5) + 32;
  } else if (unit === "C") {
    result = value - 273.15;
  } else {
    return null;
  }

  return parseFloat(result.toFixed(2));
};
