<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/20/solid';
const store = useCovidDataStore();

const refreshData = () => {
  store.fetch(true);
};
</script>

<template>
  <Html class="h-full bg-gray-100" />
  <Body class="h-full" />
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex items-center justify-between">
          <div class="min-w-0 flex-1">
            <h2
              class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
            >
              Covid19 Statistics
            </h2>
          </div>
          <button
            type="button"
            @click="refreshData"
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <CheckIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div
          class="h-full rounded-lg border-2 border-dashed border-gray-200 p-4"
        >
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
