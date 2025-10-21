import { useWeatherStore } from "~/stores/weatherStore";

export const useWeather = () => {
  const store = useWeatherStore();

  return {
    weather: store.weather,
    loading: store.loading,
    error: store.error,
    fetchWeather: store.fetchWeather,
  };
};
