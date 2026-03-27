<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const router = useRouter()
const { state: authState, logout, updateUser } = useAuth()

onMounted(() => {
  if (!authState.isLoggedIn) {
    router.push('/')
  }
})

type Tab = 'dados' | 'pedidos' | 'favoritos'
const activeTab = ref<Tab>('dados')

const formData = ref({
  name: '',
  email: '',
  phone: '',
  cpf: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: ''
})

onMounted(() => {
  if (authState.user) {
    formData.value = {
      name: authState.user.name,
      email: authState.user.email,
      phone: authState.user.phone,
      cpf: authState.user.cpf,
      street: authState.user.address.street,
      number: authState.user.address.number,
      complement: authState.user.address.complement,
      neighborhood: authState.user.address.neighborhood,
      city: authState.user.address.city,
      state: authState.user.address.state,
      zipCode: authState.user.address.zipCode
    }
  }
})

const isSaving = ref(false)
const saveSuccess = ref(false)

const saveUserData = async () => {
  isSaving.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  
  updateUser({
    name: formData.value.name,
    email: formData.value.email,
    phone: formData.value.phone,
    cpf: formData.value.cpf,
    address: {
      street: formData.value.street,
      number: formData.value.number,
      complement: formData.value.complement,
      neighborhood: formData.value.neighborhood,
      city: formData.value.city,
      state: formData.value.state,
      zipCode: formData.value.zipCode
    }
  })
  
  isSaving.value = false
  saveSuccess.value = true
  setTimeout(() => saveSuccess.value = false, 3000)
}

// Mock orders data
const orders = ref([
  {
    id: 'PED-2026-0042',
    date: '2026-03-15',
    total: 156.80,
    status: 'delivered',
    statusLabel: 'Entregue',
    items: [
      { name: 'Algodão Industrial Misto', quantity: 3.5, unit: 'm²' },
      { name: 'Cetim de Evento', quantity: 2.0, unit: 'm²' }
    ]
  },
  {
    id: 'PED-2026-0038',
    date: '2026-03-10',
    total: 89.50,
    status: 'transit',
    statusLabel: 'Em Trânsito',
    items: [
      { name: 'Jeans Reciclado Premium', quantity: 1.8, unit: 'm²' }
    ]
  },
  {
    id: 'PED-2026-0031',
    date: '2026-02-28',
    total: 234.00,
    status: 'delivered',
    statusLabel: 'Entregue',
    items: [
      { name: 'Lycra Colorida Reciclada', quantity: 4.2, unit: 'm²' },
      { name: 'Algodão Industrial Misto', quantity: 2.0, unit: 'm²' }
    ]
  }
])

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const handleLogout = () => {
  logout()
  router.push('/')
}

