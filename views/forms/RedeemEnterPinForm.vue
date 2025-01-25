<script setup lang="ts">
import { RedeemState } from "~/enums/redeemState";
import { isCustomerSignedUpInBroker } from "~/services/customerServices";
import { validateGift } from "~/services/giftCodeServices";
interface Props {
  giftCode: string;
  dsCode: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  submit: [pin: string, nextState: RedeemState];
}>();

const pin = ref("");
const isLoading = ref(false);

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    await validateGift(pin.value, props.dsCode, props.giftCode);
    const customerStateInBroker = await isCustomerSignedUpInBroker(
      props.dsCode
    );
    if (customerStateInBroker.isCustomer)
      emits("submit", pin.value, RedeemState.ChooseInstruments);
    else emits("submit", pin.value, RedeemState.NoBrokerProfile);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <VCol>
    <p class="text-body-2 text-center font-weight-bold">
      رمز فعال‌سازی کارت را وارد کنید.
    </p>
  </VCol>
  <VForm ref="form" @submit.prevent="">
    <VCol :cols="12">
      <VOtpInput
        :loading="isLoading"
        v-model="pin"
        dir="ltr"
        :length="6"
        base-color="primary"
      />
    </VCol>
    <VCol :cols="12" class="py-0">
      <div class="text-caption d-flex align-center mx-2 ga-1">
        <VIcon icon="mdi-alert-circle-outline" color="primary" size="x-large" />
        <p>
          رمز فعالسازی همون کدی هست که داخل پاکت کنار کارت براتون گذاشته شده.
          اگر این رمز رو فراموش کردین با تیم پشتیبانی تماس بگیرین!
        </p>
      </div>
    </VCol>
    <VCol class="position-absolute bottom-0" :cols="12">
      <VBtn
        :disabled="isLoading || pin.length !== 6"
        text="مرحله بعد"
        type="submit"
        @click="handleSubmit"
        class="w-100 text-body-2 font-weight-thin"
      />
    </VCol>
  </VForm>
</template>
