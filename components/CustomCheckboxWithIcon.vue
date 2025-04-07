<script setup lang="ts">
import type { CustomInputContent } from "~/types/components/CustomCheckBoxWithIcon";

interface Props {
  selectedCheckbox: string[];
  checkboxContent: CustomInputContent[];
  gridColumn?: GridColumn;
}

interface Emit {
  (e: "update:selectedCheckbox", value: string[]): void;
}

export interface GridColumn {
  cols?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const updateSelectedOption = (value: string[] | null) => {
  if (typeof value !== "boolean" && value !== null) {
    emit("update:selectedCheckbox", value);
  }
};
</script>
<template>
  <VRow class="custom-input-wrapper">
    <VCol
      v-for="item in props.checkboxContent"
      :key="item.title"
      class="px-1"
      v-bind="gridColumn"
    >
      <VLabel
        :style="{
          backgroundColor: `${
            props.selectedCheckbox.includes(item.value)
              ? item.activeStateBackgroundColor
              : ''
          }`,
        }"
        class="custom-input custom-checkbox-icon rounded-lg cursor-pointer py-4 h-100"
      >
        <div class="d-flex flex-column align-center text-center px-2">
          <VIcon class="text-high-emphasis mb-3" size="36">{{
            item.icon
          }}</VIcon>
          <VCheckbox
            density="compact"
            :color="item.color"
            hide-details
            style="font-size: 12px"
            :model-value="props.selectedCheckbox"
            :value="item.value"
            @update:model-value="updateSelectedOption"
          >
            <template #label>
              <span class="text-caption" :style="{ color: `${item.color}` }">{{
                item.title
              }}</span>
            </template>
          </VCheckbox>
          <p
            class="clamp-text mb-0 text-wrap"
            :style="{ fontSize: '10px', color: `${item.color}` }"
          >
            {{ item.subtitle }}
          </p>
        </div>
      </VLabel>
    </VCol>
  </VRow>
</template>
<style lang="scss" scoped>
.custom-checkbox-icon {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 3px 15px rgba(122, 103, 14, 0.08);

  ::v-deep(.v-checkbox) {
    margin-block-end: -0.375rem;

    .v-input__control {
      .v-selection-control__wrapper {
        margin-inline-start: 0;
      }
    }
  }

  .cr-title {
    font-weight: 500;
    line-height: 1.375rem;
  }
}
</style>
