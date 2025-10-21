import { defineStore } from "pinia";
import type { WeatherData } from "~/types";

export const useWeatherStore = defineStore("weather", () => {
  const weather = ref<WeatherData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchWeather = async (lat: number = 37.5665, lon: number = 126.978) => {
    loading.value = true;
    error.value = null;

    try {
      const config = useRuntimeConfig();
      const apiKey = config.public.weatherApiKey;

      if (!apiKey) {
        throw new Error("Weather API key is not configured");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();

      weather.value = {
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch weather";
      console.error("Error fetching weather:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    weather,
    loading,
    error,
    fetchWeather,
  };
});
