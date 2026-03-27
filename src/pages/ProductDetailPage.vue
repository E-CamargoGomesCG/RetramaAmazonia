<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const product = ref({
  id: 4,
  name: 'Lycra Colorida Reciclada',
  category: 'Carnaval',
  price: 6.72,
  availableArea: '1136m²',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
  description: 'Tecido de lycra reciclada de alta qualidade, ideal para confecção de fantasias de carnaval, roupas esportivas e peças que exigem elasticidade. Disponível em diversas cores vibrantes.',
  specifications: {
    composition: '85% Poliéster Reciclado, 15% Elastano',
    colors: 'Vermelho, Azul, Verde, Amarelo, Rosa',
    stock: '1136m²',
    weight: '180g/m²',
    width: '1,50m',
  }
})

const selectedUnit = ref<'m2' | 'kg'>('m2')
const quantity = ref(2.1)

const estimatedTotal = computed(() => {
  return quantity.value * product.value.price
})

const formattedTotal = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(estimatedTotal.value)
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.value.price)
})

const increaseQuantity = () => {
  quantity.value = Math.round((quantity.value + 0.1) * 10) / 10
}

const decreaseQuantity = () => {
  if (quantity.value > 0.1) {
    quantity.value = Math.round((quantity.value - 0.1) * 10) / 10
  }
}

const addToCart = () => {
  router.push('/carrinho')
}

interface AISuggestion {
  id: number
  title: string
  difficulty: 'Fácil' | 'Médio' | 'Avançado'
  description: string
}

const aiSuggestions = ref<AISuggestion[]>([
  {
    id: 1,
    title: 'Fantasia de Passista',
    difficulty: 'Avançado',
    description: 'Conjunto completo com saia de franja e top estruturado para desfiles de carnaval.'
  },
  {
    id: 2,
    title: 'Collant Esportivo',
    difficulty: 'Médio',
    description: 'Peça única para ginástica rítmica ou dança com acabamento profissional.'
  },
  {
    id: 3,
    title: 'Maiô Colorido',
    difficulty: 'Fácil',
    description: 'Maiô simples e confortável para atividades aquáticas ou uso casual.'
  },
  {
    id: 4,
    title: 'Capa de Bloco',
    difficulty: 'Fácil',
    description: 'Capa leve e vibrante para usar em blocos de rua durante o carnaval.'
  },
])

