<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''
  
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos.'
    return
  }

  isLoading.value = true
  
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const success = login(email.value, password.value)
  
  if (success) {
    emit('close')
    router.push('/minha-conta')
  } else {
    errorMessage.value = 'E-mail ou senha inválidos.'
  }
  
  isLoading.value = false
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closeModal"
        ></div>

        <!-- Modal -->
        <Transition name="scale">
          <div 
            v-if="isOpen"
            class="relative bg-surface rounded-2xl shadow-xl w-full max-w-md p-6 md:p-8"
          >
            <!-- Close Button -->
            <button 
              class="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors active:scale-95"
              @click="closeModal"
              aria-label="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Header -->
            <div class="text-center mb-6">
              <div class="flex flex-col items-center mb-4">
                <span class="text-2xl font-bold text-primary">RETRAMA</span>
                <span class="text-xs text-text-secondary tracking-widest">AMAZÔNIA</span>
              </div>
              <h2 class="text-xl md:text-2xl font-bold text-text-primary">Bem-vindo de volta!</h2>
              <p class="text-text-secondary text-sm mt-1">Entre na sua conta para continuar</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-text-secondary mb-1.5">
                  E-mail
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="seu@email.com"
                  class="input-field w-full min-h-12"
                  autocomplete="email"
                >
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-text-secondary mb-1.5">
                  Senha
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="input-field w-full min-h-12"
                  autocomplete="current-password"
                >
              </div>

              <!-- Error Message -->
              <Transition name="fade">
                <p v-if="errorMessage" class="text-red-500 text-sm text-center">
                  {{ errorMessage }}
                </p>
              </Transition>

              <!-- Forgot Password -->
              <div class="text-right">
                <a href="#" class="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="btn-primary w-full min-h-12 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <svg 
                  v-if="isLoading" 
                  class="animate-spin w-5 h-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
              </button>
            </form>

            <!-- Divider -->
            <div class="flex items-center gap-4 my-6">
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="text-sm text-text-muted">ou</span>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            <!-- Register Link -->
            <p class="text-center text-sm text-text-secondary">
              Não tem uma conta?
              <a href="#" class="text-primary font-medium hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
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

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
