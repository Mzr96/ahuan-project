<template>
  <VApp>
    <NuxtLayout>
      <NuxtPage />
      <RabinSnackbar v-model="isVisible" :type="selectedType" :message />
    </NuxtLayout>
  </VApp>
</template>
<script setup lang="ts">
import { useTheme } from "vuetify";
import RabinSnackbar from "~/components/RabinSnackbar.vue";
import { useSnackbar } from "~/composables/useSnackbar";
const { message, selectedType, isVisible } = useSnackbar();

useHead({ title: "کارت هدیه" });

const theme = useTheme();
const tenantStore = useTenantStore();

if (!tenantStore.tenant) navigateTo("/down-time");

theme.themes.value.light.colors = {
  ...theme.themes.value.light.colors,
  ...tenantStore.tenant?.colors,
};
</script>
