import { defineStore } from 'pinia'

type CartProduct = {
  title: string
  quantity: number
  price: number
  id?: number
}

type Cart = {
  [ key: number ]: CartProduct
}

const getCartProducts = (): Cart => {
  if (sessionStorage.getItem('cartProducts')) {
      return JSON.parse(sessionStorage.getItem('cartProducts'))
  }
  return {}
}

export const useCartStore = defineStore('useCartStore',{
  state: () => ({
    cartProducts: getCartProducts()
  }),
  getters: {
    getCartProducts() {
      return this.cartProducts
    },
    getCartProductsArray(): CartProduct[] {
      return Object.entries(this.cartProducts as Cart).map(([id, product]) => {
        const productId = Number(id)
        return {
          id: productId,
          ...product
        }
      })
    },
    getCartProductsCount() {
      return Object.values(this.cartProducts as Cart).reduce((acc, product) => {
        return acc + product.quantity
      }, 0)
    },
    getCartProductsTotalPrice() {
      return Object.values(this.cartProducts as Cart).reduce((acc, product) => {
        return acc + product.quantity * product.price
      }, 0)
    }
  },
  actions: {
    addProduct(product: { id: number, title: string, price: number }) {
      if (Object.keys(this.cartProducts as Cart).includes(product.id.toString())) {
        this.cartProducts[product.id].quantity++
        return
      }
      this.cartProducts[product.id] = {
        title: product.title,
        price: product.price,
        quantity: 1
      }
    },
    removeProduct(productId: number) {
      delete this.cartProducts[productId]
    }
  }
})
