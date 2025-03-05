<template>
  <VApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>
<script setup lang="ts">
import { useTheme } from "vuetify";

useHead({ title: "کارت هدیه" });

const router = useRouter();
const theme = useTheme();
const tenantStore = useTenantStore();

if (!tenantStore.tenant) router.push("/down-time");

theme.themes.value.light.colors = {
  ...theme.themes.value.light.colors,
  ...tenantStore.tenant?.colors,
};
</script>
