// src/features/product/type.ts
export interface Product {
  id: number
  category: number // categoryId из данных сервера
  title: string
  price: number
  images: string[]
  sku?: string
  manufacturer?: string
  color?: string
  material?: string
  season?: string
  reason?: string
  heelSize?: string
  sizes: {
    size: string
    available: boolean
  }[]
}

// export type TopSaleItem = Pick<Product, 'id' | 'title' | 'price' | 'images'>

export interface CartItem {
  id: number
  title: string
  price: number
  image: string // Первая картинка из массива images
  size: string
  quantity: number
}
