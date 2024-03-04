<script setup>
defineProps({
  onCloseDrawer: Function
})
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <img
      src="/check.svg"
      alt="Обозначение успешной оплаты заказа"
      class="bg-slate-500 rounded-full w-28 opacity-40"
    />
    <h2 class="text-2xl sm:text-3xl md:text-4xl text-center">Заказ оформлен</h2>
    <p class="text-sm md:text-base text-center">Билеты уже у вас на почте</p>
    <button
      @click="onCloseDrawer"
      type="button"
      class="mt-2 cursor-pointer bg-white hover:bg-orange-300 active:bg-orange-400 transition rounded-xl w-36 py-2 text-cyan-900 text-xs sm:text-sm font-semibold"
    >
      На главную
    </button>
  </div>
</template>

<style scoped></style>
