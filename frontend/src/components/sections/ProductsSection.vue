<template>
  <section class="py-16 px-6 max-w-7xl mx-auto">
    <div class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold">Produk Terbaru</h2>
      <p class="text-gray-500 mt-1">Lihat semua jenis produk terbaru kami</p>
    </div>

    <!-- Wrapper GRID (Responsif) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      <!-- Looping Product Card -->
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from '../product/ProductCard.vue'

// Dummy data produk yang disimpan di dalam state reactive
const products = ref([
  {
    id: 1,
    name: 'Kaos Basic Ordinary Tee',
    category: 'T-Shirt',
    price: 129,
    image: '/src/assets/images/products/cloth-1.png',
  },
  {
    id: 2,
    name: 'Kaos Daily Comfort Wear',
    category: 'T-Shirt',
    price: 139,
    image: '/src/assets/images/products/cloth-2.png',
  },
  {
    id: 3,
    name: 'Kaos Urban Street Style',
    category: 'T-Shirt',
    price: 149,
    image: '/src/assets/images/products/cloth-3.png',
  },
  {
    id: 4,
    name: 'Kaos Essential Casual Fit',
    category: 'T-Shirt',
    price: 135,
    image: '/src/assets/images/products/cloth-4.png',
  },
  {
    id: 5,
    name: 'Kaos Modern Relax Tee',
    category: 'T-Shirt',
    price: 155,
    image: '/src/assets/images/products/cloth-5.png',
  },
  {
    id: 6,
    name: 'Kaos Minimal Classic Wear',
    category: 'T-Shirt',
    price: 145,
    image: '/src/assets/images/products/cloth-6.png',
  },
  {
    id: 7,
    name: 'Kaos Everyday Soft Touch',
    category: 'T-Shirt',
    price: 159,
    image: '/src/assets/images/products/cloth-7.png',
  },
  {
    id: 8,
    name: 'Kaos Premium Comfort Tee',
    category: 'T-Shirt',
    price: 169,
    image: '/src/assets/images/products/cloth-8.png',
  },
])
</script>