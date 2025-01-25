import type { authenticationData, DefaultResponse } from "~/types/ApiResponse";
// TODO : Capthcha set to null by default(temporary)
export const sendOtp = async (
  cellPhone: string,
  captchaCode: string | null = null,
  captchaId: string | null = null
) => {
  await $api("/api/authentication/otp", {
    method: "POST",
    body: {
      cellPhone,
      captchaCode,
      captchaId,
    },
  });
};

export const verifyOtp = async (
  cellPhone: string,
  nationalCode: string,
  otp: string
) => {
  const response = await $api<DefaultResponse<authenticationData>>(
    "/api/authentication",
    {
      method: "POST",
      body: { cellPhone, nationalCode, otp },
    }
  );
  return response.data;
};
