<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '../../stores/favorites'

interface Product {
  id: number
  name: string
  category: string
  price: number
  availableArea: string
  image: string
}

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const { isFavorite, toggleFavorite } = useFavorites()

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.product.price)
})

const isProductFavorite = computed(() => isFavorite(props.product.id))

const navigateToProduct = () => {
  router.push(`/produto/${props.product.id}`)
}

const handleFavoriteClick = (event: Event) => {
  event.stopPropagation()
  toggleFavorite(props.product)
}
</script>

<template>
  <article 
    class="card overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    @click="navigateToProduct"
  >
    <!-- Image Container - Fixed height for consistency -->
    <div class="relative w-full h-48 bg-gray-100 overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      >
      <!-- Category Badge -->
      <span class="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
        {{ product.category }}
      </span>
      
      <!-- Favorite Button -->
      <button 
        class="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:bg-white active:scale-125"
        :class="isProductFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'"
        @click="handleFavoriteClick"
        :aria-label="isProductFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <!-- Empty Heart -->
        <svg 
          v-if="!isProductFavorite"
          xmlns="http://www.w3.org/2000/svg" 
          class="w-5 h-5 transition-transform duration-200" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <!-- Filled Heart -->
        <svg 
          v-else
          xmlns="http://www.w3.org/2000/svg" 
          class="w-5 h-5 transition-transform duration-200" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </button>

      <!-- Quick Add Button - Larger touch target on mobile -->
      <button 
        class="absolute bottom-3 right-3 w-10 h-10 md:w-10 md:h-10 bg-secondary text-white rounded-full flex items-center justify-center opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-secondary-dark active:scale-95"
        @click.stop
        aria-label="Adicionar ao carrinho"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors duration-200 line-clamp-2">
        {{ product.name }}
      </h3>
      <p class="text-sm text-text-muted mb-2">
        {{ product.availableArea }} disponível
      </p>
      <p class="text-lg font-bold text-primary">
        {{ formattedPrice }} <span class="text-sm font-normal text-text-secondary">por m²</span>
      </p>
    </div>
  </article>
</template>
