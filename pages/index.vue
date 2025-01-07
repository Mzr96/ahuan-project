<script setup lang="ts">
import RedeemSelectGiftForm from "~/views/forms/RedeemSelectGiftForm.vue";
import RedeemEnterPinForm from "~/views/forms/RedeemEnterPinForm.vue";
import RedeemInitialForm from "~/views/forms/RedeemInitialForm.vue";
import RedeemNoBrokerProfileForm from "~/views/forms/RedeemNoBrokerProfileForm.vue";
import RedeemOtpForm from "~/views/forms/RedeemOtpForm.vue";
import RedeemCongrats from "~/views/redeem/RedeemCongrats.vue";
import RedeemHeader from "~/views/redeem/RedeemHeader.vue";

const step = ref(1);
const loginModel = reactive({
  mobileNumber: "",
  nationalCode: "",
  otp: "",
});

const handleFirstStepSubmit = (mobileNumber: string, nationalCode: string) => {
  loginModel.mobileNumber = mobileNumber;
  loginModel.nationalCode = nationalCode;
  step.value++;
};
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <template v-if="step !== 6">
      <RedeemHeader />
      <div class="flex-grow-1 position-relative mt-6">
        <RedeemInitialForm v-if="step === 1" @submit="handleFirstStepSubmit" />
        <RedeemOtpForm
          v-else-if="step === 2"
          :mobile-number="loginModel.mobileNumber"
          :national-code="loginModel.nationalCode"
          @submit="step++"
          @previous-step="step--"
        />
        <RedeemEnterPinForm v-else-if="step === 3" @submit="step++" />
        <RedeemNoBrokerProfileForm v-else-if="step === 4" @submit="step++" />
        <RedeemSelectGiftForm v-else-if="step === 5" @submit="step++" />
      </div>
    </template>
    <RedeemCongrats v-if="step === 6" />
  </div>
</template>
<style></style>
