<template>
   <VStepper hide-actions :model-value="activeStep">
    <VStepperHeader>
        <template v-for="(step,indx) in items" :key="indx">
            <VStepperItem
                :color="step.color"
                :value="step.value"
                :complete-icon="step.compeleteIcon"
                :icon="step.icon"
                :complete="activeStep > step.value" 
            >
            <template #title>
                <span :class="`text-${step.color} font-weight-bold`">
                    {{ step.value === activeStep ? step.title:'' }}
                </span>
            </template>
        </VStepperItem>
            <VDivider
                v-if="indx < items.length - 1"
                :thickness="2"
                :class="activeStep > step.value && 'border-opacity-100'"
                color="primary"
                 />
        </template>
    </VStepperHeader>
   </VStepper>    
</template>
<script setup lang="ts">
import type { RabinStepperHeaderItem } from '~/types/components/RabinStepper';

interface Props {
    activeStep:number;
    items:Array<RabinStepperHeaderItem>
}

const props = defineProps<Props>()
</script>
<style scoped>
.v-stepper {
  box-shadow: none !important;
}
</style>