<template>
  <VApp>
    <NuxtLayout>
      <div class="rcontainer">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </VApp>
</template>
<script setup lang="ts">
import { useTheme } from "vuetify";
import LocalStorageService from "~/helpers/localStorageService";
import { getTenant } from "~/services/tenantServices";
import { TenantSchema, type Tenant } from "~/utils/validation/tenantSchema";

const route = useRoute();
const router = useRouter();
const theme = useTheme();

const handleTenant = async () => {
  let tenant = LocalStorageService.getItem("tenant", TenantSchema);
  const dsCode = route.query.dsCode as string | undefined;
  //   TODO :: Handle avsence of dsCode in query
  if (!dsCode) {
    // Redirect to error page
  } else if (tenant === null && dsCode) {
    try {
      tenant = await getTenant(dsCode);
      LocalStorageService.setItem("tenant", tenant);
    } catch (error) {
      // Handle error of geting tenant
      router.push("/scan-gift");
    }
  }
  theme.themes.value.light.colors = {
    ...theme.themes.value.light.colors,
    ...tenant?.colors,
  };
  useHead({
    link: [{ rel: "icon", type: "image/png", href: tenant?.favicon }],
  });
};
await handleTenant();
</script>
<style>
.rcontainer {
  max-width: 480px !important;
  margin-right: auto;
  margin-left: auto;
  background-color: #fff !important;
  height: 100vh;
}
</style>
