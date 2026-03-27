<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth'
import { useCart } from '../../stores/cart'
import { useFavorites } from '../../stores/favorites'
import LoginModal from '../auth/LoginModal.vue'

const router = useRouter()
const { state: authState } = useAuth()
const { itemCount: cartCount } = useCart()
const { favoritesCount } = useFavorites()

const isMobileMenuOpen = ref(false)
const isLoginModalOpen = ref(false)

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Catálogo', path: '/catalogo' },
  { name: 'Como Funciona', path: '#como-funciona' },
  { name: 'Quem Somos', path: '/sobre' },
]

const isLoggedIn = computed(() => authState.isLoggedIn)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const openLoginModal = () => {
  isLoginModalOpen.value = true
  isMobileMenuOpen.value = false
}

const closeLoginModal = () => {
  isLoginModalOpen.value = false
}

const navigateTo = (path: string) => {
  if (path.startsWith('#')) {
    // Handle anchor links
    return
  }
  router.push(path)
  isMobileMenuOpen.value = false
}

const goToAccount = () => {
  router.push('/minha-conta')
  isMobileMenuOpen.value = false
}

const goToFavorites = () => {
  router.push('/favoritos')
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-surface shadow-card">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <div 
          class="flex-shrink-0 cursor-pointer"
          @click="navigateTo('/')"
        >
          <div class="flex flex-col">
            <span class="text-xl md:text-2xl font-bold text-primary tracking-tight">RETRAMA</span>
            <span class="text-[10px] md:text-xs text-text-secondary tracking-widest -mt-1">AMAZÔNIA</span>
          </div>
        </div>

        <!-- Desktop Navigation - Hidden on mobile -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.path"
            class="text-text-primary font-medium hover:text-primary transition-colors duration-200 text-sm lg:text-base"
            @click.prevent="navigateTo(link.path)"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Right Section -->
        <div class="flex items-center gap-2 md:gap-4">
          <!-- Search Icon - Hidden on mobile -->
          <button 
            class="hidden md:flex p-2 text-text-secondary hover:text-primary transition-colors duration-200 active:scale-95"
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Favorites Icon - Hidden on mobile -->
          <button 
            class="hidden md:flex p-2 text-text-secondary hover:text-primary transition-colors duration-200 relative active:scale-95"
            aria-label="Favoritos"
            @click="goToFavorites"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span 
              v-if="favoritesCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ favoritesCount }}
            </span>
          </button>

          <!-- User Icon / Login - Hidden on mobile -->
          <button 
            v-if="!isLoggedIn"
            class="hidden md:flex p-2 text-text-secondary hover:text-primary transition-colors duration-200 active:scale-95"
            aria-label="Entrar"
            @click="openLoginModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button 
            v-else
            class="hidden md:flex p-2 text-primary hover:text-primary-dark transition-colors duration-200 active:scale-95"
            aria-label="Minha Conta"
            @click="goToAccount"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Cart Icon - Always visible -->
          <button 
            class="relative p-2 min-h-10 min-w-10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-200 active:scale-95"
            aria-label="Carrinho"
            @click="navigateTo('/carrinho')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
              {{ cartCount }}
            </span>
          </button>

          <!-- CTA Button - Hidden on mobile -->
          <button 
            class="hidden lg:block btn-primary text-sm active:scale-95 transition-transform"
            @click="navigateTo('/catalogo')"
          >
            Comprar Agora
          </button>

          <!-- Mobile Menu Button - Only visible on mobile -->
          <button 
            class="md:hidden p-2 min-h-10 min-w-10 flex items-center justify-center text-text-secondary hover:text-primary active:scale-95"
            aria-label="Menu"
            @click="toggleMobileMenu"
          >
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation - Slide down menu -->
      <Transition name="slide">
        <div 
          v-show="isMobileMenuOpen"
          class="md:hidden border-t border-gray-100 py-4"
        >
          <nav class="flex flex-col gap-2">
            <a
              v-for="link in navLinks"
              :key="link.name"
              :href="link.path"
              class="text-text-primary font-medium hover:text-primary hover:bg-primary/5 transition-colors duration-200 py-3 px-2 rounded-lg min-h-12 flex items-center active:scale-95"
              @click.prevent="navigateTo(link.path)"
            >
              {{ link.name }}
            </a>
            
            <!-- Mobile: Favorites Link -->
            <button 
              class="text-text-primary font-medium hover:text-primary hover:bg-primary/5 transition-colors duration-200 py-3 px-2 rounded-lg min-h-12 flex items-center gap-2 active:scale-95 w-full text-left"
              @click="goToFavorites"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favoritos
              <span 
                v-if="favoritesCount > 0"
                class="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ favoritesCount }}
              </span>
            </button>
            
            <!-- Mobile: Login/Account Link -->
            <button 
              v-if="!isLoggedIn"
              class="text-text-primary font-medium hover:text-primary hover:bg-primary/5 transition-colors duration-200 py-3 px-2 rounded-lg min-h-12 flex items-center gap-2 active:scale-95 w-full text-left"
              @click="openLoginModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Entrar
            </button>
            <button 
              v-else
              class="text-primary font-medium hover:bg-primary/5 transition-colors duration-200 py-3 px-2 rounded-lg min-h-12 flex items-center gap-2 active:scale-95 w-full text-left"
              @click="goToAccount"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
              Minha Conta
            </button>
            
            <button 
              class="btn-primary text-sm w-full mt-2 min-h-12 active:scale-95 transition-transform"
              @click="navigateTo('/catalogo')"
            >
              Comprar Agora
            </button>
          </nav>
        </div>
      </Transition>
    </div>
  </header>

  <!-- Login Modal -->
  <LoginModal 
    :is-open="isLoginModalOpen" 
    @close="closeLoginModal"
  />
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
