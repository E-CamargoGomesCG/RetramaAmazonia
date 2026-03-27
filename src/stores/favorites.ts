import { reactive, readonly, computed } from 'vue'

interface Product {
  id: number
  name: string
  category: string
  price: number
  availableArea: string
  image: string
}

interface FavoritesState {
  items: Product[]
}

const state = reactive<FavoritesState>({
  items: []
})

export function useFavorites() {
  const isFavorite = (productId: number): boolean => {
    return state.items.some(item => item.id === productId)
  }

  const toggleFavorite = (product: Product) => {
    const index = state.items.findIndex(item => item.id === product.id)
    if (index !== -1) {
      state.items.splice(index, 1)
    } else {
      state.items.push({ ...product })
    }
  }

  const removeFavorite = (productId: number) => {
    const index = state.items.findIndex(item => item.id === productId)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  }

  const clearFavorites = () => {
    state.items.splice(0, state.items.length)
  }

  const favoritesCount = computed(() => state.items.length)

  return {
    state: readonly(state),
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount
  }
}
