import type { DefaultResponse } from "~/types/ApiResponse";
import type { Tenant } from "~/utils/validation/tenantSchema";

export const getTenant = async (dsCode: string) => {
  const response: DefaultResponse<Tenant> = await $api(`api/tenant/${dsCode}`, {
    method: "GET",
  });
  return response.data;
};
