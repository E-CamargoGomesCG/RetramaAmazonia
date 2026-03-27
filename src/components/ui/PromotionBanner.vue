<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)

const closeBanner = () => {
  isVisible.value = false
}
</script>

<template>
  <Transition name="slide">
    <div 
      v-if="isVisible"
      class="bg-secondary text-white py-2.5 px-4"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-4 relative">
        <p class="text-xs md:text-sm text-center font-medium">
          <span class="hidden sm:inline">Frete Grátis em compras acima de R$ 100!</span>
          <span class="sm:hidden">Frete Grátis acima de R$ 100!</span>
          <span class="ml-2 underline cursor-pointer hover:no-underline">Aproveite</span>
        </p>
        <button 
          class="absolute right-0 p-1.5 hover:bg-white/20 rounded transition-colors active:scale-95"
          @click="closeBanner"
          aria-label="Fechar banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
