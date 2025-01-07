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
});
