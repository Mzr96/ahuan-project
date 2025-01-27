<script setup lang="ts">
import { isCustomerSignedUpInBroker } from "~/services/customerServices";

interface Props {
  dsCode: string;
}
const { dsCode } = defineProps<Props>();
const emits = defineEmits<{
  submit: [];
}>();

const isLoading = ref(false);
const { showSnackbar } = useSnackbar();
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const customerStateInBroker = await isCustomerSignedUpInBroker(dsCode);
    if (customerStateInBroker.isCustomer) emits("submit");
    else showSnackbar("نیاز به ایجاد حساب در کارگزاری", "warning");
  } catch (error: any) {
    showSnackbar(error.message, "warning");
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="h-100 d-flex flex-column px-6 py-4 justify-space-between">
    <div class="text-center">
      <VIcon icon=" mdi-alert-circle-outline mb-6" size="58" color="warning" />
      <p class="text-body-1 font-weight-bold mb-8">
        شما در کارگزاری سهم آشنا حساب کاربری ایجاد نکرده‌اید!
      </p>
      <p class="text-caption">
        لطفا بعد از ایجاد حساب کاربری برای نهایی سازی هدیه خود مجددا کارت هدیه
        را اسکن نمایید. ضمنا تکمیل فرایند ثبت نام در کارگزاری ممکن است تا ۱ روز
        کاری زمان ببرد.
      </p>
    </div>
    <div>
      <VBtn class="w-100 text-body-2 font-weight-thin mb-4"
        >ایجاد حساب کاربری</VBtn
      >
      <VBtn
        :loading="isLoading"
        @click="handleSubmit"
        class="w-100 text-body-2 font-weight-thin"
        variant="text"
        append-icon="mdi-refresh"
        >حساب ایجاد کردم، بررسی مجدد
      </VBtn>
    </div>
  </div>
</template>
