<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  title: String,
  imageUrl: String,
  smallImageUrl: String,
  chosenFilm: Object
})

defineEmits(['setChosenFilm'])

const imagePath = computed(
  () => new URL(`/src/assets/images/${props.imageUrl}`, import.meta.url).href
)
const smallImagePath = computed(
  () => new URL(`/src/assets/images/${props.smallImageUrl}`, import.meta.url).href
)
</script>

<template>
  <li>
    <button
      :id
      @click="$emit('setChosenFilm', id)"
      :class="{ selected: id === chosenFilm.id }"
      class="w-full h-24 bg-slate-700 hover:bg-slate-600 hover:scale-95 active:bg-slate-500 rounded-2xl text-white flex gap-3 items-center overflow-hidden cursor-pointer transition"
    >
      <picture class="w-20 h-full relative">
        <source :srcset="smallImagePath" media="(max-width: 1000px)" />
        <img
          :src="imagePath"
          :alt="`Обложка фильма ${title}`"
          class="absolute w-full h-full object-cover object-center"
        />
      </picture>
      <span class="mr-3 text-left">{{ title }}</span>
    </button>
  </li>
</template>

<style scoped>
.selected {
  border: 1px solid #f0bc7d;
}
</style>
