<template>
  <div class="bg-primary-lighten-1 h-100 d-flex flex-column overflow-hidden">
    <div class="d-flex flex-column py-1">
      <VImg width="120" class="mx-auto" :src="tenantStore.tenant?.logo" />
      <div class="pt-10 position-relative">
        <DotLottieVue
          class="congrats-background"
          autoplay
          loop
          :speed="1.3"
          src="/images/congratsGif.lottie"
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
          داخل حساب کاربری شما در {{ tenantStore.tenant?.name }} اضافه خواهد شد.
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
  layout: "without-footer",
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
  height: auto;
  transform: scale(1.5);
  transform-origin: center center;
  z-index: 0;
}
</style>
