<script setup lang="ts">
import { RegistertionState } from "~/enums/registerationState";
import { isCustomerSignedUpInBroker } from "~/services/customerServices";

interface Props {
  dsCode: string;
  registerationState: RegistertionState;
}
const { dsCode, registerationState } = defineProps<Props>();
const emits = defineEmits<{
  submit: [];
}>();

const tenantStore = useTenantStore();
const { showSnackbar } = useSnackbar();

const isLoading = ref(false);
const errorMessage = reactive({
  title: "",
  desc: "",
  link: "",
  linkTitle: "",
});

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const customerStateInBroker = await isCustomerSignedUpInBroker(dsCode);
    if (
      customerStateInBroker.customerRegistrationStatus ===
      RegistertionState.Registered
    )
      emits("submit");
    else showSnackbar("نیاز به ایجاد حساب در کارگزاری", "warning");
  } catch (error: any) {
    showSnackbar(error.message, "warning");
  } finally {
    isLoading.value = false;
  }
};

const fillErrorMessage = () => {
  if (registerationState === RegistertionState.NotRegistered) {
    errorMessage.title = `شما در ${tenantStore.tenant?.name} حساب کاربری ایجاد نکرده‌اید!`;
    errorMessage.desc = `لطفا بعد از ایجاد حساب کاربری برای نهایی سازی هدیه خود مجددا کارت هدیه
        را اسکن نمایید. ضمنا تکمیل فرایند ثبت‌نام در کارگزاری ممکن است تا ۱ روز
        کاری زمان ببرد.`;
    errorMessage.link = tenantStore.tenant?.registerLink || "";
    errorMessage.linkTitle = "ایجاد حساب کاربری";
  } else if (registerationState === RegistertionState.PendToConfirmContract) {
    errorMessage.title = `شما هنوز قرارداد آنلاین کارگزاری را امضا نکرده‌اید!`;
    errorMessage.desc = `ثبت نام شما با موفقیت انجام شده است و
     در این مرحله باید داخل سامانه آنلاین کارگزاری وارد شده و قراردادها را
      امضا نمایید. نام کاربری و رمز عبور سامانه برای شما پیامک شده است. `;
    errorMessage.link = tenantStore.tenant?.onlineWebsite || "";
    errorMessage.linkTitle = "سامانه آنلاین کارگزاری";
  } else if (registerationState === RegistertionState.PendForSiteUser) {
    errorMessage.title = `ثبت‌نام شما کامل انجام نشده است`;
    errorMessage.desc = `ثبت‌نام شما با موفقیت انجام شده است 
     است اما برای فعالسازی کارت هدیه لطفا با پشتیبانی کارگزاری تماس گرفته و درخواست فعال شدن «کاربری سایت» را بدهید.`;
    errorMessage.link = `tel:${tenantStore.tenant?.phoneNumber}`;
    errorMessage.linkTitle = "تماس با پشتیبانی کارگزاری";
  }
};

onMounted(() => fillErrorMessage());
</script>
<template>
  <div class="h-100 d-flex flex-column px-6 py-4 justify-space-between">
    <div class="text-center">
      <VIcon icon=" mdi-alert-circle-outline mb-6" size="58" color="warning" />
      <p class="text-body-1 font-weight-bold mb-8">{{ errorMessage.title }}</p>
      <p class="text-caption">{{ errorMessage.desc }}</p>
      <p class="mt-8">
        <NuxtLink class="text-primary" :href="errorMessage.link" external>{{
          errorMessage.linkTitle
        }}</NuxtLink>
      </p>
    </div>
    <div class="bottom_nav">
      <VCol>
        <VBtn
          :loading="isLoading"
          class="w-100 text-body-2 font-weight-thin"
          append-icon="mdi-refresh"
          @click="handleSubmit"
          >بررسی مجدد
        </VBtn>
      </VCol>
    </div>
  </div>
</template>
