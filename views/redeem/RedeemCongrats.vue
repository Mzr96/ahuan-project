<template>
  <div
    class="bg-primary-lighten-1 pb-0 d-flex flex-column"
    style="height: 100vh"
  >
    <div class="d-flex flex-column py-1">
      <VImg width="120" class="mx-auto" :src="tenantStore.tenant?.logo" />
      <div class="pt-10 position-relative">
        <DotLottieVue
          class="congrats-background"
          autoplay
          loop
          :speed="1.5"
          src="https://lottie.host/ef7ee59f-b979-43b8-a3ca-09ab8f6f611a/ZwGBUqqbBe.lottie"
        />
        <VImg width="250" class="mx-auto" src="/public/images/gift.png" />
      </div>
      <p class="text-center text-primary font-weight-bold">
        کارت هدیه {{ tenantStore.tenant?.name }}
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
        در صورت نیاز به پشتیبانی با شماره
        {{ tenantStore.tenant?.phoneNumber }} تماس بگیرید.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false,
});
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
const tenantStore = useTenantStore();
</script>
<style>
.congrats-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
}
</style>
