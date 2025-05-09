<template>
  <VApp>
    <NuxtLayout>
      <NuxtPage />
      <TheSnackbar v-model="isVisible" :type="selectedType" :message />
    </NuxtLayout>
  </VApp>
</template>
<script setup lang="ts">
import TheSnackbar from "~/components/TheSnackbar.vue";
import { useSnackbar } from "~/composables/useSnackbar";
const { message, selectedType, isVisible } = useSnackbar();

useHead({ title: "پروژه ارزیابی" });
</script>
