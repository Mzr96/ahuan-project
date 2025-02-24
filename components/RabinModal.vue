<template>
  <v-dialog
    v-model="model"
    :max-width="480"
    max-height="85%"
    transition="dialog-bottom-transition"
    :scrim="true"
    content-class="bottom-sheet-dialog"
  >
    <VCard class="modal-wrapper position-relative">
      <VCardTitle class="position-sticky d-flex flex-column">
        <div class="modal-header-line mb-4"></div>
        <div class="d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h6">
            {{ title }}
          </div>
          <div>
            <VBtn
              icon="mdi-close"
              rounded="large"
              variant="text"
              size="x-small"
              @click="model = false"
            />
          </div>
        </div>
      </VCardTitle>
      <!-- Content -->
      <v-card-text class="modal-content pa-4 text-justify">
        <slot />
      </v-card-text>
    </VCard>
  </v-dialog>
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

<style scoped>
.modal-wrapper {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  border-radius: 16px 16px 0 0;
  /* max-height: 85vh; */
  display: flex;
  flex-direction: column;
  border-top-left-radius: 21px !important;
  border-top-right-radius: 21px !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.modal-content {
  overflow-y: auto;
  flex-grow: 1;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.modal-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
}

/* Custom transition */
:deep(.dialog-bottom-transition-enter-active),
:deep(.dialog-bottom-transition-leave-active) {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.dialog-bottom-transition-enter-from),
:deep(.dialog-bottom-transition-leave-to) {
  transform: translateY(100%);
}

:deep(.dialog-bottom-transition-enter-to),
:deep(.dialog-bottom-transition-leave-from) {
  transform: translateY(0);
}

/* Add styles for the dialog container */
:deep(.bottom-sheet-dialog) {
  position: fixed !important;
  bottom: 0 !important;
  width: 100% !important;
  margin: 0 !important;
}

.modal-header-line {
  width: 48px;
  height: 4px;
  margin: 6px auto 0 auto;
  background-color: #e0e0e0;
  border-radius: 4px;
}
</style>
