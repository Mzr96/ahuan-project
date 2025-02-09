<template>
  <main class="bg-grey-lighten-4 h-100">
    <div class="rcontainer">
      <div class="mx-auto pb-8" style="padding-top: 104px" :cols="10">
        <VImg width="300" class="mx-auto pt-10" src="/public/images/404.png" />
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
        <div>
          <VBtn class="w-100" @click="navigateTo('/')"
            >بازگشت به صفحه اصلی</VBtn
          >
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
useHead({
  title: "صفحه موردنظر یافت نشد",
});
</script>
<style>
.rcontainer {
  max-width: 480px !important;
  margin-right: auto;
  margin-left: auto;
  background-color: #fff !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
