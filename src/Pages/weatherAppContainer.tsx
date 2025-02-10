import { useState } from "react";
import "../styles/weatherAppContainer.scss";
import { weatherStore } from "../modules/weather.store";
import { observer } from "mobx-react-lite";
import { FaMagnifyingGlass } from "react-icons/fa6";
import cloudsImage from "../images/cloud.png";
import sunnyImage from "../images/sun.png";
import snowImage from "../images/snow.png";
import fogImage from "../images/fog.png";

const WeatherAppContainer = observer(() => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") {
      weatherStore.setError("Please select a city");
      return;
    }

    weatherStore.setCity(city);
    weatherStore.getWeatherByCity();
  };

  const convertToCelsius = (tempF: number) => {
    return ((tempF - 32) * 5) / 9;
  };

  const getWeatherImage = (description: string) => {
    if (description.includes("cloud")) {
      return <img src={cloudsImage} alt="clouds" />;
    }
    if (description.includes("clear")) {
      return <img src={sunnyImage} alt="sunny" />;
    }

    if (description.includes("snow")) {
      return <img src={snowImage} alt="snow" />;
    }

    if (description.includes("fog")) {
      return <img src={fogImage} alt="mist" />;
    }

    return null;
  };

  const weatherDescription =
    weatherStore.weatherData?.weather?.[0]?.description;

  return (
    <div className="container">
      <div className="app-title">
        <h1>Weather app</h1>
      </div>
      <div className="app-search">
        <input
          type="text"
          placeholder="Search for a City"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaMagnifyingGlass />
        </button>
      </div>
      {weatherDescription && (
        <div className="app-image">
          {getWeatherImage(weatherDescription.toLowerCase())}
        </div>
      )}
      <div className="app-location">
        <p>
          {weatherStore.weatherData?.name}{" "}
          {weatherStore.weatherData?.sys.country}
        </p>
      </div>
      <div className="app-temperature">
        {weatherStore.weatherData?.main.temp && (
          <>
            <p>
              {convertToCelsius(weatherStore.weatherData?.main?.temp).toFixed(
                1
              )}
              °C
            </p>
            <p>
              Feels like{" "}
              {convertToCelsius(
                weatherStore.weatherData.main.feels_like
              ).toFixed(1)}
              °C
            </p>
          </>
        )}
      </div>
      <div className="app-condition">
        <p>{weatherStore.weatherData?.weather?.[0]?.description}</p>
      </div>
    </div>
  );
});

export default WeatherAppContainer;
