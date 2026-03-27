import { reactive, readonly } from 'vue'

interface User {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  address: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

const state = reactive<AuthState>({
  isLoggedIn: false,
  user: null
})

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(92) 98765-4321',
  cpf: '123.456.789-00',
  address: {
    street: 'Av. Eduardo Ribeiro',
    number: '520',
    complement: 'Apt 102',
    neighborhood: 'Centro',
    city: 'Manaus',
    state: 'AM',
    zipCode: '69010-001'
  }
}

export function useAuth() {
  const login = (email: string, _password: string): boolean => {
    // Simulated login - accepts any email/password
    if (email && _password) {
      state.isLoggedIn = true
      state.user = { ...mockUser, email }
      return true
    }
    return false
  }

  const logout = () => {
    state.isLoggedIn = false
    state.user = null
  }

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      state.user = { ...state.user, ...userData }
    }
  }

  return {
    state: readonly(state),
    login,
    logout,
    updateUser
  }
}
