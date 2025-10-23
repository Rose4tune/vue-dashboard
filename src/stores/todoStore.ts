import { defineStore } from "pinia";
import type { Todo, TodoInput } from "~/types";

export const useTodoStore = defineStore("todo", () => {
  // State
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Actions
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

  const createTodo = async (input: TodoInput) => {
    loading.value = true;
    error.value = null;

    try {
      const { $supabase } = useNuxtApp();
      const { data, error: createError } = await $supabase
        .from("todos")
        .insert([input])
        .select()
        .single();

      if (createError) {
        throw new Error(createError.message);
      }

      // 목록 다시 불러오기
      await fetchTodos();
      return data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to create todo";
      console.error("Error creating todo:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateTodo = async (id: string, updates: Partial<TodoInput>) => {
    loading.value = true;
    error.value = null;

    try {
      const { $supabase } = useNuxtApp();
      const { data, error: updateError } = await $supabase
        .from("todos")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      // 목록 다시 불러오기
      await fetchTodos();
      return data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to update todo";
      console.error("Error updating todo:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteTodo = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { $supabase } = useNuxtApp();
      const { error: deleteError } = await $supabase
        .from("todos")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      // 목록 다시 불러오기
      await fetchTodos();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete todo";
      console.error("Error deleting todo:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const toggleTodo = async (todo: Todo) => {
    return updateTodo(todo.id, { done: !todo.done });
  };

  return {
    // State
    todos,
    loading,
    error,
    // Actions
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
});
