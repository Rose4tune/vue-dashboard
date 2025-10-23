<template>
  <div class="widget-card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        오늘의 날씨
      </h2>
      <div
        v-if="loading"
        class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-8">
      <p class="text-red-500 text-sm mb-2">{{ error }}</p>
      <button
        @click="fetchWeather()"
        class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        다시 시도
      </button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading && !weather" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="text-gray-500 mt-2">날씨 정보를 불러오는 중...</p>
    </div>

    <!-- Weather Content -->
    <div v-else-if="weather" class="text-center py-4">
      <!-- Weather Icon -->
      <div class="mb-4">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`"
          :alt="weather.description"
          class="w-24 h-24 mx-auto"
        />
      </div>

      <!-- Temperature -->
      <div class="mb-4">
        <p class="text-5xl font-bold text-gray-900 dark:text-gray-100">
          {{ weather.temperature }}°C
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          체감 온도 {{ weather.feelsLike }}°C
        </p>
      </div>

      <!-- Description -->
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-4 capitalize">
        {{ weather.description }}
      </p>

      <!-- Additional Info -->
      <div
        class="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400"
      >
        <div class="flex items-center space-x-1">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <span>습도 {{ weather.humidity }}%</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <span>바람 {{ weather.windSpeed }}m/s</span>
        </div>
      </div>

      <!-- City Name -->
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">
        {{ weather.city }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();

const { data: weather, error, pending: loading } = await useAsyncData(
  'weather',
  async () => {
    const apiKey = config.public.weatherApiKey;

    if (!apiKey) {
      throw new Error('Weather API key is not configured');
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.978&appid=${apiKey}&units=metric&lang=kr`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  }
);

const fetchWeather = async () => {
  await refreshNuxtData('weather');
};
</script>
