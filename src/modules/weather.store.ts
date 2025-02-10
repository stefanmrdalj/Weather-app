import { makeAutoObservable } from "mobx";
import { weatherService } from "./weather.service";
import { WeatherData } from "./weather.type";

class WeatherStore {
  weatherData: WeatherData | null = null;
  error: string | null = null;
  selectedCity: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCity(city: string) {
    this.selectedCity = city;
  }

  setError(message: string) {
    this.error = message;
  }

  async getWeatherByCity() {
    if (!this.selectedCity.trim()) {
      this.setError("Please enter a city.");
      return;
    }

    this.error = null;

    const data = await weatherService.getWeatherByCity(this.selectedCity);
    if (typeof data === "string") {
      this.setError(data);
    } else {
      this.weatherData = data;
    }
  }
}

export const weatherStore = new WeatherStore();
