<script setup>
import { useOrder } from '@/composables/useOrder'
import UICartContent from '@/components/UI/UICartContent.vue'

defineProps({
  chosenFilm: Object
})

const { selectedTime, selectedPlaces, handleDelete, isButtonDisabled, totalPriceText } = useOrder()
</script>

<template>
  <UICartContent
    next-section="form"
    prev-section="place"
    :is-button-disabled
    :text="totalPriceText"
  >
    <template #title>Корзина</template>
    <template #desc
      >{{ chosenFilm.title }}, {{ selectedTime.date }}, {{ selectedTime.time }}</template
    >
    <template #button>Оформить</template>
    <template #main>
      <ul class="flex flex-col gap-3 grow mt-5 pr-1 overflow-y-auto scrollbar-element">
        <li
          v-for="place in selectedPlaces"
          :key="place"
          id="ticket"
          class="w-full py-4 px-5 flex justify-between gap-10 bg-slate-600 rounded-3xl"
        >
          <div class="flex flex-col gap-2">
            <h3 class="text-xs sm:text-xl font-semibold">
              &#8594; {{ `Ряд ${place.row}, место ${place.place}` }}
            </h3>
            <span class="text-xs">{{ `${selectedTime.date}, ${selectedTime.time}` }}</span>
          </div>
          <div class="flex gap-4">
            <div class="flex flex-col gap-2">
              <p class="text-xs sm:text-xl font-semibold">{{ place.price }} руб.</p>
              <span class="text-xs">С учётом НДС</span>
            </div>
            <img
              @click="handleDelete"
              src="/bin.svg"
              alt="Иконка удаления"
              class="w-4 opacity-40 cursor-pointer hover:opacity-100 transition"
            />
          </div>
        </li>
      </ul>
    </template>
  </UICartContent>
</template>

<style scoped></style>
