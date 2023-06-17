<template>
  <div class="flex flex-wrap">
      <div
        v-for="product in products"
        :key="product.id"
        class="flex flex-col items-center justify-center w-1/4 p-4"
      >
        <img :src="product.image" class="w-1/2" :alt="product.title" />
        <h3 class="text-lg font-bold">{{ product.title }}</h3>
        <p class="text-sm">{{ formatCurrency(product.price) }}</p>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="cartStore.addProduct({ id: product.id, title: product.title, price: product.price })"
        >
          Add to cart
        </button>
      </div>
      <div v-if="!products.length && !loading" class="w-full text-center mt-4">
        No products found
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../helpers/formatCurrency'

const cartStore = useCartStore()
const products: Ref<{ id: number, title: string, image: string, price: number }[]> = ref([])
const loading = ref(true)

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    products.value = json
  })
  .catch(err => console.error(err))
  .finally(() => {
    loading.value = false
  })
</script>
