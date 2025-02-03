# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- Project Setup -->

1. Created a React app using Vite.
2. Installed packages such as React Redux Toolkit and SWR.
3. Added Bootstrap CDN links in the index.html file (including CSS, JavaScript, and Bootstrap icons).
4. Set up the application with React Redux Toolkit.
5. Designed wireframes for the website.
6. Created different components for searching for a city, toggling temperature units, and displaying the current weather and 5 days forecast using demo data.
7. Stored latitude, longitude, city name, and country name in local storage.
8. Implemented API fetching and error handling
9. Updated the weather report for every 30seconds using setInterval.

<!-- Note  -->

---To forecast the weather for five days, a subscription is typically required. However, I used a free API that provides a five-day forecast with a three-hour interval for each day. I extracted the first temperature reading for each day to represent the daily weather report. This API only gives forecasts for five days, including today’s weather. Therefore, I display the weather report for the next four days.

<!-- Usage -->

1. In the search input, enter any city name (e.g., Chennai, London) and click the search icon.
2. If the searched city exists and data is available, it will be displayed. If the city does not exist, a message will appear on the snackbar.
3. The first section consists of the current weather, while the second section provides a 5-day weather forecast.
4. The default temperature is shown in Fahrenheit. After the search bar, there will be two buttons to convert the temperature to Fahrenheit or Celsius.
5. If any errors occur while using the application, they will be displayed on the screen.

<!-- app hosted link -->

https://balajisaitangellamudi.github.io/weather
