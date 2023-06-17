<template>
  <button
    id="cart-button"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="showCart = !showCart"
  >
    Cart ({{ cartProductsCount }})
  </button>
  <div
    v-show="cartProducts.length && showCart"
    id="cart-content"
    class="absolute top-16 right-0 bg-white p-4 shadow-lg"
  >
      <div v-for="(product, index) in cartProducts" :key="index">
        {{ product.title }} - {{ product.quantity }}
        <span
          class="font-bold text-red-600 float-right ml-2 cursor-pointer"
          @click="cartStore.removeProduct(product.id)"
        >
            DELETE
        </span>
      </div>
      <p class="mt-2 font-bold">Total: {{ formatCurrency(cartStore.getCartProductsTotalPrice) }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../helpers/formatCurrency'

const cartStore = useCartStore()
const showCart = ref(false)

const cartProducts = computed(() => {
  return cartStore.getCartProductsArray
})
const cartProductsCount = computed(() => {
  return cartStore.getCartProductsCount
})

cartStore.$subscribe((_, state) => {
  sessionStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
})

onMounted(() => {
  document.addEventListener('click', (e) => {
    const clickedElement = e.target as HTMLElement
    if (!clickedElement.closest('#cart-content') && !clickedElement.closest('#cart-button')) {
      showCart.value = false
    }
  })
})
</script>

<style scoped>

</style>
