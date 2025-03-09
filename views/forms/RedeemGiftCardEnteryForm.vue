<script setup lang="ts">
import { VForm } from "vuetify/components";
import { RegistertionState } from "~/enums/registerationState";
import { isCustomerSignedUpInBroker } from "~/services/customerServices";
import { validateGift } from "~/services/giftCodeServices";
interface Props {
  giftCode: string;
  dsCode: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  submit: [pin: string, code: string, registarationStatus: RegistertionState];
}>();

onMounted(() => {
  if (props.giftCode) {
    giftCode.value = props.giftCode;
    isGiftCodeInputDisable.value = true;
  }
});

const pin = ref("");
const giftCode = ref("");
const isGiftCodeInputDisable = ref(false);
const isLoading = ref(false);
const form = ref<VForm>();

const { showSnackbar } = useSnackbar();

const handleSubmit = async () => {
  try {
    const formValidationResult = await form.value?.validate();
    if (!formValidationResult?.valid || isLoading.value) return;
    isLoading.value = true;
    await validateGift(pin.value, props.dsCode, giftCode.value);
    const customerStateInBroker = await isCustomerSignedUpInBroker(
      props.dsCode
    );

    emits(
      "submit",
      pin.value,
      giftCode.value,
      customerStateInBroker.customerRegistrationStatus
    );
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
    @submit.prevent=""
  >
    <div>
      <VCol>
        <p class="text-body-2 font-weight-bold">
          کد هدیه و رمز فعال سازی رو وارد کن.
        </p>
      </VCol>
      <VCol :cols="12">
        <VTextField
          v-model="giftCode"
          label="کد هدیه"
          :disabled="isGiftCodeInputDisable"
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol>
        <VTextField
          v-model="pin"
          label="رمز فعال سازی"
          :length="6"
          :rules="[requiredValidator, lengthValidator(pin, 5)]"
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
    <div class="bottom_nav">
      <VCol :cols="12" align-self="end">
        <VBtn
          text="مرحله بعد"
          type="submit"
          :loading="isLoading"
          class="w-100 text-body-2 font-weight-thin"
          @click="handleSubmit"
        />
      </VCol>
    </div>
  </VForm>
</template>
