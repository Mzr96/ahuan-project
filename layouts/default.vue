<script setup lang="ts">
import RabinSnackbar from "~/components/RabinSnackbar.vue";
import { useSnackbar } from "~/composables/useSnackbar";

const { message, selectedType, isVisible } = useSnackbar();
</script>
<template>
  <main class="bg-grey-lighten-4 h-100">
    <slot />
    <RabinSnackbar v-model="isVisible" :type="selectedType" :message />
  </main>
</template>
