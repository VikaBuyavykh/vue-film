<script setup>
import { inject } from 'vue'

defineProps({
  title: String,
  imageUrl: String,
  id: String
})

const { chosenFilm, films } = inject('app')

function chooseFilm(e) {
  chosenFilm.value = films.value.find((film) => film.id === e.currentTarget.id)
}
</script>

<template>
  <li>
    <button
      :id="id"
      @click="chooseFilm"
      :class="{ selected: id === chosenFilm.id }"
      class="w-full h-24 bg-slate-700 hover:bg-slate-600 hover:-translate-y-0.5 active:bg-slate-500 rounded-2xl text-white flex gap-3 items-center overflow-hidden cursor-pointer transition"
    >
      <img
        :src="imageUrl"
        :alt="`Обложка фильма ${title}`"
        class="w-20 h-full object-cover object-center"
      />
      <span class="mr-3 text-left">{{ title }}</span>
    </button>
  </li>
</template>

<style scoped>
.selected {
  border: 1px solid #f0bc7d;
}
</style>
