import { defineStore } from "pinia";
import type { Quote } from "~/types";

export const useQuoteStore = defineStore("quote", () => {
  const quote = ref<Quote | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchQuote = async () => {
    loading.value = true;
    error.value = null;

    try {
      // 한국어 명언 API 사용
      const response = await fetch(
        "https://korean-advice-open-api.vercel.app/api/advice"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch quote: ${response.statusText}`);
      }

      const data = await response.json();

      quote.value = {
        message: data.message,
        author: data.author,
        authorProfile: data.authorProfile,
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch quote";
      console.error("Error fetching quote:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    quote: readonly(quote),
    loading: readonly(loading),
    error: readonly(error),
    fetchQuote,
  };
});
