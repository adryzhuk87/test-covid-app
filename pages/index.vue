<script setup lang="ts">
definePageMeta({
  title: 'Covid19 Statistics page',
});
const store = useCovidDataStore();
store.fetch();
</script>
<template>
  <CovidDataTable :list="store.list" @delete-item="store.removeItemById" />
</template>
