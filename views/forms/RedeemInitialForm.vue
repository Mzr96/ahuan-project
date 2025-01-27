<template>
  <VForm
    class="h-100 d-flex flex-column px-3 pt-1 justify-space-between"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <div class="w-100">
      <VCol align-self="start" :cols="12">
        <p class="text-body-2 font-weight-bold">سلام!</p>
        <p class="text-body-2 font-weight-bold">
          برای فعال کردن کارت هدیه اطلاعات خودت رو وارد کن
        </p>
      </VCol>
      <VCol :cols="12">
        <VTextField
          v-model="formModel.mobileNumber"
          label="شماره تماس"
          type="number"
          :rules="[requiredValidator, (value) => lengthValidator(value, 11)]"
          hide-spin-buttons
        />
      </VCol>
      <VCol :cols="12">
        <VTextField
          v-model="formModel.nationalCode"
          label="کد ملی"
          type="number"
          :rules="[
            requiredValidator,
            (value) => betweenLengthValidator(value, 10, 11),
          ]"
          hide-spin-buttons
        />
      </VCol>
    </div>
    <div>
      <VCol>
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

const { showSnackbar } = useSnackbar();

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const validate = await form.value?.validate();
    if (!validate?.valid) return;
    await sendOtp(formModel.mobileNumber);
    emits("submit", formModel.mobileNumber, formModel.nationalCode);

    // TODO : Error should be strict type
  } catch (error: any) {
    console.log(error.data);
    showSnackbar(error.message, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
