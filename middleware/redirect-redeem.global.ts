export default defineNuxtRouteMiddleware((from) => {
  const query = from.query;
  console.log(from.fullPath);
  console.log(query);

  if (from.path === "/")
    return navigateTo({ path: `/redeem-gift-card`, query });
});
