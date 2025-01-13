<script setup lang="ts">
import RedeemSelectGiftForm from "~/views/forms/RedeemSelectGiftForm.vue";
import RedeemEnterPinForm from "~/views/forms/RedeemEnterPinForm.vue";
import RedeemInitialForm from "~/views/forms/RedeemInitialForm.vue";
import RedeemNoBrokerProfileForm from "~/views/forms/RedeemNoBrokerProfileForm.vue";
import RedeemOtpForm from "~/views/forms/RedeemOtpForm.vue";
import RedeemCongrats from "~/views/redeem/RedeemCongrats.vue";
import RedeemHeader from "~/views/redeem/RedeemHeader.vue";
import { RedeemState } from "~/enums/redeemState"
import RedeemStepper from "~/views/RedeemStepper.vue";

const currentState = ref(RedeemState.Authentication);
const loginModel = reactive({
  mobileNumber: "",
  nationalCode: "",
  otp: "",
});

const handleFirstStepSubmit = (mobileNumber: string, nationalCode: string) => {
  loginModel.mobileNumber = mobileNumber;
  loginModel.nationalCode = nationalCode;
  currentState.value = RedeemState.Otp;
};
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <template v-if="currentState !== RedeemState.Success">
      <RedeemHeader />
      <RedeemStepper :active-step="currentState"/>
      <div class="flex-grow-1 position-relative mt-6">
        <RedeemInitialForm 
          v-if="currentState === RedeemState.Authentication" 
          @submit="handleFirstStepSubmit" 
          />
        <RedeemOtpForm
          v-else-if="currentState === RedeemState.Otp"
          :mobile-number="loginModel.mobileNumber"
          :national-code="loginModel.nationalCode"
          @submit="currentState++"
          @previous-step="currentState--"
        />
        <RedeemEnterPinForm 
          v-else-if="currentState === RedeemState.EnterPin" 
          @submit="currentState++" 
          />
        <RedeemNoBrokerProfileForm 
          v-else-if="currentState === RedeemState.NoBrokerProfile" 
          @submit="currentState++" 
          />
        <RedeemSelectGiftForm 
          v-else-if="currentState === RedeemState.ChooseInstruments" 
          @submit="currentState++" 
          />
      </div>
    </template>
    <RedeemCongrats v-if="currentState === RedeemState.Success" />
  </div>
</template>

