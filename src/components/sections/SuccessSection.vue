<script setup>
import UIButton from '@/components/UI/UIButton.vue'

defineEmits(['onClose'])
</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center grow">
    <img
      src="/check.svg"
      alt="Обозначение успешной оплаты заказа"
      class="bg-slate-500 rounded-full w-28 opacity-40"
    />
    <h2 class="text-2xl sm:text-3xl md:text-4xl text-center">Заказ оформлен</h2>
    <p class="text-sm md:text-base text-center">Билеты уже у вас на почте</p>
    <UIButton type="button" @click="$emit('onClose')">На главную</UIButton>
  </div>
</template>

<style scoped></style>
