// src/features/cart/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit'

// Тип данных для элемента корзины
export type CartItem = {
  id: number
  title: string
  price: number
  count: number
  image: string
}

// Тип состояния корзины
export type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Пока заглушка — будем расширять на следующих этапах
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      )

      if (existingItemIndex >= 0) {
        // Увеличиваем количество, если товар уже есть
        state.items[existingItemIndex].count += action.payload.count || 1
      } else {
        // Добавляем товар
        state.items.push(action.payload)
      }
    },
    clearCart: state => {
      state.items = []
    },
  },
})

export const { addToCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
