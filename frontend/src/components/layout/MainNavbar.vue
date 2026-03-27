<script setup>
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  Bars3Icon,
} from '@heroicons/vue/24/outline'
</script>

<template>
  <header class="border-b border-gray-200 bg-white fixed top-0 left-0 w-full z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- AREA LOGO -->
        <div class="flex items-center flex-1">
          <img src="/src/assets/images/logo.png" alt="Logo" class="h-10 w-auto rounded-full" />
        </div>

        <!-- AREA MENU NAVBAR -->
        <nav class="hidden md:flex items-center gap-8 font-medium flex-2 justify-center">
          <a href="#" class="hover:text-gray-700 text-gray-600">Pria</a>
          <a href="#" class="hover:text-gray-700 text-gray-600">Wanita</a>
          <a href="#" class="hover:text-gray-700 text-gray-600">Anak - Anak</a>
          <a href="#" class="hover:text-gray-700 text-gray-600">Promo</a>
        </nav>

        <!-- AREA ACTION -->
        <div class="flex items-center gap-4 flex-1 justify-end">
          <!-- SEARCH BAR -->
          <div class="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1.5">
            <MagnifyingGlassIcon class="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              class="bg-transparent outline-none px-2 text-sm w-28"
            />
          </div>

          <!-- ACTION BUTTON -->
          <button class="p-2 hover:bg-gray-100 rounded-full">
            <HeartIcon class="w-5 h-5" />
          </button>

          <button class="p-2 hover:bg-gray-100 rounded-full">
            <ShoppingBagIcon class="w-5 h-5" />
          </button>

          <!-- ACTION BUTTON MOBILE -->
          <button class="md:hidden p-2 hover:bg-gray-100 rounded-full">
            <Bars3Icon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- MENU MOBILE -->
    <div class="md:hidden border-t">
      <nav class="flex flex-col px-4 py-3 gap-3 font-medium">
        <a href="#">New & Featured</a>
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Sale</a>
        <a href="#">SNKRS</a>
      </nav>
    </div>
  </header>
</template>