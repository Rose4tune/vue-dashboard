import { useQuoteStore } from "~/stores/quoteStore";

export const useQuote = () => {
  const store = useQuoteStore();

  return {
    quote: store.quote,
    loading: store.loading,
    error: store.error,
    fetchQuote: store.fetchQuote,
  };
};
