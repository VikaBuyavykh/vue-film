<script setup>
import { inject } from 'vue'
import { HIGH_PRICE, LOW_PRICE } from '../utils/constants'

const { chosenPlaces, chosenTime } = inject('provider')

function handleDelete(e) {
  const rowAndPlaceToDelete = e.target
    .closest('#ticket')
    .children[0].children[0].textContent.split(', ')
    .map((item, index) => (index === 0 ? item.slice(3) : item.slice(6)))

  chosenPlaces.value.splice(
    chosenPlaces.value.indexOf(
      chosenPlaces.value.find(
        (item) => item.row === rowAndPlaceToDelete[0] && item.place === rowAndPlaceToDelete[1]
      )
    ),
    1
  )
  e.target.closest('#ticket').remove()
}
</script>

<template>
  <ul class="flex flex-col gap-3">
    <li
      v-for="place in chosenPlaces"
      :key="place"
      id="ticket"
      class="w-full py-4 px-5 flex justify-between gap-10 bg-slate-600 rounded-3xl"
    >
      <div class="flex flex-col gap-2">
        <h3 class="text-xs sm:text-xl font-semibold">
          &#8594; {{ `${place.row}, место ${place.place}` }}
        </h3>
        <span class="text-xs">{{ `${chosenTime.date}, ${chosenTime.time}` }}</span>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col gap-2">
          <p class="text-xs sm:text-xl font-semibold">
            {{
              Number(place.row.slice(4)) > 1 &&
              Number(place.row.slice(4)) < 5 &&
              Number(place.place) > 3 &&
              Number(place.place) < 8
                ? HIGH_PRICE
                : LOW_PRICE
            }}
            руб.
          </p>
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

<style scoped></style>
