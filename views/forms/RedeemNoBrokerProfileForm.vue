<script setup lang="ts">
const emits = defineEmits<{
  submit: [];
}>();

const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  await sleep(1112);
  emits("submit");
};
</script>
<template>
  <VRow justify="center" class="mx-2">
    <VCol class="text-center" :cols="12">
      <VIcon icon=" mdi-alert-circle-outline" size="58" color="error" />
    </VCol>
    <VCol class="text-center text-body-2" :cols="12">
      <p>شما در کارگزاری سهم آشنا حساب کاربری ایجاد نکرده‌اید!</p>
    </VCol>
    <VCol class="text-center text-caption" :cols="12">
      <p>
        لطفا بعد از ایجاد حساب کاربری برای نهایی سازی هدیه خود مجددا کارت هدیه
        را اسکن نمایید. ضمنا تکمیل فرایند ثبت نام در کارگزاری ممکن است تا ۱ روز
        کاری زمان ببرد.
      </p>
    </VCol>
  </VRow>
  <VCol class="position-absolute bottom-0 px-0">
    <VCol :cols="12">
      <VBtn class="w-100 text-body-2 font-weight-thin">ایجاد حساب کاربری</VBtn>
    </VCol>
    <VCol :cols="12" class="pb-0">
      <VBtn
        :loading="isLoading"
        @click="handleSubmit"
        class="w-100 text-body-2 font-weight-thin"
        variant="text"
        append-icon="mdi-refresh"
        >حساب ایجاد کردم، بررسی مجدد
      </VBtn>
    </VCol>
  </VCol>
</template>
