<script setup>
import AppCard from '@/components/AppCard.vue'

const props = defineProps({
  films: Array,
  page: Number,
  pagesNumber: Number,
  observedFilm: Object
})

const emit = defineEmits(['setPage', 'setObservedFilm'])

function handleClick(string) {
  let number = props.page
  string === 'next' ? number++ : number--
  emit('setPage', number)
  localStorage.setItem('page', number)
}
</script>

<template>
  <section class="mx-auto my-8 w-11/12 media md:w-2/3 max-w-5xl min-w-72">
    <div class="relative w-3/4 mx-auto">
      <ul class="w-full grid grid-cols-1 md:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AppCard
          v-for="film in films"
          :key="film.id"
          :id="film.id"
          :title="film.title"
          :image-url="film.cover"
          :small-image-url="film.coverSmall"
          :observed-film
          @set-observed-film="$emit('setObservedFilm', $event)"
        />
      </ul>
      <img
        v-if="page < pagesNumber"
        @click="handleClick('next')"
        src="/arrow.svg"
        alt="Иконка переключения карточек вперед"
        class="w-6 sm:w-10 absolute top-0 bottom-0 m-auto -right-8 sm:-right-20 cursor-pointer transition hover:opacity-40 hover:translate-x-0.5"
      />
      <img
        v-if="page > 1 && page <= pagesNumber"
        @click="handleClick('prev')"
        src="/arrow.svg"
        alt="Иконка переключения карточек назад"
        class="rotate-180 w-6 sm:w-10 absolute top-0 bottom-0 m-auto -left-8 sm:-left-20 cursor-pointer transition hover:opacity-40 hover:-translate-x-0.5"
      />
    </div>
  </section>
</template>

<style scoped>
@media screen and (min-width: 400px) {
  .media {
    width: 66%;
  }
}
@media screen and (489px < width < 768px) {
  .media {
    width: 50%;
  }
}
</style>
