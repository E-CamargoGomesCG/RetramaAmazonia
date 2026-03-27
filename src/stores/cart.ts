import { reactive, readonly, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  unit: string
  image: string
}

interface CartState {
  items: CartItem[]
  discountCode: string
  appliedDiscount: number
}

const state = reactive<CartState>({
  items: [
    {
      id: 4,
      name: 'Lycra Colorida Reciclada',
      category: 'Carnaval',
      price: 6.72,
      quantity: 2.1,
      unit: 'm²',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Cetim de Evento',
      category: 'Eventos',
      price: 8.90,
      quantity: 1.5,
      unit: 'm²',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop'
    },
  ],
  discountCode: '',
  appliedDiscount: 0
})

export function useCart() {
  const itemCount = computed(() => state.items.length)

  const subtotal = computed(() => {
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const shipping = computed(() => {
    return subtotal.value > 100 ? 0 : 15.90
  })

  const discount = computed(() => {
    return (subtotal.value * state.appliedDiscount) / 100
  })

  const total = computed(() => {
    return subtotal.value + shipping.value - discount.value
  })

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    const existingItem = state.items.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity = Math.round((existingItem.quantity + quantity) * 10) / 10
    } else {
      state.items.push({ ...item, quantity })
    }
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const item = state.items.find(i => i.id === itemId)
    if (item && newQuantity >= 0.1) {
      item.quantity = Math.round(newQuantity * 10) / 10
    }
  }

  const removeItem = (itemId: number) => {
    const index = state.items.findIndex(i => i.id === itemId)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  }

  const applyDiscount = (code: string) => {
    state.discountCode = code
    if (code.toUpperCase() === 'RETRAMA10') {
      state.appliedDiscount = 10
      return true
    }
    state.appliedDiscount = 0
    return false
  }

  const clearCart = () => {
    state.items.splice(0, state.items.length)
    state.discountCode = ''
    state.appliedDiscount = 0
  }

  return {
    state: readonly(state),
    itemCount,
    subtotal,
    shipping,
    discount,
    total,
    addItem,
    updateQuantity,
    removeItem,
    applyDiscount,
    clearCart
  }
}
