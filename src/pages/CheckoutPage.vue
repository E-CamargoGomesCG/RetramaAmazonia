<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const orderItems = ref([
  {
    id: 4,
    name: 'Lycra Colorida Reciclada',
    price: 6.72,
    quantity: 2.1,
    unit: 'm²',
  },
  {
    id: 2,
    name: 'Cetim de Evento',
    price: 8.90,
    quantity: 1.5,
    unit: 'm²',
  },
])

// Form state
const addressForm = reactive({
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
})

const paymentMethod = ref<'card' | 'pix' | 'boleto'>('pix')

// UI state
const isProcessing = ref(false)
const orderComplete = ref(false)
const orderNumber = ref('')

// Computed
const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 15.90
})

const total = computed(() => {
  return subtotal.value + shipping.value
})

// Formatters
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// Methods
const fetchAddress = async () => {
  if (addressForm.cep.length === 8) {
    // Simulated address lookup
    addressForm.street = 'Rua Exemplo'
    addressForm.neighborhood = 'Centro'
    addressForm.city = 'Manaus'
    addressForm.state = 'AM'
  }
}

const submitOrder = async () => {
  isProcessing.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  orderNumber.value = `RET${Date.now().toString().slice(-8)}`
  isProcessing.value = false
  orderComplete.value = true
}

