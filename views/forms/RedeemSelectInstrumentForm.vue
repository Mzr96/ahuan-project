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

// Lifecyle
onMounted(async () => {
  try {
    isLoadingAvailableInstruments.value = true;
    const availableInstruments = await getInstruments(
      props.dsCode,
      props.giftCode
    );
    instruments.value = availableInstruments;
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <VRow class="mx-2">
    <VCol :cols="12" class="mb-4 font-weight-bold">
      <p>هدیه خود را از بین گزینه های زیر انتخاب کنید:</p>
    </VCol>
    <VCol :cols="12" class="d-flex flex-column ga-5 available-instruments">
      <template v-if="isLoadingAvailableInstruments">
        <VSkeletonLoader v-for="n in 3" :key="n" type="button" />
      </template>
      <VBtn
        v-for="instrument in instruments"
        :disabled="isLoading"
        @click="selectedInstrumentId = instrument.id"
        class="text-center font-weight-bold"
        :key="instrument.id"
        :color="instrument.id === selectedInstrumentId ? 'primary' : 'primary'"
        :variant="instrument.id === selectedInstrumentId ? 'elevated' : 'tonal'"
        size="large"
        :text="instrument.name"
        rounded="lg"
      />
    </VCol>
  </VRow>
  <VCol class="position-absolute bottom-0" :cols="12">
    <VBtn
      :loading="isLoading"
      :disabled="!selectedInstrumentId"
      @click="handleSubmit"
      text="مرحله بعد"
      type="submit"
      class="w-100 text-body-2 font-weight-thin"
    />
  </VCol>
</template>
<style>
.available-instruments .v-skeleton-loader__button {
  max-width: 100% !important;
}
</style>
