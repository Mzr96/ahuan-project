import { computed, ref, watch } from "vue";

export const useTimer = (expireTime: number = 120) => {
  const timer = ref(expireTime);

  const countDown = () => {
    setTimeout(() => {
      timer.value -= 1;
    }, 1000);
  };

  watch(
    timer,
    (newVal, _) => {
      if (newVal > 0) countDown();
    },
    { immediate: true }
  );

  const restart = () => {
    timer.value = expireTime;
  };

  const clockFormat = computed(() => {
    return `${Math.floor(timer.value / 60) < 10 ? "0" : ""}${Math.floor(
      timer.value / 60
    )}:${Math.floor(timer.value % 60) < 10 ? "0" : ""}${timer.value % 60}`;
  });

  return { timer, clockFormat, restart };
};
