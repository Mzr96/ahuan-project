<script setup lang="ts">
import { VForm, VOtpInput } from "vuetify/components";
import { verifyOtp } from "~/services/authenticationServices";

const emits = defineEmits<{
  submit: [otp: string];
  previousStep: [];
}>();

const props = defineProps<{
  mobileNumber: string;
  nationalCode: string;
}>();

const form = ref<VForm>();
const otp = ref("");
const isLoading = ref(false);

const { clockFormat, timer } = useTimer(120);
const { showSnackbar } = useSnackbar();
watch(otp, (newVal) => newVal.length === 6 && handleSubmit());

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // form validation
    const formResult = await form.value?.validate();
    if (!formResult?.valid) return;

    const loginData = await verifyOtp(
      props.mobileNumber,
      props.nationalCode,
      otp.value
    );
    // Store token in cookie
    const accessToken = useCookie("accessToken");
    accessToken.value = loginData.accessToken;

    emits("submit", otp.value);
  } catch (error: any) {
    console.error(error);
    showSnackbar(error.message, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <VForm
    ref="form"
    class="h-100 d-flex flex-column px-3 pt-1 justify-space-between"
    @submit.prevent="handleSubmit"
  >
    <div class="w-100">
      <VCol :cols="12" class="text-center pb-0">
        <p class="text-body-1 font-weight-semibold">
          کد 6 رقمی به شماره همراه <span>{{ mobileNumber }}</span> ارسال شد.
        </p>
        <VBtn
          variant="text"
          density="compact"
          class="text-body-1 text-decoration-underline"
          @click="$emit('previousStep')"
        >
          تغیر شماره موبایل
        </VBtn>
      </VCol>
      <VCol :cols="12" class="pt-0">
        <VOtpInput
          v-model="otp"
          :loading="isLoading"
          dir="ltr"
          :length="6"
          base-color="primary"
        />
      </VCol>
      <VCol :cols="12">
        <div
          v-if="timer > 0"
          class="font-weight-black text-h5 d-flex justify-space-around"
        >
          {{ clockFormat }}
        </div>
        <div v-else class="text-center">
          <VBtn
            variant="text"
            density="compact"
            class="text-caption font-weight-black text-decoration-underline"
            @click="$emit('previousStep')"
          >
            بازگشت به مرحله قبل
          </VBtn>
        </div>
      </VCol>
    </div>
    <div>
      <VCol :cols="12" class="d-flex">
        <VBtn
          :disabled="isLoading || otp.length !== 6"
          text="مرحله بعد"
          type="submit"
          class="w-100 text-body-2 font-weight-thin align-self-end"
        />
      </VCol>
    </div>
  </VForm>
</template>
