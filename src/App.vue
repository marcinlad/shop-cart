<script setup>
import TheCart from '@/components/TheCart.vue'
import Products from '@/components/Products.vue'
</script>

<template>
  <header class="bg-gray-200 p-4 flex justify-between sticky top-0">
    <h1 class="text-2xl font-bold">Vue 3 Composition API Shopping Cart</h1>
    <TheCart />
  </header>
  <main class="max-w-[1200px] mx-auto">
      <Products />
  </main>
</template>
