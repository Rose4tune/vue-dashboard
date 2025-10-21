import type { TodoInput } from "~/types";

export const useTodos = () => {
  const store = useTodoStore();

  const createTodo = async (input: TodoInput) => {
    try {
      const { $supabase } = useNuxtApp();
      const { data, error } = await $supabase
        .from("todos")
        .insert([input])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      await store.fetchTodos();
      return data;
    } catch (err) {
      console.error("Error creating todo:", err);
      throw err;
    }
  };

  const updateTodo = async (id: string, updates: Partial<TodoInput>) => {
    try {
      const { $supabase } = useNuxtApp();
      const { data, error } = await $supabase
        .from("todos")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      await store.fetchTodos();
      return data;
    } catch (err) {
      console.error("Error updating todo:", err);
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { $supabase } = useNuxtApp();
      const { error } = await $supabase.from("todos").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      await store.fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
      throw err;
    }
  };

  return {
    todos: store.todos,
    loading: store.loading,
    error: store.error,
    fetchTodos: store.fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
