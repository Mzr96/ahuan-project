import type { Tenant } from "~/utils/validation/tenantSchema";

export const getTenant = async (dsCode: string) => {
  const response: Tenant = await $api(
    // FIXME :: change to actual end-point
    `http://localhost:5000/tenant/${dsCode}`,
    {
      method: "GET",
    }
  );
  return response;
};
