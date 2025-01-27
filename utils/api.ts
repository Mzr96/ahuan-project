export const $api = $fetch.create({
  async onRequest({ options }) {
    // Set the base url of api request
    options.baseURL = useRuntimeConfig().public.apiBaseUrl;
    const accessToken = useCookie("accessToken").value;

    if (accessToken)
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
  },

  async onResponseError({ response }) {
    if (response.status >= 500) {
      throw Error("خطای سمت سرور");
    } else if (response.status >= 400 && response.status <= 500) {
      throw Error(response._data.error.message);
    }
  },

  async onRequestError({}) {
    throw Error("خطا در برقراری ارتباط");
  },
});
