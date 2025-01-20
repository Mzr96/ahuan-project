// This middleware should be ommited in future
// There is no other page except gift-code implemented yet
const validPath = ["/redeem-gift-card", "/scan-gift"];
export default defineNuxtRouteMiddleware((from, to) => {
  if (!validPath.includes(to.path) && !validPath.includes(from.path)) {
    return navigateTo("/scan-gift");
  }
});
