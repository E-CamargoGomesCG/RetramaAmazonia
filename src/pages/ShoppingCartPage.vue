<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const router = useRouter()
const { 
  state: cartState, 
  itemCount, 
  subtotal, 
  shipping, 
  discount, 
  total, 
  updateQuantity, 
  removeItem, 
  applyDiscount 
} = useCart()

const discountCode = ref('')
const discountError = ref(false)

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const increaseQuantity = (itemId: number) => {
  const item = cartState.items.find(i => i.id === itemId)
  if (item) {
    updateQuantity(itemId, Math.round((item.quantity + 0.1) * 10) / 10)
  }
}

const decreaseQuantity = (itemId: number) => {
  const item = cartState.items.find(i => i.id === itemId)
  if (item && item.quantity > 0.1) {
    updateQuantity(itemId, Math.round((item.quantity - 0.1) * 10) / 10)
  }
}

const handleApplyDiscount = () => {
  const success = applyDiscount(discountCode.value)
  discountError.value = !success && discountCode.value.length > 0
}

const goToCheckout = () => {
  router.push('/checkout')
}

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
          Seu Carrinho <span class="text-text-muted font-normal text-lg md:text-2xl">({{ itemCount }} {{ itemCount === 1 ? 'item' : 'itens' }})</span>
        </h1>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
      <Transition name="fade" mode="out-in">
        <div v-if="cartState.items.length > 0" key="cart-items" class="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
          <!-- Cart Items - Mobile: Full width, Desktop: 8 cols -->
          <div class="lg:col-span-8 space-y-4 order-1">
            <TransitionGroup name="list" tag="div" class="space-y-4">
              <article
                v-for="item in cartState.items"
                :key="item.id"
                class="card p-4 md:p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div class="flex flex-col sm:flex-row gap-4">
                  <!-- Image -->
                  <div class="w-full sm:w-24 h-40 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      :src="item.image" 
                      :alt="item.name"
                      class="w-full h-48 sm:h-full object-cover"
                    >
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-row items-start justify-between gap-2">
                      <div>
                        <span class="text-xs text-secondary font-semibold uppercase">{{ item.category }}</span>
                        <h3 class="font-semibold text-text-primary">{{ item.name }}</h3>
                        <p class="text-sm text-text-muted">{{ formatCurrency(item.price) }} por {{ item.unit }}</p>
                      </div>
                      <button 
                        class="text-text-muted hover:text-red-500 transition-colors p-2 min-h-10 min-w-10 flex items-center justify-center active:scale-95"
                        @click="removeItem(item.id)"
                        aria-label="Remover item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <!-- Quantity and Subtotal -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                      <div class="flex items-center gap-2">
                        <button
                          class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors min-h-10 active:scale-95"
                          @click="decreaseQuantity(item.id)"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          :value="item.quantity"
                          type="number"
                          step="0.1"
                          min="0.1"
                          class="w-16 text-center input-field py-1 text-sm min-h-10"
                          @change="updateQuantity(item.id, parseFloat(($event.target as HTMLInputElement).value))"
                        >
                        <button
                          class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors min-h-10 active:scale-95"
                          @click="increaseQuantity(item.id)"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <span class="text-sm text-text-muted ml-1">{{ item.unit }}</span>
                      </div>
                      <p class="text-lg font-semibold text-primary">
                        {{ formatCurrency(item.price * item.quantity) }}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </TransitionGroup>

            <!-- Continue Shopping -->
            <button 
              class="flex items-center gap-2 text-primary font-medium hover:underline mt-4 min-h-10 active:scale-95 transition-transform"
              @click="continueShopping"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continuar Comprando
            </button>
          </div>

          <!-- Summary Sidebar - Mobile: Full width (appears last), Desktop: 4 cols with sticky -->
          <div class="lg:col-span-4 order-last lg:order-2">
            <div class="card p-4 md:p-6 lg:sticky lg:top-24">
              <h2 class="text-lg md:text-xl font-bold text-text-primary mb-4 md:mb-6">Resumo do Pedido</h2>

              <!-- Discount Code -->
              <div class="mb-4 md:mb-6">
                <label class="block text-sm font-medium text-text-secondary mb-2">Cupom de Desconto</label>
                <div class="flex gap-2">
                  <input
                    v-model="discountCode"
                    type="text"
                    placeholder="Digite o código"
                    class="input-field flex-1 py-2 text-sm min-h-10"
                  >
                  <button 
                    class="px-4 py-2 bg-gray-100 text-text-secondary rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors min-h-10 active:scale-95"
                    @click="handleApplyDiscount"
                  >
                    Aplicar
                  </button>
                </div>
                <Transition name="fade">
                  <p v-if="cartState.appliedDiscount > 0" class="text-sm text-green-600 mt-2">
                    Cupom aplicado: {{ cartState.appliedDiscount }}% de desconto
                  </p>
                  <p v-else-if="discountError" class="text-sm text-red-500 mt-2">
                    Cupom inválido. Tente RETRAMA10.
                  </p>
                </Transition>
              </div>

              <!-- Summary Items -->
              <div class="space-y-3 border-t border-gray-100 pt-4">
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">Subtotal</span>
                  <span class="text-text-primary font-medium">{{ formatCurrency(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">Frete</span>
                  <span :class="shipping === 0 ? 'text-green-600 font-medium' : 'text-text-primary font-medium'">
                    {{ shipping === 0 ? 'Grátis' : formatCurrency(shipping) }}
                  </span>
                </div>
                <Transition name="fade">
                  <div v-if="discount > 0" class="flex justify-between text-sm">
                    <span class="text-text-secondary">Desconto</span>
                    <span class="text-green-600 font-medium">-{{ formatCurrency(discount) }}</span>
                  </div>
                </Transition>
              </div>

              <!-- Total -->
              <div class="flex justify-between items-center border-t border-gray-100 mt-4 pt-4">
                <span class="text-base md:text-lg font-semibold text-text-primary">Total</span>
                <span class="text-xl md:text-2xl font-bold text-primary">{{ formatCurrency(total) }}</span>
              </div>

              <!-- Free Shipping Notice -->
              <Transition name="fade">
                <p v-if="subtotal < 100" class="text-xs text-text-muted mt-4 text-center">
                  Falta {{ formatCurrency(100 - subtotal) }} para frete grátis!
                </p>
              </Transition>

              <!-- Checkout Button - Full width on all sizes -->
              <button 
                class="btn-primary w-full mt-6 min-h-12 active:scale-95 transition-transform"
                @click="goToCheckout"
              >
                Finalizar Compra
              </button>

              <!-- Secure Badge -->
              <div class="flex items-center justify-center gap-2 mt-4 text-text-muted text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pagamento 100% seguro
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Cart -->
        <div v-else key="empty-cart" class="text-center py-12 md:py-16">
          <div class="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 md:w-12 md:h-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 class="text-xl md:text-2xl font-bold text-text-primary mb-2">Seu carrinho está vazio</h2>
          <p class="text-text-secondary mb-6 md:mb-8 text-sm md:text-base">Adicione produtos ao carrinho para continuar.</p>
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

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-active {
  position: absolute;
}
</style>
