<script setup lang="ts">
import type { InstrumentDetailModalContent } from "~/types/Types";

interface Props {
  modalContent: Array<InstrumentDetailModalContent>;
}
const model = defineModel<boolean>();
const { modalContent } = defineProps<Props>();
</script>
<template>
  <VBtn
    size="small"
    append-icon="mdi-chevron-left"
    variant="text"
    @click="model = true"
    >اطلاعات صندوق‌ها</VBtn
  >
  <RabinModal v-model="model">
    <div v-for="(ins, indx) in modalContent" :key="indx" class="mb-10">
      <div class="d-flex align-center ga-1 mb-2">
        <VIcon :color="ins.color" size="large">{{ ins.icon }}</VIcon>
        <span class="pt-1 text-body-1 font-weight-bold">{{ ins.title }}</span>
      </div>
      <p class="text-body-2 text-justify">{{ ins.descriptin }}</p>
    </div>
  </RabinModal>
</template>
