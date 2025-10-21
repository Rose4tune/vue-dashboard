<template>
  <div class="container max-w-[1000px] mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        개인 대시보드
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ new Date().toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        }) }}
      </p>
    </header>

    <!-- Main Content -->
    <main class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Weather Widget Placeholder -->
      <div class="widget-card">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          오늘의 날씨
        </h2>
        <div class="text-center py-8">
          <p class="text-gray-500">날씨 위젯 준비 중...</p>
        </div>
      </div>

      <!-- Quote Widget Placeholder -->
      <div class="widget-card">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          랜덤 명언
        </h2>
        <div class="text-center py-8">
          <p class="text-gray-500">명언 위젯 준비 중...</p>
        </div>
      </div>

      <!-- Todo Widget -->
      <div class="lg:col-span-2">
        <TodoWidget />
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-12 text-center">
      <p class="text-gray-500 text-sm">Made with ❤️ using Nuxt 3</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Page setup
</script>
