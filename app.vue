<template>
  <VApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>
<script setup lang="ts">
import { useTheme } from "vuetify";
import LocalStorageService from "~/helpers/localStorageService";
import { getTenant } from "~/services/tenantServices";
import { TenantSchema } from "~/utils/validation/tenantSchema";

const route = useRoute();
const router = useRouter();
const theme = useTheme();

useHead({ title: "کارت هدیه" });

const handleTenant = async () => {
  let tenant = LocalStorageService.getItem("tenant", TenantSchema);
  const dsCode = route.query.dsCode as string | undefined;
  //   TODO :: Handle avsence of dsCode in query
  if (!dsCode) {
    // Redirect to error page
    router.push("/down-time");
  } else if (tenant === null && dsCode) {
    try {
      tenant = await getTenant(dsCode);
      LocalStorageService.setItem("tenant", tenant);
    } catch (error: unknown) {
      // Handle error of geting tenant
      console.log(error);

      router.push("/down-time");
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
<style></style>
