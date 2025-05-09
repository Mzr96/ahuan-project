<template>
  <VDialog v-model="model" max-width="300" :persistent="loading">
    <VCard>
      <VCardTitle />
      <VCardText class="text-body-2 text-center">
        {{ text }}
      </VCardText>
      <VCardActions class="d-flex justify-center">
        <VBtn
          density="compact"
          variant="tonal"
          color="success"
          :loading
          @click="handleOk"
          >بله</VBtn
        >
        <VBtn
          density="compact"
          variant="tonal"
          color="error"
          :loading
          @click="handleCancel"
          >خیر</VBtn
        >
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<script setup lang="ts">
interface Props {
  text: string;
  loading: boolean;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});
const emits = defineEmits<{ ok: []; cancel: [] }>();

const model = defineModel<boolean>();

const handleOk = () => {
  emits("ok");
};

const handleCancel = () => {
  emits("cancel");
  model.value = false;
};
</script>
