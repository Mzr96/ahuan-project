export default defineNuxtRouteMiddleware((from) => {
  if (from.path === "/") return navigateTo("/redeem-gift-card");
});
