<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ui/ProductCard.vue'

const router = useRouter()

const categories = ref([
  { id: 'todos', name: 'Todos' },
  { id: 'fardas', name: 'Fardas Industriais' },
  { id: 'decoracao', name: 'Decoração de Eventos' },
  { id: 'carnaval', name: 'Fantasias de Carnaval' },
  { id: 'uniformes', name: 'Uniformes Corporativos' },
])

const selectedCategory = ref('todos')

const featuredProducts = ref([
  {
    id: 1,
    name: 'Algodão Industrial Misto',
    category: 'Industrial',
    price: 4.50,
    availableArea: '2450m²',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Cetim de Evento',
    category: 'Eventos',
    price: 8.90,
    availableArea: '890m²',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Jeans Reciclado Premium',
    category: 'Moda',
    price: 12.40,
    availableArea: '1560m²',
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Lycra Colorida Reciclada',
    category: 'Carnaval',
    price: 6.72,
    availableArea: '1136m²',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
  },
])

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'todos') {
    return featuredProducts.value
  }
  return featuredProducts.value.filter(p => 
    p.category.toLowerCase().includes(selectedCategory.value.toLowerCase())
  )
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const navigateToCatalog = () => {
  router.push('/catalogo')
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&h=1080&fit=crop"
          alt="Tecidos reciclados"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div class="max-w-2xl">
          <span class="inline-block text-secondary font-medium text-xs md:text-sm tracking-wider uppercase mb-3 md:mb-4">
            Sustentabilidade em cada fio
          </span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6 text-balance">
            Tecidos Reciclados com Alma Amazônica
          </h1>
          <p class="text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed max-w-xl">
            Transformamos resíduos têxteis em matéria-prima de qualidade. 
            Contribua para um futuro mais sustentável enquanto economiza.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              class="btn-primary text-base px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto min-h-12 active:scale-95 transition-transform"
              @click="navigateToCatalog"
            >
              Explorar Catálogo
            </button>
            <button class="btn-outline border-white text-white hover:bg-white hover:text-primary text-base px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto min-h-12 active:scale-95 transition-transform">
              Saiba Mais
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-8 md:py-12 bg-surface">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'category-pill min-h-10 md:min-h-10 px-4 md:px-5 py-2 text-sm active:scale-95 transition-all duration-200',
              selectedCategory === category.id ? 'category-pill-active' : 'category-pill-inactive'
            ]"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Mid-Page Promotional Banner -->
    <section class="bg-primary py-10 md:py-14">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <span class="inline-block text-secondary font-semibold text-xs tracking-wider uppercase mb-2">
              Lançamento
            </span>
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 text-balance">
              Nova Coleção: Tecidos Industriais de Alta Performance
            </h2>
            <p class="text-white/80 text-sm md:text-base max-w-xl">
              Resistência e sustentabilidade para os projetos mais exigentes.
            </p>
          </div>
          <button 
            class="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 w-full md:w-auto min-h-12 active:scale-95 flex-shrink-0"
            @click="navigateToCatalog"
          >
            Conferir Agora
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-12 md:py-16 lg:py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 md:mb-4">
            Produtos em Destaque
          </h2>
          <p class="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
            Descubra nossa seleção de tecidos reciclados de alta qualidade, 
            perfeitos para diversos projetos criativos e industriais.
          </p>
        </div>

        <!-- Products Grid - Mobile First: 1 col -> 2 cols -> 4 cols -->
        <Transition name="fade" mode="out-in">
          <div :key="selectedCategory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </Transition>

        <div class="text-center mt-8 md:mt-12">
          <button 
            class="btn-outline w-full sm:w-auto min-h-12 active:scale-95 transition-transform"
            @click="navigateToCatalog"
          >
            Ver Todos os Produtos
          </button>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="como-funciona" class="py-12 md:py-16 lg:py-24 bg-surface">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 md:mb-4">
            Como Funciona
          </h2>
          <p class="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
            Um processo simples e transparente para você adquirir tecidos sustentáveis.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div class="text-center group">
            <div class="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <span class="text-xl md:text-2xl font-bold text-primary">1</span>
            </div>
            <h3 class="text-lg md:text-xl font-semibold text-text-primary mb-2">Escolha seu Tecido</h3>
            <p class="text-text-secondary text-sm md:text-base">
              Navegue pelo nosso catálogo e encontre o tecido ideal para seu projeto.
            </p>
          </div>
          <div class="text-center group">
            <div class="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <span class="text-xl md:text-2xl font-bold text-primary">2</span>
            </div>
            <h3 class="text-lg md:text-xl font-semibold text-text-primary mb-2">Faça seu Pedido</h3>
            <p class="text-text-secondary text-sm md:text-base">
              Selecione a quantidade desejada e finalize sua compra de forma segura.
            </p>
          </div>
          <div class="text-center group">
            <div class="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <span class="text-xl md:text-2xl font-bold text-primary">3</span>
            </div>
            <h3 class="text-lg md:text-xl font-semibold text-text-primary mb-2">Receba em Casa</h3>
            <p class="text-text-secondary text-sm md:text-base">
              Entregamos em todo o Brasil com rapidez e segurança.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 md:py-16 lg:py-24 bg-primary">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
          Pronto para fazer a diferença?
        </h2>
        <p class="text-white/80 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
          Junte-se a centenas de empresas e artesãos que já escolheram 
          a sustentabilidade como parte de seus negócios.
        </p>
        <button 
          class="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto min-h-12 active:scale-95"
          @click="navigateToCatalog"
        >
          Começar Agora
        </button>
      </div>
    </section>
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
