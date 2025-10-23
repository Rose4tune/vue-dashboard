import { storeToRefs } from "pinia";
import { useTodoStore } from "~/stores/todoStore";
import type { TodoInput, Todo } from "~/types";

/**
 * Todo 관리를 위한 Composable
 * TodoStore를 wrapping하여 컴포넌트에서 사용하기 쉽게 제공
 */
export const useTodos = () => {
  const store = useTodoStore();

  // State를 reactive하게 유지
  const { todos, loading, error } = storeToRefs(store);

  // Actions는 직접 노출
  const fetchTodos = () => store.fetchTodos();
  const createTodo = (input: TodoInput) => store.createTodo(input);
  const updateTodo = (id: string, updates: Partial<TodoInput>) =>
    store.updateTodo(id, updates);
  const deleteTodo = (id: string) => store.deleteTodo(id);
  const toggleTodo = (todo: Todo) => store.toggleTodo(todo);

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
};
