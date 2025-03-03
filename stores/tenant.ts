import { getTenant } from "~/services/tenantServices";
import type { Tenant } from "~/utils/validation/tenantSchema";

export const useTenantStore = defineStore("tenant", () => {
  const tenant = ref<Tenant | null>(null);

  const getAndSetTenant = async (dsCode: string) => {
    const fetchedTenant = await getTenant(dsCode);
    tenant.value = fetchedTenant;
  };

  return { tenant, getAndSetTenant };
});
