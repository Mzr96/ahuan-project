<script setup lang="ts">
import { getInstruments, redeemGift } from "~/services/giftCodeServices";
import type { InstrumentDataItem } from "~/types/ApiResponse";

interface Props {
  pin: string;
  giftCode: string;
  dsCode: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  submit: [];
}>();

const selectedInstrumentId = ref();
const isLoading = ref(false);
const isLoadingAvailableInstruments = ref(false);
const instruments = ref<Array<InstrumentDataItem>>();
const { showSnackbar } = useSnackbar();
// Lifecyle
onMounted(async () => {
  try {
    isLoadingAvailableInstruments.value = true;
    const availableInstruments = await getInstruments(
      props.dsCode,
      props.giftCode
    );
    instruments.value = availableInstruments;
  } catch (error: any) {
    console.error(error);
    showSnackbar(error.message, "error");
  } finally {
    isLoadingAvailableInstruments.value = false;
  }
});

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    await redeemGift(
      props.pin,
      props.dsCode,
      props.giftCode,
      selectedInstrumentId.value
    );
    emits("submit");
  } catch (error: any) {
    console.error(error);
    showSnackbar(error.message, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="h-100 d-flex flex-column px-3 pt-1 justify-space-between">
    <div>
      <VCol :cols="12" class="mb-4 font-weight-bold">
        <p>هدیه خود را از بین گزینه های زیر انتخاب کنید:</p>
      </VCol>
      <VCol :cols="12" class="d-flex flex-column ga-5 available-instruments">
        <template v-if="isLoadingAvailableInstruments">
          <VSkeletonLoader v-for="n in 3" :key="n" type="button" />
        </template>
        <VBtn
          v-for="instrument in instruments"
          :key="instrument.id"
          :disabled="isLoading"
          class="text-center font-weight-bold"
          :color="
            instrument.id === selectedInstrumentId ? 'primary' : 'primary'
          "
          :variant="
            instrument.id === selectedInstrumentId ? 'elevated' : 'tonal'
          "
          size="large"
          :text="instrument.name"
          rounded="lg"
          @click="selectedInstrumentId = instrument.id"
        />
      </VCol>
    </div>
    <div class="bottom_nav">
      <VCol class="" :cols="12">
        <VBtn
          :loading="isLoading"
          :disabled="!selectedInstrumentId"
          class="w-100 text-body-2 font-weight-thin"
          text="مرحله بعد"
          type="submit"
          @click="handleSubmit"
        />
      </VCol>
    </div>
  </div>
</template>
<style>
.available-instruments .v-skeleton-loader__button {
  max-width: 100% !important;
}
</style>
