import { useTenantStore } from "~/stores/tenant";

export default defineNuxtPlugin(async () => {
  const route = useRoute();
  const tenantStore = useTenantStore();

  const dsCode = route.query.dsCode as string;

  try {
    await tenantStore.getAndSetTenant(dsCode);
    useHead({
      link: [
        { rel: "icon", type: "image/png", href: tenantStore.tenant?.favicon },
      ],
    });
  } catch (error) {
    console.error("Failed to fetch tenant:", error);
  }
});
