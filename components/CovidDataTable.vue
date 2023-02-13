<script setup lang="ts">
import { CheckIcon, TrashIcon } from '@heroicons/vue/20/solid';
const props = defineProps({
  list: [],
});

const emits = defineEmits(['deleteClick']);
</script>

<template>
  <table class="border-collapse table-auto w-full text-sm">
    <thead>
      <tr>
        <th class="font-bold p-4 border-b-2 border-slate-400">Date</th>
        <th class="font-bold p-4 border-b-2 border-slate-400">
          Confirmed diff
        </th>
        <th class="font-bold p-4 border-b-2 border-slate-400">Deaths diff</th>
        <th class="font-bold p-4 border-b-2 border-slate-400">Active diff</th>
        <th class="font-bold p-4 border-b-2 border-slate-400"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td class="text-center font-medium p-2 border-b-2 border-slate-300">
          {{ item.date }}
        </td>
        <td class="text-center font-medium p-2 border-b-2 border-slate-300">
          {{ item.confirmed_diff }}
        </td>
        <td class="text-center font-medium p-2 border-b-2 border-slate-300">
          {{ item.deaths_diff }}
        </td>
        <td class="text-center font-medium p-2 border-b-2 border-slate-300">
          {{ item.active_diff }}
        </td>
        <td
          class="text-center font-medium p-2 border-b-2 border-slate-300 flex items-center justify-center"
        >
          <button
            @click="$emit('deleteClick', item.id)"
            type="button"
            class="inline-flex items-center rounded-md border border-transparent bg-red-600 p-2 m-0 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <TrashIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
