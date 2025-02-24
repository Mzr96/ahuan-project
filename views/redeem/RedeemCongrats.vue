<template>
  <div class="bg-primary-lighten-1 d-flex flex-column py-1">
    <VImg width="120" class="mx-auto" :src="tenant?.logo" />
    <VImg width="250" class="mx-auto pt-10" src="/public/images/gift.png" />
    <p class="text-center text-primary font-weight-bold">
      کارت هدیه {{ tenant?.name }}
    </p>
  </div>
  <div
    class="bg-primary-lighten-1 text-center d-flex flex-column flex-grow-1 py-4"
  >
    <div class="flex-grow-1 mx-6">
      <h3 class="text-primary text-h4 font-weight-bold py-6">مبارک باشه!</h3>
      <p class="text-body-1">
        هدیه شما با موفقیت براتون ثبت شد. نماد انتخابی شما طی ۲ روز کاری آینده
        داخل حساب کاربری شما در کارگزاری سهم آشنا اضافه خواهد شد.
      </p>
    </div>
    <p class="text-caption">
      در صورت نیاز به پشتیبانی با شماره {{ tenant?.phoneNumber }} تماس بگیرید.
    </p>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false,
});
import LocalStorageService from "~/helpers/localStorageService";
import { TenantSchema } from "~/utils/validation/tenantSchema";

const tenant = LocalStorageService.getItem("tenant", TenantSchema);
</script>
