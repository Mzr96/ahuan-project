<script setup lang="ts">
import RabinSnackbar from "~/components/RabinSnackbar.vue";
import { useSnackbar } from "~/composables/useSnackbar";

const { message, selectedType, isVisible } = useSnackbar();
</script>
<template>
  <main class="main-container">
    <section>
      <main class="main-content">
        <slot />
      </main>
      <RabinSnackbar v-model="isVisible" :type="selectedType" :message />
    </section>
    <footer class="footer">
      <div></div>
    </footer>
  </main>
</template>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
section {
  display: flex;
  flex-direction: column;
  max-width: 480px;
  width: 100%;
  min-height: 100dvh;
  background-color: #fff;
  position: relative;
}
.main-content {
  flex-grow: 1;
  padding-bottom: 64px;
}
</style>
