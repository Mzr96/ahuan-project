<script setup lang="ts">
definePageMeta({
  middleware: ["redeem-gift-card"],
});
import RedeemSelectInstrumentForm from "~/views/forms/RedeemSelectInstrumentForm.vue";
import RedeemEnterPinForm from "~/views/forms/RedeemEnterPinForm.vue";
import RedeemInitialForm from "~/views/forms/RedeemInitialForm.vue";
import RedeemNoBrokerProfileForm from "~/views/forms/RedeemNoBrokerProfileForm.vue";
import RedeemOtpForm from "~/views/forms/RedeemOtpForm.vue";
import RedeemCongrats from "~/views/redeem/RedeemCongrats.vue";
import RedeemHeader from "~/views/redeem/RedeemHeader.vue";
import { RedeemState } from "~/enums/redeemState";
import RedeemStepper from "~/views/RedeemStepper.vue";
import _ from "lodash";

const route = useRoute();
const router = useRouter();

// TODO : This logic should be handled via middleware
// TODO : Login step should extract from stepper
onMounted(() => {
  const giftCode = route.query.giftCode?.toString();
  const dsCode = route.query.dsCode?.toString();
  // absence of these parameters also handled in middleware
  if (!giftCode || !dsCode) {
    router.push("/scan-gift");
    return;
  }
  loginModel.giftCode = giftCode;
  loginModel.dsCode = dsCode;

  const accessToken = useCookie("accessToken");
  // if there is no accessToken in cookie go to authentication step
  if (!accessToken.value) {
    setCurrentState(RedeemState.Authentication);
  } else {
    // Token expiration handled in middleware
    setCurrentState(RedeemState.EnterPin);
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

const hadleOtpFormSubmit = () => setCurrentState(RedeemState.EnterPin);

const handlePinFormSubmit = async (pin: string, nextState: RedeemState) => {
  loginModel.pin = pin;
  setCurrentState(nextState);
};
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <template v-if="currentState !== RedeemState.Success">
      <RedeemHeader />
      <RedeemStepper :active-step="currentState" />
      <div class="flex-grow-1 position-relative mt-6">
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
        <RedeemEnterPinForm
          v-else-if="currentState === RedeemState.EnterPin"
          :ds-code="loginModel.dsCode"
          :gift-code="loginModel.giftCode"
          @submit="handlePinFormSubmit"
        />
        <RedeemNoBrokerProfileForm
          v-else-if="currentState === RedeemState.NoBrokerProfile"
          @submit="currentState++"
        />
        <RedeemSelectInstrumentForm
          v-else-if="currentState === RedeemState.ChooseInstruments"
          :pin="loginModel.pin"
          :ds-code="loginModel.dsCode"
          :gift-code="loginModel.giftCode"
          @submit="currentState++"
        />
      </div>
    </template>
    <RedeemCongrats v-if="currentState === RedeemState.Success" />
  </div>
</template>
