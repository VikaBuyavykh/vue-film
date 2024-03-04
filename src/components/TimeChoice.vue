<script setup>
import { inject, ref } from 'vue'

const { chosenTime, errorMessage, sessions } = inject('provider')
const selectedEl = ref('')

function handleChooseTime(e) {
  errorMessage.value = ''
  if (selectedEl.value === '') {
    selectedEl.value = e.target
    selectedEl.value.classList.add('selected')
    chosenTime.value = {
      date: e.target.closest('.flex').children[0].textContent,
      time: e.target.textContent
    }
  } else if (selectedEl.value === e.target) {
    selectedEl.value.classList.remove('selected')
    selectedEl.value = ''
    chosenTime.value = {}
  } else {
    selectedEl.value.classList.remove('selected')
    selectedEl.value = e.target
    selectedEl.value.classList.add('selected')
    chosenTime.value = {
      date: e.target.closest('.flex').children[0].textContent,
      time: e.target.textContent
    }
  }
}
</script>

<template>
  <ul class="flex gap-5 overflow-x-auto justify-center sm:justify-start">
    <li v-for="date in sessions" :key="date.id" class="flex flex-col gap-3">
      <p class="text-center text-xs">{{ date.date }}</p>
      <ul class="time">
        <li
          v-for="time in date.times"
          :key="time"
          @click="handleChooseTime"
          class="py-1 px-6 bg-slate-600 rounded-lg text-xs cursor-pointer hover:bg-slate-500 hover:-translate-y-0.5 transition active:bg-slate-400"
        >
          {{ time.time }}
        </li>
      </ul>
    </li>
  </ul>
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
