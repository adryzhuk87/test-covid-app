<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
const covidDataStore = useCovidDataStore();
covidDataStore.fetchCovidData();
const deleteClickHandler = id => {
  covidDataStore.removeItemById(id);
};
</script>
<template>
  <CovidDataTable
    :list="covidDataStore.list"
    @delete-click="deleteClickHandler"
  />
</template>
