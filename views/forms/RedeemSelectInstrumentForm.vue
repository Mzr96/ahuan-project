<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";
import { getDonutChartInstrumentsConfig } from "~/@core/libs/apex-chart/config";
import { getGiftCodeDetails, redeemGift } from "~/services/giftCodeServices";
import type { ApexPieChartColor } from "~/types/components/ApexPieChart";
import type { CustomInputContent } from "~/types/components/CustomCheckBoxWithIcon";
import type {
  InstrumentDetailModalContent,
  InstrumentPortion,
} from "~/types/Types";
import InstrumentsDetailModal from "../modals/InstrumentsDetailModal.vue";

interface Props {
  pin: string;
  giftCode: string;
  dsCode: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  submit: [];
}>();
// Order of the list does matter
const colors = [
  {
    activeStateBackgroundColor: "#F2FDE2",
    color: "#1B6F14",
    icon: "mdi-sprout",
  },
  { activeStateBackgroundColor: "#FFFCDA", color: "#7A670E", icon: "mdi-gold" },
  {
    activeStateBackgroundColor: "#DCF3F5",
    color: "#092D7A",
    icon: "mdi-chart-line",
  },
];

const checkboxesContent: Array<CustomInputContent> = reactive([]);
const instrumentsDetailModalContent: Array<InstrumentDetailModalContent> =
  reactive([]);
const selectedInstruments = ref([]);
const giftAmount = ref(0);
const isLoading = ref(false);
const isLoadingAvailableInstruments = ref(false);
const doesInstrumentsHaveDescription = computed(() =>
  instrumentsDetailModalContent.every((i) => i.descriptin !== null)
);
const { showSnackbar } = useSnackbar();

// Lifecyle
onMounted(async () => {
  try {
    isLoadingAvailableInstruments.value = true;
    const giftCodeDetails = await getGiftCodeDetails(
      props.dsCode,
      props.giftCode
    );
    giftAmount.value = giftCodeDetails.amount;
    giftCodeDetails.instruments.forEach((ins, indx) => {
      const checkboxContent: CustomInputContent = {
        title: ins.bourseAccountCode,
        value: ins.id,
        subtitle: ins.name,
        ...colors[indx],
      };
      const descriptionModalContent: InstrumentDetailModalContent = {
        title: ins.bourseAccountCode,
        descriptin: ins.description,
        icon: colors[indx].icon,
        color: colors[indx].color,
      };
      instrumentsDetailModalContent.push(descriptionModalContent);
      checkboxesContent.push(checkboxContent);
    });
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
    const instrumentsPortions: Array<InstrumentPortion> = series.value.map(
      (serie, indx) => ({
        id: selectedInstruments.value[indx],
        percentage: (serie / giftAmount.value) * 100,
      })
    );
    await redeemGift(
      props.pin,
      props.dsCode,
      props.giftCode,
      instrumentsPortions
    );
    emits("submit");
  } catch (error: any) {
    console.error(error);
    showSnackbar(error.message, "error");
  } finally {
    isLoading.value = false;
  }
};
// chart data
const vuetifyTheme = useTheme();

const expenseRationChartConfig = computed(() => {
  const selectedCheckboxContent = checkboxesContent.filter((cc) =>
    selectedInstruments.value.includes(cc.value)
  );
  const labels = selectedCheckboxContent.map((scc) => scc.title);
  const colors: Array<ApexPieChartColor> = selectedCheckboxContent.map(
    (scc) => ({ background: scc.activeStateBackgroundColor, label: scc.color })
  );
  return getDonutChartInstrumentsConfig(
    labels,
    colors,
    vuetifyTheme.current.value
  );
});
const series = ref<Array<number>>([]);

watch(selectedInstruments, (newVal) => {
  if (newVal.length > 0) {
    const eachInstrumentPortion = giftAmount.value / newVal.length;
    const newSeries = Array.from({ length: newVal.length }, () =>
      Math.floor(eachInstrumentPortion)
    );
    series.value = newSeries;
    const sumOfSeries = series.value.reduce((pre, cur) => pre + cur, 0);
    const diff = giftAmount.value - sumOfSeries;
    series.value[0] += diff;
  } else {
    series.value.pop();
  }
});
</script>
<template>
  <div class="h-100 d-flex flex-column px-3 pt-1 justify-space-between">
    <div>
      <VCol :cols="12" class="d-flex font-weight-bold justify-space-between">
        <p>هدیه خود را انتخاب کنید:</p>
        <InstrumentsDetailModal
          v-if="doesInstrumentsHaveDescription"
          :modal-content="instrumentsDetailModalContent"
        />
      </VCol>
      <VCol :cols="12" class="d-flex flex-column available-instruments">
        <!-- Start : Skeleton for lazy load -->
        <VRow v-if="isLoadingAvailableInstruments">
          <VCol v-for="n in 3" :key="n" :cols="4">
            <VSkeletonLoader type="image" />
          </VCol>
        </VRow>
        <!-- End : Skeleton for lazy load -->
        <CustomCheckboxWithIcon
          v-else
          v-model:selected-checkbox="selectedInstruments"
          :checkbox-content="checkboxesContent"
          :grid-column="{ cols: '4' }"
        />
      </VCol>
      <VCol :cols="12">
        <VueApexCharts
          type="donut"
          height="200"
          :options="expenseRationChartConfig"
          :series="series"
        />
      </VCol>
    </div>
    <div class="bottom_nav">
      <VCol class="" :cols="12">
        <VBtn
          :loading="isLoading"
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

.apexcharts-datalabel-value {
  direction: rtl;
}
</style>
