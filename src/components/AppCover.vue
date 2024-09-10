<script setup>
import { computed } from 'vue'
import AppMovieInfo from '@/components/AppMovieInfo.vue'

const props = defineProps({
  chosenFilm: Object
})

defineEmits(['onClickOpen'])

const imagePath = computed(
  () => new URL(`/src/assets/images/${props.chosenFilm.cover}`, import.meta.url).href
)
</script>

<template>
  <section
    v-if="chosenFilm"
    :style="`background-image: url(${imagePath})`"
    class="bg-image w-full min-w-72 flex"
  >
    <div class="bg-gradient h-full w-full">
      <div
        class="flex flex-col py-8 gap-4 sm:gap-6 md:gap-8 w-11/12 sm:w-4/5 md:w-2/3 max-w-5xl mx-auto text-white z-10 h-50vh"
      >
        <AppMovieInfo
          :rating="chosenFilm.rating"
          :director="chosenFilm.director"
          :genre="chosenFilm.genre"
        />
        <h1 class="text-3xl sm:text-4xl md:text-5xl overflow-wrap">{{ chosenFilm.title }}</h1>
        <p
          class="w-full text-sm sm:text-base md:text-lg h-full overflow-auto overflow-ellipsis scrollbar-element pr-1"
        >
          {{ chosenFilm.description }}
        </p>
        <button
          @click="$emit('onClickOpen')"
          class="cursor-pointer bg-white hover:bg-orange-300 active:bg-orange-400 transition rounded-xl w-1/3 sm:w-2/5 md:w-1/4 py-2 text-cyan-900 text-xs sm:text-sm md:text-base"
        >
          Купить билет
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.h-50vh {
  height: 50vh;
}

.bg-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bg-gradient {
  background-image: linear-gradient(0.25turn, rgba(19, 24, 36, 0.95) 10%, rgba(19, 24, 36, 0.3));
}

.overflow-wrap {
  overflow-wrap: break-word;
}
</style>
