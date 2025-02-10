import { weatherRepository } from "./weather.repo";
import to from "await-to-js";

class WeatherService {
  async getWeatherByCity(city: string, lang: string = "EN") {
    const [err, res] = await to(weatherRepository.getWeatherByCity(city, lang));

    console.log(res?.data);

    if (err) {
      console.error(`Error fetching forecast for ${city}. Error:${err}`);
      return `Error fetching forecast for ${city}.`;
    }

    return res?.data || null;
  }
}

export const weatherService = new WeatherService();
