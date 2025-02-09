<template>
  <div class="d-flex flex-column h-100">
    <div class="pb-8" style="padding-top: 104px">
      <VImg width="300" class="mx-auto" src="/public/images/500.png" />
    </div>
    <div
      :cols="12"
      class="text-center d-flex flex-column flex-grow-1 px-4 py-4"
    >
      <div class="flex-grow-1" style="color: #3d3d3d">
        <h3 class="text-h4 font-weight-bold">خطایی رخ داده</h3>
        <p class="text-body-1 mt-4">
          اوه! متاسفانه مشکلی پیش آمده...<br />
          لحظاتی دیگر دوباره تلاش کنید.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "خطا",
});
</script>
