import { jwtDecode } from "jwt-decode";
import type { Token } from "~/types/Token";

export default defineNuxtRouteMiddleware((from, to) => {
  const accessToken = useCookie("accessToken");
  // Clear token from cookie and clear when it is expired
  if (accessToken.value) {
    const tokenClaims: Token = jwtDecode(accessToken.value);
    // Conver second to milisecond
    if (tokenClaims.exp * 1000 < Date.now()) accessToken.value = null;
  }

  // Redirect when there is no dsCode or giftCode in query
  if (!to.query.giftCode?.toString() || !to.query.dsCode?.toString()) {
    return navigateTo("/scan-gift");
  }
});
