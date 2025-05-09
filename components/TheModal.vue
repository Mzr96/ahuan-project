<template>
  <VDialog v-model="model" max-height="85%">
    <VCard>
      <VCardTitle v-if="title || closable" class="py-4">
        <div class="d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h6">
            {{ title }}
          </div>
          <div>
            <VBtn
              icon="mdi-close"
              variant="text"
              size="x-small"
              @click="model = false"
            />
          </div>
        </div>
      </VCardTitle>
      <!-- Content -->
      <VCardText class="pa-4 text-justify">
        <slot />
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

interface Props {
  title?: string;
  closable?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: "",
  closable: true,
});
</script>
