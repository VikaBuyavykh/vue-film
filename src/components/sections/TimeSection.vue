<script setup>
import AppMovieInfo from '@/components/AppMovieInfo.vue'
import UICartContent from '@/components/UI/UICartContent.vue'

defineProps({
  chosenFilm: Object,
  timeData: Array,
  timeError: String,
  isTimeButtonDisabled: Boolean
})

defineEmits(['chooseTime'])
</script>

<template>
  <UICartContent next-section="place" :error="timeError" :is-button-disabled="isTimeButtonDisabled">
    <template #info>
      <AppMovieInfo
        :rating="chosenFilm.rating"
        :director="chosenFilm.director"
        :genre="chosenFilm.genre"
      />
    </template>
    <template #title>{{ chosenFilm.title }}</template>
    <template #desc>{{ chosenFilm.shortDescription }}</template>
    <template #main>
      <ul class="flex gap-5 overflow-x-auto justify-center sm:justify-start grow items-end mb-5">
        <li v-for="date in timeData" :key="date.id" class="flex flex-col gap-3">
          <p class="text-center text-xs">{{ date.date }}</p>
          <ul class="time">
            <li
              v-for="time in date.times"
              :key="time"
              @click="$emit('chooseTime', $event)"
              :class="{ selected: time.selected }"
              class="py-1 px-6 bg-slate-600 rounded-lg text-xs cursor-pointer hover:bg-slate-500 hover:-translate-y-0.5 transition active:bg-slate-400"
            >
              {{ time.time }}
            </li>
          </ul>
        </li>
      </ul>
    </template>
    <template #button>Далее</template>
  </UICartContent>
</template>

<style scoped>
.time {
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 12px;
}

.selected {
  border: 1px solid #f0bc7d;
}
</style>
