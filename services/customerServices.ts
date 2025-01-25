import type { DefaultResponse, IsSignUpData } from "~/types/ApiResponse";

export const isCustomerSignedUpInBroker = async (dsCode: string) => {
  const response = await $api<DefaultResponse<IsSignUpData>>(
    "/api/customer/is-signup",
    {
      method: "GET",
      query: { dsCode },
    }
  );
  return response.data;
};
