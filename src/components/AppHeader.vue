<script setup>
import { toRefs } from 'vue'
import { useCartStore } from '@/store/cart'

const emit = defineEmits(['onOpen'])

const { selectedPlaces } = toRefs(useCartStore())
const { setSection } = useCartStore()

function handleClick() {
  emit('onOpen')
  setSection('order')
}
</script>

<template>
  <header
    class="flex justify-between gap-4 sm:gap-10 mx-auto my-6 w-11/12 sm:w-4/5 md:w-2/3 max-w-5xl min-w-72"
  >
    <img class="w-20 sm:w-24 lg:w-28" src="/logo.svg" alt="Логотип" />
    <button
      :disabled="selectedPlaces.length === 0"
      @click="handleClick"
      class="ml-auto cursor-pointer flex items-center relative opacity-40 hover:opacity-100 disabled:pointer-events-none"
    >
      <img class="w-4 sm:w-5" src="/cart.svg" alt="Корзина" />
      <span class="absolute -right-1 top-1 w-3 h-3 bg-orange-300 rounded-lg text-xxs text-center">{{
        selectedPlaces.length
      }}</span>
    </button>
    <a
      href="https://github.com/VikaBuyavykh"
      class="text-white opacity-40 cursor-pointer transition hover:opacity-100 sm:text-sm md:text-lg"
      target="_blank"
    >
      Buyavykh | 2024
    </a>
  </header>
</template>

<style scoped>
.text-xxs {
  font-size: 8px;
}
</style>
