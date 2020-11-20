import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState({});
  const api_key = process.env.REACT_APP_WEATHER_KEY;
  let weatherApiUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`;

  useEffect(() => {
    axios.get(weatherApiUrl).then((res) => {
      console.log(res.data.current);
      setWeatherInfo(res.data.current);
    });
  }, [weatherApiUrl]);

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>
        <b>temperateure:</b> {weatherInfo.temperature} Celcius
      </p>
      <img src={weatherInfo.weather_icons} alt="Weather" width="10%" />
      <p>
        <b>wind:</b> {weatherInfo.wind_speed} mph direction{" "}
        {weatherInfo.wind_dir}
      </p>
    </>
  );
};

export default Weather;
