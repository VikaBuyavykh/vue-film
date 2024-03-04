<script setup>
import { computed, inject } from 'vue'
import Card from './Card.vue'
const props = defineProps({
  pagesNumber: Number,
  films: Array
})

const { page } = inject('app')

const isShowNextAvailable = computed(() => page.value < props.pagesNumber)
const isShowPreviousAvailable = computed(() => page.value > 1 && page.value <= props.pagesNumber)

function showNext() {
  page.value++
}

function showPrevious() {
  page.value--
}
</script>

<template>
  <section class="mx-auto my-8 w-11/12 media md:w-2/3 max-w-5xl min-w-72">
    <div class="relative w-3/4 mx-auto">
      <transition-group
        tag="ul"
        name="flip-list"
        class="w-full grid grid-cols-1 md:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <Card
          v-for="film in films"
          :key="film.id"
          :id="film.id"
          :title="film.title"
          :imageUrl="film.cover"
        />
      </transition-group>
      <transition name="fade">
        <img
          v-if="isShowNextAvailable"
          @click="showNext"
          src="/arrow.png"
          alt="Иконка переключения карточек"
          class="w-6 sm:w-10 absolute top-0 bottom-0 m-auto -right-8 sm:-right-20 cursor-pointer transition hover:opacity-40 hover:translate-x-1"
        />
      </transition>
      <transition name="fade">
        <img
          v-if="isShowPreviousAvailable"
          @click="showPrevious"
          src="/arrow.png"
          alt="Иконка переключения карточек"
          class="rotate-180 w-6 sm:w-10 absolute top-0 bottom-0 m-auto -left-8 sm:-left-20 cursor-pointer transition hover:opacity-40 hover:-translate-x-1"
        />
      </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.flip-list-enter-active {
  animation: fade 0.7s forwards ease-in;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