const sidebarItems = computed(() => [
  { id: 'dados' as Tab, label: 'Meus Dados', icon: 'user' },
  { id: 'pedidos' as Tab, label: 'Meus Pedidos', icon: 'package' },
  { id: 'favoritos' as Tab, label: 'Favoritos', icon: 'heart' }
])
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="bg-surface border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-text-primary">Minha Conta</h1>
        <p class="text-text-secondary mt-1">Gerencie suas informações e pedidos</p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Sidebar -->
        <aside class="lg:w-64 flex-shrink-0">
          <nav class="card p-2 lg:sticky lg:top-24">
            <ul class="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              <li v-for="item in sidebarItems" :key="item.id" class="flex-shrink-0">
                <button
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 min-h-12 whitespace-nowrap active:scale-95',
                    activeTab === item.id 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary hover:bg-gray-100'
                  ]"
                  @click="activeTab = item.id"
                >
                  <!-- User Icon -->
                  <svg v-if="item.icon === 'user'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <!-- Package Icon -->
                  <svg v-else-if="item.icon === 'package'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <!-- Heart Icon -->
                  <svg v-else-if="item.icon === 'heart'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span class="hidden lg:inline">{{ item.label }}</span>
                  <span class="lg:hidden">{{ item.label }}</span>
                </button>
              </li>
              <li class="flex-shrink-0 lg:mt-4 lg:pt-4 lg:border-t lg:border-gray-100">
                <button
                  class="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-all duration-200 min-h-12 whitespace-nowrap active:scale-95"
                  @click="handleLogout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
          <Transition name="fade" mode="out-in">
            <!-- Meus Dados -->
            <div v-if="activeTab === 'dados'" key="dados" class="card p-6">
              <h2 class="text-xl font-bold text-text-primary mb-6">Meus Dados</h2>
              
              <form @submit.prevent="saveUserData" class="space-y-6">
                <!-- Personal Info -->
                <div>
                  <h3 class="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">Informações Pessoais</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Nome Completo</label>
                      <input v-model="formData.name" type="text" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">E-mail</label>
                      <input v-model="formData.email" type="email" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Telefone</label>
                      <input v-model="formData.phone" type="tel" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">CPF</label>
                      <input v-model="formData.cpf" type="text" class="input-field w-full min-h-12" disabled>
                    </div>
                  </div>
                </div>

                <!-- Address -->
                <div>
                  <h3 class="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">Endereço</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">CEP</label>
                      <input v-model="formData.zipCode" type="text" class="input-field w-full md:w-48 min-h-12">
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Rua</label>
                      <input v-model="formData.street" type="text" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Número</label>
                      <input v-model="formData.number" type="text" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Complemento</label>
                      <input v-model="formData.complement" type="text" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Bairro</label>
                      <input v-model="formData.neighborhood" type="text" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Cidade</label>
                      <input v-model="formData.city" type="text" class="input-field w-full min-h-12">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-text-secondary mb-1.5">Estado</label>
                      <input v-model="formData.state" type="text" class="input-field w-full min-h-12">
                    </div>
                  </div>
                </div>

                <!-- Success Message -->
                <Transition name="fade">
                  <p v-if="saveSuccess" class="text-green-600 text-sm font-medium">
                    Dados salvos com sucesso!
                  </p>
                </Transition>

                <!-- Submit -->
                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="isSaving"
                    class="btn-primary min-h-12 px-8 flex items-center gap-2 active:scale-95 transition-transform"
                  >
                    <svg 
                      v-if="isSaving" 
                      class="animate-spin w-5 h-5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isSaving ? 'Salvando...' : 'Salvar Alterações' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Meus Pedidos -->
            <div v-else-if="activeTab === 'pedidos'" key="pedidos" class="space-y-4">
              <h2 class="text-xl font-bold text-text-primary mb-4">Meus Pedidos</h2>
              
              <article
                v-for="order in orders"
                :key="order.id"
                class="card p-4 md:p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <p class="font-semibold text-text-primary">{{ order.id }}</p>
                    <p class="text-sm text-text-muted">{{ formatDate(order.date) }}</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <span 
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-semibold',
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      ]"
                    >
                      {{ order.statusLabel }}
                    </span>
                    <span class="font-bold text-primary text-lg">{{ formatCurrency(order.total) }}</span>
                  </div>
                </div>
                <div class="border-t border-gray-100 pt-4">
                  <p class="text-sm text-text-secondary">
                    <span class="font-medium">Itens:</span>
                    {{ order.items.map(i => `${i.name} (${i.quantity}${i.unit})`).join(', ') }}
                  </p>
                </div>
              </article>
            </div>

            <!-- Favoritos Placeholder -->
            <div v-else-if="activeTab === 'favoritos'" key="favoritos" class="card p-6">
              <h2 class="text-xl font-bold text-text-primary mb-4">Meus Favoritos</h2>
              <p class="text-text-secondary">
                Acesse a página de <router-link to="/favoritos" class="text-primary hover:underline">Favoritos</router-link> para ver seus produtos salvos.
              </p>
            </div>
          </Transition>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
