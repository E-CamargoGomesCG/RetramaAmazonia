<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '../components/ui/ProductCard.vue'

interface Product {
  id: number
  name: string
  category: string
  price: number
  availableArea: string
  image: string
}

const searchQuery = ref('')
const selectedCategory = ref('Todos')
const sortBy = ref('name-asc')

const categories = ref([
  'Todos',
  'Fardas Industriais',
  'Decoração de Eventos',
  'Fantasias de Carnaval',
  'Uniformes Corporativos',
])

const sortOptions = [
  { value: 'name-asc', label: 'Nome A-Z' },
  { value: 'name-desc', label: 'Nome Z-A' },
  { value: 'price-asc', label: 'Menor Preço' },
  { value: 'price-desc', label: 'Maior Preço' },
]

const allProducts = ref<Product[]>([
  {
    id: 1,
    name: 'Algodão Industrial Misto',
    category: 'Fardas Industriais',
    price: 4.50,
    availableArea: '2450m²',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Cetim de Evento',
    category: 'Decoração de Eventos',
    price: 8.90,
    availableArea: '890m²',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Jeans Reciclado Premium',
    category: 'Uniformes Corporativos',
    price: 12.40,
    availableArea: '1560m²',
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Lycra Colorida Reciclada',
    category: 'Fantasias de Carnaval',
    price: 6.72,
    availableArea: '1136m²',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Linho Sustentável',
    category: 'Decoração de Eventos',
    price: 15.30,
    availableArea: '450m²',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Malha Reciclada Confort',
    category: 'Uniformes Corporativos',
    price: 7.80,
    availableArea: '2100m²',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop'
  },
  {
    id: 7,
    name: 'Brim Resistente',
    category: 'Fardas Industriais',
    price: 9.50,
    availableArea: '1800m²',
    image: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=400&h=400&fit=crop'
  },
  {
    id: 8,
    name: 'Organza Festiva',
    category: 'Fantasias de Carnaval',
    price: 11.20,
    availableArea: '680m²',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=400&fit=crop'
  },
])

const filteredProducts = computed(() => {
  let products = [...allProducts.value]

  // Filter by category
  if (selectedCategory.value !== 'Todos') {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'name-asc':
      products.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      products.sort((a, b) => b.name.localeCompare(a.name))
      break
    case 'price-asc':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      products.sort((a, b) => b.price - a.price)
      break
  }

  return products
})

const productCount = computed(() => filteredProducts.value.length)

const selectCategory = (category: string) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <section class="bg-surface py-6 md:py-8 lg:py-12 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4 md:mb-6 text-center">
          Catálogo de Tecidos
        </h1>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-6 md:mb-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar tecido..."
              class="input-field pl-12 pr-4 min-h-12"
            >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Category Pills - Horizontally scrollable on mobile -->
        <div class="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 mb-6">
          <div class="flex md:flex-wrap items-center md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0">
            <button
              v-for="category in categories"
              :key="category"
              :class="[
                'category-pill min-h-10 px-4 py-2 text-sm whitespace-nowrap',
                selectedCategory === category ? 'category-pill-active' : 'category-pill-inactive'
              ]"
              @click="selectCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Sort & Count -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <p class="text-text-secondary text-sm md:text-base">
            <span class="font-semibold text-text-primary">{{ productCount }}</span> produtos encontrados
          </p>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <label for="sort" class="text-sm text-text-secondary whitespace-nowrap">Ordenar por:</label>
            <select
              id="sort"
              v-model="sortBy"
              class="input-field py-2 pr-8 min-h-10 flex-1 sm:flex-none sm:min-w-[160px]"
            >
              <option 
                v-for="option in sortOptions" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-8 md:py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div 
          v-if="filteredProducts.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Empty State -->
        <div 
          v-else
          class="text-center py-12 md:py-16"
        >
          <div class="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 md:w-10 md:h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-text-primary mb-2">Nenhum produto encontrado</h3>
          <p class="text-text-secondary mb-6 text-sm md:text-base">Tente ajustar os filtros ou buscar por outro termo.</p>
          <button 
            class="btn-outline w-full sm:w-auto min-h-12"
            @click="searchQuery = ''; selectedCategory = 'Todos'"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
