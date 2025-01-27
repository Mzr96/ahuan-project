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
const { showSnackbar } = useSnackbar();
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
    class="h-100 d-flex flex-column px-3 pt-1 justify-space-between"
    ref="form"
    @submit.prevent=""
  >
    <div>
      <VCol class="pb-0">
        <p class="text-body-2 text-center font-weight-bold">
          رمز فعال‌سازی کارت را وارد کنید.
        </p>
      </VCol>
      <VCol class="pt-0 pb-6" :cols="12">
        <VOtpInput
          :loading="isLoading"
          v-model="pin"
          dir="ltr"
          :length="6"
          base-color="primary"
        />
      </VCol>
      <VCol :cols="12" class="py-0">
        <div class="text-caption d-flex ga-1">
          <VIcon
            icon="mdi-alert-circle-outline"
            color="primary"
            size="x-large"
          />
          <p>
            رمز فعالسازی همون کدی هست که داخل پاکت کنار کارت براتون گذاشته شده.
            اگر این رمز رو فراموش کردین با تیم پشتیبانی تماس بگیرین!
          </p>
        </div>
      </VCol>
    </div>
    <div>
      <VCol :cols="12" align-self="end">
        <VBtn
          :disabled="isLoading || pin.length !== 6"
          text="مرحله بعد"
          type="submit"
          @click="handleSubmit"
          class="w-100 text-body-2 font-weight-thin"
        />
      </VCol>
    </div>
  </VForm>
</template>
