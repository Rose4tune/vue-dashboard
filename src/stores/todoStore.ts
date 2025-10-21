import { defineStore } from "pinia";
import type { Todo } from "~/types";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTodos = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { $supabase } = useNuxtApp();
      const { data, error: fetchError } = await $supabase
        .from("todos")
        .select("*")
        .order("order", { ascending: true });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      todos.value = data || [];
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch todos";
      console.error("Error fetching todos:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
  };
});
