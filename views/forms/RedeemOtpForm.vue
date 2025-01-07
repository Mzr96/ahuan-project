<script setup lang="ts">
import { VForm, VOtpInput } from "vuetify/components";

const emits = defineEmits<{
  submit: [otp: string];
  previousStep: [];
}>();

const props = defineProps<{
  mobileNumber: string;
  nationalCode: string;
}>();

const { clockFormat, timer, restart } = useTimer(30);
const form = ref<VForm>();
const otp = ref("");
const isLoading = ref(false);
const handleSubmit = async () => {
  const formResult = await form.value?.validate();
  if (!formResult?.valid) return;
  isLoading.value = true;
  await sleep(1500);
  isLoading.value = false;
  emits("submit", otp.value);
};

watch(otp, (newVal) => newVal.length === 6 && handleSubmit());
</script>

<template>
  <VCol>
    <p class="text-body-2 text-center font-weight-bold">
      کد 6 رقمی به شماره همراه <span>{{ mobileNumber }}</span> ارسال شد.
    </p>
  </VCol>
  <VForm ref="form" @submit.prevent="">
    <VCol :cols="12">
      <VOtpInput
        :loading="isLoading"
        v-model="otp"
        dir="ltr"
        :length="6"
        base-color="primary"
      />
    </VCol>
    <VCol :cols="12" class="py-0">
      <div
        v-if="timer > 0"
        class="font-weight-black text-caption d-flex justify-space-around"
      >
        <p>زمان باقی مانده برای ارسال مجدد کد</p>
        <span>{{ clockFormat }}</span>
      </div>
      <div v-else class="text-center">
        <VBtn
          variant="text"
          density="compact"
          @click="$emit('previousStep')"
          class="text-caption font-weight-black text-decoration-underline"
        >
          بازگشت به مرحله قبل
        </VBtn>
      </div>
    </VCol>
    <VCol class="position-absolute bottom-0" :cols="12">
      <VBtn
        :disabled="isLoading || otp.length !== 6"
        text="مرحله بعد"
        type="submit"
        class="w-100 text-body-2 font-weight-thin"
      />
    </VCol>
  </VForm>
</template>
