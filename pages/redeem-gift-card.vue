<script setup lang="ts">
import RedeemSelectInstrumentForm from "~/views/forms/RedeemSelectInstrumentForm.vue";
import RedeemGiftCardEnteryForm from "~/views/forms/RedeemGiftCardEnteryForm.vue";
import RedeemInitialForm from "~/views/forms/RedeemInitialForm.vue";
import RedeemNoBrokerProfileForm from "~/views/forms/RedeemNoBrokerProfileForm.vue";
import RedeemOtpForm from "~/views/forms/RedeemOtpForm.vue";
import RedeemCongrats from "~/views/redeem/RedeemCongrats.vue";
import RedeemHeader from "~/views/redeem/RedeemHeader.vue";
import { RedeemState } from "~/enums/redeemState";
import RedeemStepper from "~/views/RedeemStepper.vue";

const route = useRoute();
onMounted(() => {
  const giftCode = route.query.giftCode?.toString() || "";
  const dsCode = route.query.dsCode?.toString() || "";

  loginModel.giftCode = giftCode;
  loginModel.dsCode = dsCode;

  const accessToken = useCookie("accessToken");
  // if there is no accessToken in cookie go to authentication step
  if (!accessToken.value) {
    setCurrentState(RedeemState.Authentication);
  } else {
    setCurrentState(RedeemState.EnterGift);
  }
});

const currentState = ref<RedeemState>(RedeemState.Authentication);
const loginModel = reactive({
  mobileNumber: "",
  nationalCode: "",
  pin: "",
  giftCode: "",
  dsCode: "",
});

const setCurrentState = (state: RedeemState) => (currentState.value = state);

const handleInitialFormSubmit = (
  mobileNumber: string,
  nationalCode: string
) => {
  loginModel.mobileNumber = mobileNumber;
  loginModel.nationalCode = nationalCode;
  setCurrentState(RedeemState.Otp);
};

const hadleOtpFormSubmit = () => setCurrentState(RedeemState.EnterGift);

const handleEnterGiftFormSubmit = async (
  pin: string,
  code: string,
  nextState: RedeemState
) => {
  loginModel.pin = pin;
  loginModel.giftCode = code;
  setCurrentState(nextState);
};
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <template v-if="currentState !== RedeemState.Success">
      <RedeemHeader />
      <RedeemStepper :active-step="currentState" />
      <div class="flex-grow-1">
        <RedeemInitialForm
          v-if="currentState === RedeemState.Authentication"
          @submit="handleInitialFormSubmit"
        />
        <RedeemOtpForm
          v-else-if="currentState === RedeemState.Otp"
          :mobile-number="loginModel.mobileNumber"
          :national-code="loginModel.nationalCode"
          @submit="hadleOtpFormSubmit"
          @previous-step="setCurrentState(RedeemState.Authentication)"
        />
        <RedeemGiftCardEnteryForm
          v-else-if="currentState === RedeemState.EnterGift"
          :ds-code="loginModel.dsCode"
          :gift-code="loginModel.giftCode"
          @submit="handleEnterGiftFormSubmit"
        />
        <RedeemNoBrokerProfileForm
          v-else-if="currentState === RedeemState.NoBrokerProfile"
          :ds-code="loginModel.dsCode"
          @submit="setCurrentState(RedeemState.ChooseInstruments)"
        />
        <RedeemSelectInstrumentForm
          v-else-if="currentState === RedeemState.ChooseInstruments"
          :pin="loginModel.pin"
          :ds-code="loginModel.dsCode"
          :gift-code="loginModel.giftCode"
          @submit="setCurrentState(RedeemState.Success)"
        />
      </div>
    </template>
    <RedeemCongrats v-if="currentState === RedeemState.Success" />
  </div>
</template>
<style>
.bottom_nav {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: max-content;
  max-width: 480px;
  top: auto;
  margin: 0 auto;
  background-color: #fff;
  z-index: 200;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
  padding: 0 12px;
  border-radius: 6px;
}
</style>
