<script setup>
defineProps({
  onClickOpen: Function
})
</script>

<template>
  <header
    class="flex justify-between gap-10 mx-auto my-6 w-11/12 sm:w-4/5 md:w-2/3 max-w-5xl min-w-72"
  >
    <img class="w-20 sm:w-24 lg:w-28" src="/logo.svg" alt="Логотип" />
    <div class="w-6 sm:w-7 md:w-8 lg:w-9 relative">
      <img
        @click="onClickOpen"
        class="opacity-40 hover:opacity-100 transition cursor-pointer"
        src="/bag.png"
        alt="Иконка корзины"
      />
      <div
        class="bg-orange-300 w-3 h-3 rounded-lg text-white text-center text-xxs leading-3 absolute bottom-1.5 md:bottom-2 lg:bottom-2.5 right-0"
      >
        0
      </div>
    </div>
  </header>
</template>

<style scoped>
.text-xxs {
  font-size: 8px;
}
</style>
