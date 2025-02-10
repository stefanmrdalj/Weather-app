import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://open-weather13.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "c895d63b41msh926355b6266be6bp10ea48jsneec866051ed5",
    "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
  },
});

export default axiosInstance;
