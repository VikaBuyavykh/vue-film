<script setup>
import { inject, onMounted, ref } from 'vue'

const { chosenPlaces, errorMessage, sessions, chosenTime } = inject('provider')
const hallData = ref([])

function handleChoosePlace(e) {
  errorMessage.value = ''
  if (e.target.classList.contains('selected')) {
    chosenPlaces.value.splice(
      chosenPlaces.value.indexOf(
        chosenPlaces.value.find(
          (item) =>
            item.row === e.target.closest('.flex').children[0].textContent &&
            item.place === e.target.textContent
        )
      ),
      1
    )
    e.target.classList.remove('selected')
  } else {
    chosenPlaces.value.push({
      row: e.target.closest('.flex').children[0].textContent,
      place: e.target.textContent
    })
    e.target.classList.add('selected')
  }
}

onMounted(() => {
  hallData.value = sessions.value
    .find((item) => item.date === chosenTime.value.date)
    .times.find((item) => item.time === chosenTime.value.time).rows
  chosenPlaces.value.forEach((a, index) => {
    hallData.value = hallData.value.map((b) =>
      b.row !== chosenPlaces.value[index].row.slice(4)
        ? b
        : {
            ...b,
            places: b.places.map((c) =>
              c.place !== chosenPlaces.value[index].place ? c : { ...c, isSelected: true }
            )
          }
    )
  })
})
</script>

<template>
  <div class="flex flex-col gap-3 overflow-x-auto">
    <div class="bg-slate-900 w-392 h-6 text-center rounded-xl text-xs pt-1 ml-10">Экран</div>
    <ul class="flex flex-col gap-3">
      <li v-for="row in hallData" :key="row.row" class="flex flex-row gap-2">
        <span class="text-xs mt-1 mr-1 text-nowrap">Ряд {{ row.row }}</span>
        <div class="place">
          <button
            type="button"
            @click="handleChoosePlace"
            v-for="place in row.places"
            :key="place.place"
            :disabled="place.isOccupied"
            :class="{ selected: place.isSelected }"
            class="h-6 w-8 text-center bg-slate-600 rounded-xl text-xs cursor-pointer hover:bg-slate-500 hover:-translate-y-0.5 transition active:bg-slate-400 disabled:opacity-20 disabled:cursor-default disabled:translate-y-0"
          >
            {{ place.place }}
          </button>
        </div>
      </li>
    </ul>
  </div>
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
