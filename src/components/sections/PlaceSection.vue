<script setup>
import { onMounted } from 'vue'
import UICartContent from '@/components/UI/UICartContent.vue'

const props = defineProps({
  sessions: Array,
  chosenFilm: Object,
  placesData: Array,
  selectedTime: Object,
  placesError: String,
  isPlacesButtonDisabled: Boolean,
  selectedPlacesText: String
})

const emit = defineEmits(['choosePlace', 'setPlacesData'])

function highPriceFilter(places) {
  return places.map((row) =>
    row.row > 1 && row.row < 5
      ? {
          ...row,
          places: row.places.map((place) =>
            place.place > 3 && place.place < 8 ? { ...place, highPriced: true } : place
          )
        }
      : row
  )
}

onMounted(() => {
  console.log(highPriceFilter(props.placesData))

  const savedPlacesData = JSON.parse(localStorage.getItem('placesData'))
  if (savedPlacesData) {
    emit('setPlacesData', savedPlacesData)
  } else {
    emit(
      'setPlacesData',
      props.sessions
        .find((item) => item.date === props.selectedTime.date)
        .times.find((item) => item.time === props.selectedTime.time)
        .rows.map((item) => ({
          row: item.row,
          places: item.places.map((item) => ({ place: item.place, isOccupied: item.isOccupied }))
        }))
    )
  }
})
</script>

<template>
  <UICartContent
    next-section="order"
    prev-section="time"
    :error="placesError"
    :is-button-disabled="isPlacesButtonDisabled"
    :text="selectedPlacesText"
  >
    <template #title>Выберите место</template>
    <template #desc
      >{{ chosenFilm.title }}, {{ selectedTime.date }}, {{ selectedTime.time }}</template
    >
    <template #button>Далее</template>
    <template #main>
      <div class="flex flex-col gap-3 overflow-x-auto scrollbar-horizontal grow justify-end mb-5">
        <div class="flex justify-center gap-3">
          <span class="h-5 px-4 flex items-center text-center bg-slate-600 text-xs">350 руб.</span>
          <span class="h-5 px-4 flex items-center text-center highPriced text-xs">450 руб.</span>
        </div>
        <div class="bg-slate-900 w-392 h-6 text-center rounded-xl text-xs pt-1 ml-10">Экран</div>
        <ul class="flex flex-col gap-3">
          <li v-for="row in highPriceFilter(placesData)" :key="row.row" class="flex flex-row gap-2">
            <span class="text-xs mt-1 mr-1 text-nowrap">Ряд {{ row.row }}</span>
            <div class="place">
              <button
                type="button"
                @click="$emit('choosePlace', $event)"
                v-for="place in row.places"
                :key="place.place"
                :disabled="place.isOccupied"
                :class="{ selected: place.selected, highPriced: place.highPriced }"
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

.highPriced {
  background-color: rgba(188, 143, 143, 0.5);
}
</style>
