<template>
  <div class="widget-card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        오늘의 명언
      </h2>
      <div
        v-if="loading"
        class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-8">
      <p class="text-red-500 text-sm mb-2">{{ error.message }}</p>
      <button
        @click="fetchQuote()"
        class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        다시 시도
      </button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading && !quote" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="text-gray-500 mt-2">명언을 불러오는 중...</p>
    </div>

    <!-- Quote Data -->
    <div v-else-if="quote" class="text-center py-6">
      <!-- Opening Quote Icon -->
      <div class="mb-4">
        <svg
          class="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      </div>

      <!-- Quote Message -->
      <blockquote
        class="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 italic mb-4 px-4"
      >
        {{ quote.message }}
      </blockquote>

      <!-- Closing Quote Icon -->
      <div class="mb-4">
        <svg
          class="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400 transform rotate-180"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      </div>

      <!-- Quote Author -->
      <div class="text-center">
        <p
          class="text-base text-gray-800 dark:text-gray-200 font-semibold mb-1"
        >
          — {{ quote.author || 'Unknown' }}
        </p>
        <p
          v-if="quote.authorProfile"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ quote.authorProfile }}
        </p>
      </div>

      <!-- Refresh Button -->
      <button
        @click="fetchQuote()"
        :disabled="loading"
        class="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        <span v-if="loading">불러오는 중...</span>
        <span v-else>새로운 명언</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: quote, error, pending: loading } = await useAsyncData(
  'quote',
  async () => {
    const response = await fetch('https://korean-advice-open-api.vercel.app/api/advice');

    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      message: data.message,
      author: data.author,
      authorProfile: data.authorProfile,
    };
  }
);

const fetchQuote = async () => {
  await refreshNuxtData('quote');
};
</script>
