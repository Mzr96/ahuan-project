export const sendOtp = async (
  cellPhone: string,
  captchaCode: string | null = null,
  captchaId: string | null = null
) => {
  try {
    await $api("/api/authentication/otp", {
      method: "POST",
      body: {
        cellPhone,
        captchaCode,
        captchaId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (mobileNumber: number, otp: number) => {
  try {
    await $api("/api/authentication/verifyOtp", {
      method: "POST",
      body: { mobileNumber, otp },
    });
  } catch (error) {
    throw error;
  }
};
