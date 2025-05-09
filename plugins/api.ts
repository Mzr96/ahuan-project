export default defineNuxtPlugin(() => {
  const { showSnackbar } = useSnackbar();

  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    async onResponseError({ response }) {
      const errorMessage = response._data?.Message || "خطایی رخ داده";
      showSnackbar(errorMessage, "error");
      throw response;
    },
    async onRequestError() {
      showSnackbar("خطا در برقراری ارتباط", "error");
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
