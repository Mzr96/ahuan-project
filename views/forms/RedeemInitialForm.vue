<template>
  <VCol>
    <p class="text-body-2 font-weight-bold">سلام!</p>
    <p class="text-body-2 font-weight-bold">
      برای فعال کردن کارت هدیه اطلاعات خودت رو وارد کن
    </p>
  </VCol>
  <VForm ref="form" @submit.prevent="handleSubmit">
    <div>
      <VCol :cols="12">
        <VTextField
          v-model="formModel.mobileNumber"
          label="شماره تماس"
          type="number"
          dir="ltr"
          append-inner-icon="mdi-cellphone"
          :rules="[requiredValidator, (value) => lengthValidator(value, 11)]"
          hide-spin-buttons
        />
      </VCol>
      <VCol :cols="12">
        <VTextField
          v-model="formModel.nationalCode"
          label="کد ملی"
          type="number"
          dir="ltr"
          append-inner-icon="mdi-card-account-details-outline"
          :rules="[
            requiredValidator,
            (value) => betweenLengthValidator(value, 10, 11),
          ]"
          hide-spin-buttons
        />
      </VCol>
      <VCol class="position-absolute bottom-0">
        <VBtn
          text="مرحله بعد"
          type="submit"
          class="w-100 text-body-2 font-weight-thin"
          :loading="isLoading"
        />
      </VCol>
    </div>
  </VForm>
</template>
<script setup lang="ts">
import { VForm } from "vuetify/components";
import { sendOtp } from "~/services/authenticationServices";
const emits = defineEmits<{
  submit: [mobileNumber: string, nationalCode: string];
}>();

const form = ref<VForm>();
const isLoading = ref(false);
const formModel = reactive({
  mobileNumber: "",
  nationalCode: "",
});

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const validate = await form.value?.validate();
    if (!validate?.valid) return;
    // await sendOtp(formModel.mobileNumber);
    await sleep(1500);
    emits("submit", formModel.mobileNumber, formModel.nationalCode);

    // TODO : Error should be strict type
  } catch (error: any) {
    console.log(error.data);
  } finally {
    isLoading.value = false;
  }
};
</script>
