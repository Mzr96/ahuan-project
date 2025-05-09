// Declare global state to avoid creating new state
const isVisible = ref(false);
const message = ref("");
const selectedType = ref<"error" | "success" | "warning" | "info" | "default">(
  "default"
);

export const useSnackbar = () => {
  const showSnackbar = (
    msg: string,
    type: "error" | "success" | "warning" | "info" | "default"
  ) => {
    message.value = msg;
    isVisible.value = true;
    selectedType.value = type;
  };

  return {
    isVisible,
    message,
    selectedType,
    showSnackbar,
  };
};
