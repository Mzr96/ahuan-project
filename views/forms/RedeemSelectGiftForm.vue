<script setup lang="ts">
const emits = defineEmits<{
  submit: [];
}>();
const selectedGif = ref();
const isLoading = ref(false);
const gifts = ["صندوق درآمد ثابت رابین", "صندوق طلا عیار ", "صندوق طلا کهربا"];

const handleSubmit = async () => {
  isLoading.value = true;
  await sleep(1682);
  isLoading.value = false;
  emits("submit");
};
</script>
<template>
  <VRow class="mx-2">
    <VCol :cols="12" class="mb-4 font-weight-bold">
      <p>هدیه خود را از بین گزینه های زیر انتخاب کنید:</p>
    </VCol>
    <VCol :cols="12" class="d-flex flex-column ga-5">
      <VBtn
        v-for="(gift, idx) in gifts"
        :disabled="isLoading"
        @click="selectedGif = gift"
        class="text-center font-weight-bold"
        :key="idx"
        :color="gift === selectedGif ? 'primary' : 'primary'"
        :variant="gift === selectedGif ? 'elevated' : 'tonal'"
        size="large"
        :text="gift"
        rounded="lg"
      />
    </VCol>
  </VRow>
  <VCol class="position-absolute bottom-0" :cols="12">
    <VBtn
      :loading="isLoading"
      :disabled="!selectedGif"
      @click="handleSubmit"
      text="مرحله بعد"
      type="submit"
      class="w-100 text-body-2 font-weight-thin"
    />
  </VCol>
</template>
