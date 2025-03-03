<script setup lang="ts">
import { isCustomerSignedUpInBroker } from "~/services/customerServices";

interface Props {
  dsCode: string;
}
const { dsCode } = defineProps<Props>();
const emits = defineEmits<{
  submit: [];
}>();

const tenantStore = useTenantStore();

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
        شما در {{ tenantStore.tenant?.name }} حساب کاربری ایجاد نکرده‌اید!
      </p>
      <p class="text-caption">
        لطفا بعد از ایجاد حساب کاربری برای نهایی سازی هدیه خود مجددا کارت هدیه
        را اسکن نمایید. ضمنا تکمیل فرایند ثبت نام در کارگزاری ممکن است تا ۱ روز
        کاری زمان ببرد.
      </p>
      <p class="mt-8">
        <NuxtLink
          class="text-primary"
          :href="tenantStore.tenant?.registerLink"
          external
          >ایجاد حساب کاربری</NuxtLink
        >
      </p>
    </div>
    <div class="bottom_nav">
      <VCol>
        <VBtn
          :loading="isLoading"
          class="w-100 text-body-2 font-weight-thin"
          append-icon="mdi-refresh"
          @click="handleSubmit"
          >حساب ایجاد کردم، بررسی مجدد
        </VBtn>
      </VCol>
    </div>
  </div>
</template>
