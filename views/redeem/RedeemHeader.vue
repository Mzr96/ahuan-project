<template>
  <div class="bg-primary-lighten-1 d-flex flex-column py-2">
    <VImg width="120" class="mx-auto" :src="tenantStore.tenant?.logo" />
    <VImg
      style="filter: grayscale(100)"
      width="230"
      class="mx-auto pt-10"
      src="/public/images/gift.png"
    />
    <p class="text-center text-primary font-weight-bold">
      کارت هدیه {{ tenantStore.tenant?.name }}
    </p>
  </div>
</template>
<script setup lang="ts">
const tenantStore = useTenantStore();
</script>
