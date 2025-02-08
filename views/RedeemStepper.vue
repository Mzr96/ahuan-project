<template>
  <RabinStepper
    class="gift-card-stepper"
    :active-step="activeStep"
    :items="computedItems"
  />
</template>
<script setup lang="ts">
import { RedeemState, RedeemStateLabel } from "~/enums/redeemState";
import type { RabinStepperHeaderItem } from "~/types/components/RabinStepper";

interface Props {
  activeStep: number;
}

const props = defineProps<Props>();

const stepperFirstItem: RabinStepperHeaderItem = {
  value: RedeemState.Authentication,
  title: RedeemStateLabel.Authentication,
  icon: "mdi-login",
  compeleteIcon: "mdi-check",
  color: "primary",
};

const stepperSecondItem: RabinStepperHeaderItem = {
  value: RedeemState.Otp,
  title: RedeemStateLabel.Otp,
  icon: "mdi-cellphone",
  compeleteIcon: "mdi-check",
  color: "primary",
};

const stepperThirdItem: RabinStepperHeaderItem = {
  value: RedeemState.EnterGift,
  title: RedeemStateLabel.EnterGift,
  compeleteIcon: "mdi-check",
  icon: "mdi-form-textbox-password",
  color: "primary",
};

const stepperFourthItem: RabinStepperHeaderItem = {
  value: RedeemState.NoBrokerProfile,
  title: RedeemStateLabel.NoBrokerProfile,
  compeleteIcon: "mdi-check",
  icon: "mdi-minus-circle-outline",
  color: "warning",
};

const stepperFifthItem: RabinStepperHeaderItem = {
  value: RedeemState.ChooseInstruments,
  title: RedeemStateLabel.ChooseInstruments,
  compeleteIcon: "mdi-check",
  icon: "mdi-format-list-bulleted",
  color: "primary",
};

const items = reactive([
  stepperFirstItem,
  stepperSecondItem,
  stepperThirdItem,
  stepperFourthItem,
  stepperFifthItem,
]);

const computedItems = computed(() => {
  if (props.activeStep === RedeemState.NoBrokerProfile)
    return items.filter((item) => item.value !== RedeemState.EnterGift);
  else
    return items.filter((item) => item.value !== RedeemState.NoBrokerProfile);
});
</script>
<style scoped lang="scss">
.gift-card-stepper {
  background: linear-gradient(
    to bottom,
    rgb(var(--v-theme-primary-lighten-1)) 50%,
    rgb(var(--v-theme-surface)) 50%
  );
}

:deep(.v-stepper-item__avatar) {
  width: 32px !important;
  height: 32px !important;
}

:deep(.v-stepper-item__avatar .v-icon) {
  font-size: 18px;
}
</style>
