<script setup lang="ts">
import { VSnackbar } from "vuetify/components";

interface Props {
  message: string;
  type?: "error" | "success" | "warning" | "info" | "default";
  timeout?: number;
}

const { type = "default", timeout = 5000, message } = defineProps<Props>();

const model = defineModel<boolean>();

const messageIcon = () => {
  switch (type) {
    case "success":
      return "mdi-check-circle-outline";
    case "error":
      return "mdi-close-circle-outline";
    case "warning":
      return "mdi-alert-circle-outline";
    case "info":
      return "mdi-information-outline";
    case "default":
      return "mdi-minus-circle-outline";
  }
};
</script>

<template>
  <VSnackbar
    v-model="model"
    :color="type"
    :timeout
    location="bottom left"
    close-on-content-click
    variant="flat"
    rounded="lg"
    :max-width="100"
    class="cursor-pointer"
  >
    <VIcon class="ml-2">{{ messageIcon() }}</VIcon>
    {{ message }}
  </VSnackbar>
</template>
