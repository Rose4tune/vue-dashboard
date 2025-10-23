<template>
  <div class="widget-card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
        할 일 목록
      </h2>
      <div
        v-if="loading"
        class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-red-500 text-sm mb-4">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="loading && todos.length === 0" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="text-gray-500 mt-2">할 일을 불러오는 중...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="todos.length === 0" class="text-center py-8">
      <p class="text-gray-500">할 일이 없습니다.</p>
    </div>

    <!-- Todo List -->
    <div v-else class="space-y-3">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
      >
        <input
          :id="`todo-${todo.id}`"
          type="checkbox"
          :checked="todo.done"
          @change="toggleTodo(todo)"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          :for="`todo-${todo.id}`"
          :class="[
            'flex-1 text-sm text-left',
            todo.done
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-900 dark:text-gray-100'
          ]"
        >
          {{ todo.text }}
        </label>
        <button
          @click="removeTodo(todo.id)"
          class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="삭제"
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Add Todo Form -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
      <form @submit.prevent="addTodo" class="flex space-x-2">
        <input
          v-model="newTodoText"
          type="text"
          placeholder="새 할 일을 입력하세요..."
          class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading"
        />
        <button
          type="submit"
          :disabled="!newTodoText.trim() || loading"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          추가
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '~/types';

const newTodoText = ref("");
const { data: todos, error, pending: loading } = await useAsyncData<Todo[]>(
  'todos',
  async () => {
    const { $supabase } = useNuxtApp();
    const { data, error: fetchError } = await $supabase
      .from("todos")
      .select("*")
      .order("order", { ascending: true });

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    return data || [];
  },
  {
    default: () => []
  }
);

const fetchTodos = async () => {
  await refreshNuxtData('todos');
};

const createTodo = async (input: { text: string; done: boolean; order: number }) => {
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

    await fetchTodos();
    return data;
  } catch (err) {
    console.error("Error creating todo:", err);
    throw err;
  }
};

const updateTodo = async (id: string, updates: any) => {
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

    await fetchTodos();
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

    await fetchTodos();
  } catch (err) {
    console.error("Error deleting todo:", err);
    throw err;
  }
};

const addTodo = async () => {
  if (!newTodoText.value.trim()) return;

  try {
    await createTodo({
      text: newTodoText.value.trim(),
      done: false,
      order: todos.value.length,
    });
    newTodoText.value = "";
  } catch (err) {
    console.error("Failed to add todo:", err);
  }
};

const toggleTodo = async (todo: any) => {
  try {
    await updateTodo(todo.id, { done: !todo.done });
  } catch (err) {
    console.error("Failed to toggle todo:", err);
  }
};

const removeTodo = async (id: string) => {
  try {
    await deleteTodo(id);
  } catch (err) {
    console.error("Failed to remove todo:", err);
  }
};
</script>
