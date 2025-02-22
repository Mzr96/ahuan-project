<template>
  <NuxtLayout>
    <main class="bg-grey-lighten-4 h-100">
      <div class="rcontainer">
        <div class="mx-auto pb-8" style="padding-top: 104px" :cols="10">
          <VImg
            width="300"
            class="mx-auto pt-10"
            src="/public/images/404.png"
          />
        </div>
        <div
          :cols="12"
          class="text-center d-flex flex-column flex-grow-1 px-4 py-4"
        >
          <div class="flex-grow-1" style="color: #3d3d3d">
            <h3 class="text-h4 font-weight-bold">صفحه یافت نشد</h3>
            <p class="text-body-1 text-centre mt-4">
              .اوه! صفحه ای که دنبال آن هستید وجود ندارد
            </p>
          </div>
          <div class="bottom_nav">
            <VCol>
              <VBtn class="w-100" @click="navigateTo('/')"
                >بازگشت به صفحه اصلی</VBtn
              >
            </VCol>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
  title: "صفحه موردنظر یافت نشد",
});
</script>
<style>
.bottom_nav {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: max-content;
  max-width: 480px;
  top: auto;
  margin: 0 auto;
  background-color: #fff;
  z-index: 200;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
  padding: 0 12px;
  border-radius: 6px;
}
</style>
