<script setup>
import { onMounted, ref, watch, toRefs } from 'vue'
import { useFilmStore } from '@/store/film'
import { useCartStore } from '@/store/cart'
import AppHeader from '@/components/AppHeader.vue'
import AppCover from '@/components/AppCover.vue'
import AppCards from '@/components/AppCards.vue'
import AppCart from '@/components/AppCart.vue'

//drawer

const isDrawerOpen = ref(false)

function handleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

//film

const { films, chosenFilm, page, pagesNumber } = toRefs(useFilmStore())
const { getFilms, setChosenFilm, setPage } = useFilmStore()

watch(page, async () => {
  await getFilms(page.value)
})

onMounted(async () => {
  await getFilms(page.value)
  setChosenFilm(1)
})

//sessions

const { section, sessions, chosenTime } = toRefs(useCartStore())
const { getSessions, setSessions, setSection } = useCartStore()

onMounted(async () => {
  const savedSessions = JSON.parse(localStorage.getItem('sessions'))
  if (savedSessions) {
    setSessions(savedSessions)
  } else {
    await getSessions()
    localStorage.setItem('sessions', JSON.stringify(sessions.value))
  }
})
</script>

<template>
  <div class="flex flex-col">
    <AppHeader @on-open="handleDrawer" />
    <main>
      <AppCover :chosen-film @on-click-open="handleDrawer" />
      <AppCards
        :films
        :pages-number
        :page
        :chosen-film
        @set-page="setPage"
        @set-chosen-film="setChosenFilm"
      />
      <transition name="fade">
        <AppCart
          v-if="isDrawerOpen"
          :section
          :sessions
          :chosen-film
          :chosen-time
          @on-close="handleDrawer"
          @set-section="setSection"
        />
      </transition>
    </main>
  </div>
</template>

<style>
.fade-enter-active {
  animation: fade 0.5s forwards ease;
}
.fade-leave-active {
  animation: fade 0.5s reverse ease;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.scrollbar-element::-webkit-scrollbar {
  width: 5px;
}

.scrollbar-horizontal::-webkit-scrollbar {
  height: 5px;
}

.scrollbar-element::-webkit-scrollbar-track,
.scrollbar-horizontal::-webkit-scrollbar-track {
  background-color: #cac4b0;
}

.scrollbar-element::-webkit-scrollbar-thumb,
.scrollbar-horizontal::-webkit-scrollbar-thumb {
  background-color: #131824;
  border-radius: 20px;
}
</style>