const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Fácil':
      return 'bg-green-100 text-green-700'
    case 'Médio':
      return 'bg-yellow-100 text-yellow-700'
    case 'Avançado':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const generateImage = (suggestionId: number) => {
  console.log('Gerando imagem para sugestão:', suggestionId)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Breadcrumb -->
    <div class="bg-surface border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <nav class="flex items-center gap-2 text-xs md:text-sm overflow-x-auto">
          <router-link to="/" class="text-text-muted hover:text-primary transition-colors whitespace-nowrap">Início</router-link>
          <span class="text-text-muted">/</span>
          <router-link to="/catalogo" class="text-text-muted hover:text-primary transition-colors whitespace-nowrap">Catálogo</router-link>
          <span class="text-text-muted">/</span>
          <span class="text-text-primary font-medium truncate">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <!-- Product Detail -->
    <section class="py-6 md:py-8 lg:py-12">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <!-- Mobile: Stacked (flex-col), Desktop: Grid 2 cols -->
        <div class="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <!-- Image - Full width on mobile, appears first -->
          <div class="w-full aspect-square bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden shadow-card">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-full object-cover"
            >
          </div>

          <!-- Info Column -->
          <div class="flex flex-col">
            <!-- Category -->
            <span class="inline-block self-start bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3 md:mb-4">
              {{ product.category }}
            </span>

            <!-- Title -->
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 md:mb-4">
              {{ product.name }}
            </h1>

            <!-- Price -->
            <p class="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">
              {{ formattedPrice }} <span class="text-sm md:text-base font-normal text-text-secondary">por m²</span>
            </p>

            <!-- Unit Selector -->
            <div class="mb-4 md:mb-6">
              <label class="block text-sm font-medium text-text-secondary mb-2">Unidade de medida</label>
              <div class="flex gap-2">
                <button
                  :class="[
                    'px-5 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 min-h-10',
                    selectedUnit === 'm2' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  ]"
                  @click="selectedUnit = 'm2'"
                >
                  m²
                </button>
                <button
                  :class="[
                    'px-5 md:px-6 py-2 rounded-lg font-medium transition-all duration-200 min-h-10',
                    selectedUnit === 'kg' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  ]"
                  @click="selectedUnit = 'kg'"
                >
                  kg
                </button>
              </div>
            </div>

            <!-- Description -->
            <p class="text-text-secondary mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              {{ product.description }}
            </p>

            <!-- Specifications -->
            <div class="bg-surface rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-gray-100">
              <h3 class="font-semibold text-text-primary mb-3 md:mb-4">Especificações</h3>
              <div class="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <span class="text-xs md:text-sm text-text-muted">Composição</span>
                  <p class="text-xs md:text-sm font-medium text-text-primary">{{ product.specifications.composition }}</p>
                </div>
                <div>
                  <span class="text-xs md:text-sm text-text-muted">Cores Disponíveis</span>
                  <p class="text-xs md:text-sm font-medium text-text-primary">{{ product.specifications.colors }}</p>
                </div>
                <div>
                  <span class="text-xs md:text-sm text-text-muted">Estoque</span>
                  <p class="text-xs md:text-sm font-medium text-text-primary">{{ product.specifications.stock }}</p>
                </div>
                <div>
                  <span class="text-xs md:text-sm text-text-muted">Gramatura</span>
                  <p class="text-xs md:text-sm font-medium text-text-primary">{{ product.specifications.weight }}</p>
                </div>
              </div>
            </div>

            <!-- Purchase Section -->
            <div class="bg-surface rounded-xl p-4 md:p-6 border border-gray-100">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Quantidade ({{ selectedUnit }})</label>
                  <div class="flex items-center gap-2">
                    <button
                      class="w-10 h-10 md:w-10 md:h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors min-h-10"
                      @click="decreaseQuantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      v-model.number="quantity"
                      type="number"
                      step="0.1"
                      min="0.1"
                      class="w-20 text-center input-field py-2 min-h-10"
                    >
                    <button
                      class="w-10 h-10 md:w-10 md:h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors min-h-10"
                      @click="increaseQuantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="text-left sm:text-right">
                  <span class="text-sm text-text-muted">Total Estimado</span>
                  <p class="text-xl md:text-2xl font-bold text-primary">{{ formattedTotal }}</p>
                </div>
              </div>
              <button 
                class="btn-primary w-full text-base min-h-12"
                @click="addToCart"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Suggestions Section -->
    <section class="py-10 md:py-12 lg:py-16 bg-surface">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="text-center mb-8 md:mb-10">
          <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-2">
            O que posso criar com esse tecido?
          </h2>
          <p class="text-text-secondary text-sm md:text-base">
            Sugestões geradas por inteligência artificial para inspirar sua criatividade
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <article
            v-for="suggestion in aiSuggestions"
            :key="suggestion.id"
            class="card p-4 md:p-6"
          >
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-semibold text-text-primary text-sm md:text-base">{{ suggestion.title }}</h3>
              <span 
                :class="[
                  'text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ml-2',
                  getDifficultyColor(suggestion.difficulty)
                ]"
              >
                {{ suggestion.difficulty }}
              </span>
            </div>
            <p class="text-xs md:text-sm text-text-secondary mb-4 leading-relaxed">
              {{ suggestion.description }}
            </p>
            <button 
              class="w-full py-2 border border-primary text-primary rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-all duration-200 min-h-10"
              @click="generateImage(suggestion.id)"
            >
              Gerar Imagem
            </button>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
