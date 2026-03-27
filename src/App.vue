<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import PromotionBanner from "@/components/ui/PromotionBanner.vue";
import LoginModal from "@/components/auth/LoginModal.vue";

const isLoginModalOpen = ref(false);

provide("openLoginModal", () => {
  isLoginModalOpen.value = true;
});

onMounted(() => {});
</script>

<template>
  <div
    class="flex min-h-screen flex-col overflow-x-hidden font-sans antialiased text-slate-900"
  >
    <PromoBanner />

    <AppHeader />

    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <AppFooter />

    <LoginModal :is-open="isLoginModalOpen" @close="isLoginModalOpen = false" />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
