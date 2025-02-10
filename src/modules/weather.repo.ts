import axiosInstance from "./axiosInstance";

class WeatherRepository {
  async getWeatherByCity(city: string, lang: string = "EN") {
    return axiosInstance.get(`/city/${city}/${lang}`);
  }
}

export const weatherRepository = new WeatherRepository();
