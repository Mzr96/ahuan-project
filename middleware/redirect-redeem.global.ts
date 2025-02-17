export default defineNuxtRouteMiddleware((from) => {
  const query = from.query;
  if (from.path === "/")
    return navigateTo({ path: `/redeem-gift-card`, query });
});
