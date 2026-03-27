<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFavorites } from '../stores/favorites'
import ProductCard from '../components/ui/ProductCard.vue'

const router = useRouter()
const { state: favoritesState } = useFavorites()

const continueShopping = () => {
  router.push('/catalogo')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="bg-surface border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-text-primary">
          Meus Favoritos 
          <span class="text-text-muted font-normal text-lg md:text-2xl">
            ({{ favoritesState.items.length }} {{ favoritesState.items.length === 1 ? 'item' : 'itens' }})
          </span>
        </h1>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
      <Transition name="fade" mode="out-in">
        <!-- Favorites Grid -->
        <div v-if="favoritesState.items.length > 0" key="favorites-grid">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <ProductCard
              v-for="product in favoritesState.items"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else key="empty-state" class="text-center py-12 md:py-16">
          <div class="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 md:w-12 md:h-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 class="text-xl md:text-2xl font-bold text-text-primary mb-2">
            Você ainda não tem favoritos
          </h2>
          <p class="text-text-secondary mb-6 md:mb-8 text-sm md:text-base">
            Explore nosso catálogo e salve seus produtos favoritos clicando no coração.
          </p>
          <button 
            class="btn-primary w-full sm:w-auto min-h-12 active:scale-95 transition-transform"
            @click="continueShopping"
          >
            Explorar Catálogo
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