const goToHome = () => {
  window.location.href = '/'
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Success State -->
    <div v-if="orderComplete" class="min-h-screen flex items-center justify-center px-4">
      <div class="max-w-md w-full text-center">
        <div class="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 md:w-10 md:h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-text-primary mb-2">Pedido Confirmado!</h1>
        <p class="text-text-secondary mb-4 text-sm md:text-base">
          Seu pedido foi realizado com sucesso. Em breve você receberá um e-mail com os detalhes.
        </p>
        <p class="text-sm text-text-muted mb-6 md:mb-8">
          Número do pedido: <span class="font-semibold text-primary">{{ orderNumber }}</span>
        </p>
        <button 
          class="btn-primary w-full sm:w-auto min-h-12"
          @click="goToHome"
        >
          Voltar ao Início
        </button>
      </div>
    </div>

    <!-- Checkout Form -->
    <template v-else>
      <!-- Header -->
      <div class="bg-surface border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <h1 class="text-2xl md:text-3xl font-bold text-text-primary">Checkout</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div class="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
          <!-- Forms Column - Mobile: Full width, Desktop: 8 cols -->
          <div class="lg:col-span-8 space-y-6 md:space-y-8 order-1">
            <!-- Address Section -->
            <section class="card p-4 md:p-6">
              <h2 class="text-lg md:text-xl font-bold text-text-primary mb-4 md:mb-6">Endereço de Entrega</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-1">
                  <label class="block text-sm font-medium text-text-secondary mb-2">CEP</label>
                  <input
                    v-model="addressForm.cep"
                    type="text"
                    placeholder="00000-000"
                    maxlength="8"
                    class="input-field min-h-12"
                    @blur="fetchAddress"
                  >
                </div>
                <div class="sm:col-span-1 hidden sm:block"></div>
                
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-text-secondary mb-2">Rua</label>
                  <input
                    v-model="addressForm.street"
                    type="text"
                    placeholder="Nome da rua"
                    class="input-field min-h-12"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Número</label>
                  <input
                    v-model="addressForm.number"
                    type="text"
                    placeholder="123"
                    class="input-field min-h-12"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Complemento</label>
                  <input
                    v-model="addressForm.complement"
                    type="text"
                    placeholder="Apto, Bloco, etc."
                    class="input-field min-h-12"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Bairro</label>
                  <input
                    v-model="addressForm.neighborhood"
                    type="text"
                    placeholder="Bairro"
                    class="input-field min-h-12"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Cidade</label>
                  <input
                    v-model="addressForm.city"
                    type="text"
                    placeholder="Cidade"
                    class="input-field min-h-12"
                  >
                </div>
                
                <div class="sm:col-span-2 md:col-span-1">
                  <label class="block text-sm font-medium text-text-secondary mb-2">Estado</label>
                  <select
                    v-model="addressForm.state"
                    class="input-field min-h-12"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Payment Section -->
            <section class="card p-4 md:p-6">
              <h2 class="text-lg md:text-xl font-bold text-text-primary mb-4 md:mb-6">Método de Pagamento</h2>
              
              <div class="space-y-3 md:space-y-4">
                <!-- PIX -->
                <label 
                  class="flex items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg cursor-pointer transition-all duration-200 min-h-16"
                  :class="paymentMethod === 'pix' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
                >
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="pix"
                    class="w-5 h-5 text-primary focus:ring-primary"
                  >
                  <div class="flex-1 min-w-0">
                    <span class="font-medium text-text-primary text-sm md:text-base">PIX</span>
                    <p class="text-xs md:text-sm text-text-muted">Pagamento instantâneo com desconto de 5%</p>
                  </div>
                  <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">5% OFF</span>
                </label>

                <!-- Credit Card -->
                <label 
                  class="flex items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg cursor-pointer transition-all duration-200 min-h-16"
                  :class="paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
                >
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="card"
                    class="w-5 h-5 text-primary focus:ring-primary"
                  >
                  <div class="flex-1 min-w-0">
                    <span class="font-medium text-text-primary text-sm md:text-base">Cartão de Crédito</span>
                    <p class="text-xs md:text-sm text-text-muted">Parcele em até 12x sem juros</p>
                  </div>
                </label>

                <!-- Boleto -->
                <label 
                  class="flex items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg cursor-pointer transition-all duration-200 min-h-16"
                  :class="paymentMethod === 'boleto' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
                >
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="boleto"
                    class="w-5 h-5 text-primary focus:ring-primary"
                  >
                  <div class="flex-1 min-w-0">
                    <span class="font-medium text-text-primary text-sm md:text-base">Boleto Bancário</span>
                    <p class="text-xs md:text-sm text-text-muted">Vencimento em 3 dias úteis</p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <!-- Order Summary Sidebar - Mobile: Full width (appears last), Desktop: 4 cols with sticky -->
          <div class="lg:col-span-4 order-2">
            <div class="card p-4 md:p-6 lg:sticky lg:top-24">
              <h2 class="text-lg md:text-xl font-bold text-text-primary mb-4 md:mb-6">Resumo do Pedido</h2>

              <!-- Items -->
              <div class="space-y-4 mb-4 md:mb-6">
                <div 
                  v-for="item in orderItems" 
                  :key="item.id"
                  class="flex justify-between text-sm"
                >
                  <div class="min-w-0 flex-1 pr-2">
                    <p class="text-text-primary font-medium truncate">{{ item.name }}</p>
                    <p class="text-text-muted">{{ item.quantity }} {{ item.unit }}</p>
                  </div>
                  <span class="text-text-primary font-medium whitespace-nowrap">
                    {{ formatCurrency(item.price * item.quantity) }}
                  </span>
                </div>
              </div>

              <!-- Summary -->
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
                <div v-if="paymentMethod === 'pix'" class="flex justify-between text-sm">
                  <span class="text-text-secondary">Desconto PIX (5%)</span>
                  <span class="text-green-600 font-medium">
                    -{{ formatCurrency(total * 0.05) }}
                  </span>
                </div>
              </div>

              <!-- Total -->
              <div class="flex justify-between items-center border-t border-gray-100 mt-4 pt-4">
                <span class="text-base md:text-lg font-semibold text-text-primary">Total</span>
                <span class="text-xl md:text-2xl font-bold text-primary">
                  {{ formatCurrency(paymentMethod === 'pix' ? total * 0.95 : total) }}
                </span>
              </div>

              <!-- Submit Button - Full width on all sizes -->
              <button 
                class="btn-primary w-full mt-6 flex items-center justify-center gap-2 min-h-12"
                :disabled="isProcessing"
                @click="submitOrder"
              >
                <svg 
                  v-if="isProcessing" 
                  class="animate-spin w-5 h-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isProcessing ? 'Processando...' : 'Confirmar Pedido' }}
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
      </div>
    </template>
  </div>
</template>
