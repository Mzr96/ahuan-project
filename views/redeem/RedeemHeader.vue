<template>
  <div class="bg-primary-lighten-1 d-flex flex-column py-2">
    <VImg width="120" class="mx-auto" :src="tenant?.logo" />
    <VImg
      style="filter: grayscale(100)"
      width="230"
      class="mx-auto pt-10"
      src="/public/images/gift.png"
    />
    <p class="text-center text-primary font-weight-bold">
      کارت هدیه {{ tenant?.name }}
    </p>
  </div>
</template>
<script setup lang="ts">
import LocalStorageService from "~/helpers/localStorageService";
import { TenantSchema } from "~/utils/validation/tenantSchema";

const tenant = LocalStorageService.getItem("tenant", TenantSchema);
</script>
