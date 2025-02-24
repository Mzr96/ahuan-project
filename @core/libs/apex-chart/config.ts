import type { ThemeInstance } from "vuetify";
import { hexToRgb } from "./utils/colorConverter";
import type { ApexOptions } from "apexcharts";
import type { ApexPieChartColor } from "~/types/components/ApexPieChart";

// Colors variables
const colorVariables = (
  themeColors: ThemeInstance["themes"]["value"]["colors"]
) => {
  const themeSecondaryTextColor = `rgba(${hexToRgb(
    themeColors.colors["on-surface"]
  )},${themeColors.variables["medium-emphasis-opacity"]})`;
  const themeDisabledTextColor = `rgba(${hexToRgb(
    themeColors.colors["on-surface"]
  )},${themeColors.variables["disabled-opacity"]})`;
  const themeBorderColor = `rgba(${hexToRgb(
    String(themeColors.variables["border-color"])
  )},${themeColors.variables["border-opacity"]})`;
  const themePrimaryTextColor = `rgba(${hexToRgb(
    themeColors.colors["on-surface"]
  )},${themeColors.variables["high-emphasis-opacity"]})`;
  const themePrimaryColor = `rgba(${hexToRgb(themeColors.colors["primary"])},${
    themeColors.variables["high-emphasis-opacity"]
  })`;

  return {
    themeSecondaryTextColor,
    themeDisabledTextColor,
    themeBorderColor,
    themePrimaryTextColor,
    themePrimaryColor,
  };
};

const getDonutChartDefaultConfig = (): ApexOptions => {
  return {
    stroke: { width: 1, lineCap: "round" },
    chart: {
      fontFamily: "Vazirmatn-FD",
      type: "donut",
      height: 260,
    },
    noData: {
      text: "حداقل یک مورد انتخاب کنید",
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
    },
    legend: {
      show: false,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
  };
};

export const getDonutChartInstrumentsConfig = (
  labels: string[],
  colors: ApexPieChartColor[],
  themeColors: ThemeInstance["themes"]["value"]["colors"]
): ApexOptions => {
  const backgroundsColor = colors.map((color) => color.background);
  const labelsColor = colors.map((color) => color.label);
  const donutChartDefaultConfig = getDonutChartDefaultConfig();
  const { themePrimaryColor } = colorVariables(themeColors);

  return {
    ...donutChartDefaultConfig,
    labels,
    colors: backgroundsColor,

    // Data Lables config
    dataLabels: {
      ...donutChartDefaultConfig.dataLabels,
      formatter: (val: string) => `${Number.parseInt(val, 10)}%`,
      style: {
        colors: labelsColor,
        fontWeight: 400,
      },
    },

    // Tooltip config
    tooltip: {
      ...donutChartDefaultConfig.tooltip,
      // TODO :: Implement customized tooltip
      enabled: false,
      style: {
        fontSize: "14px",
      },
      marker: { show: false },
    },

    // Plot Options config
    plotOptions: {
      pie: {
        // expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "16px",
              color: themePrimaryColor,
            },
            value: {
              show: true,
              fontSize: "12px",
              color: themePrimaryColor,
              formatter: (val) => `${Number(val).toLocaleString()} ریال`,
            },
            total: {
              show: true,
              fontSize: "16px",
              label: "مبلغ کل هدیه",
              color: themePrimaryColor,
              formatter({ _, globals }) {
                const sum = globals.series.reduce((pre, cur) => pre + cur, 0);
                return typeof sum === "number"
                  ? `${sum.toLocaleString()} ریال`
                  : sum;
              },
            },
          },
        },
      },
    },
  };
};
