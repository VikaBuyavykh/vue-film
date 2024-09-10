<script setup>
import { usePlaceChoice } from '@/composables/usePlaceChoice'
import UICartContent from '@/components/UI/UICartContent.vue'

defineProps({
  chosenFilm: Object,
  chosenTime: Object
})

const { hallData, handleChoosePlace, error, isButtonDisabled, chosenPlacesText } = usePlaceChoice()
</script>

<template>
  <UICartContent
    next-section="order"
    prev-section="time"
    :error
    :is-button-disabled
    :text="chosenPlacesText"
  >
    <template #title>Выберите место</template>
    <template #desc>{{ chosenFilm.title }}, {{ chosenTime.date }}, {{ chosenTime.time }}</template>
    <template #button>Далее</template>
    <template #main>
      <div class="flex flex-col gap-3 overflow-x-auto scrollbar-horizontal grow justify-end mb-5">
        <div class="bg-slate-900 w-392 h-6 text-center rounded-xl text-xs pt-1 ml-10">Экран</div>
        <ul class="flex flex-col gap-3">
          <li v-for="row in hallData" :key="row.row" class="flex flex-row gap-2">
            <span class="text-xs mt-1 mr-1 text-nowrap">Ряд {{ row.row }}</span>
            <div class="place">
              <button
                type="button"
                @click="handleChoosePlace($event)"
                v-for="place in row.places"
                :key="place.place"
                :disabled="place.isOccupied"
                :class="{ selected: place.selected }"
                class="h-6 w-8 text-center bg-slate-600 rounded-xl text-xs cursor-pointer hover:bg-slate-500 hover:-translate-y-0.5 transition active:bg-slate-400 disabled:opacity-20 disabled:cursor-default disabled:translate-y-0"
              >
                {{ place.place }}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </UICartContent>
</template>

<style scoped>
.place {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
}

.w-392 {
  width: 392px;
}

.selected {
  border: 1px solid #f0bc7d;
}
</style>
