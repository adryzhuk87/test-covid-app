<script setup lang="ts">
const store = useCovidDataStore();
store.fetch();
</script>
<template>
  <CovidDataTable :list="store.list" @delete-item="store.removeItemById" />
</template>
