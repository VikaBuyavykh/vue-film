<script setup>
import { onMounted, provide, ref, watch } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Cover from './components/Cover.vue'
import Cards from './components/Cards.vue'
import Drawer from './components/Drawer.vue'

const isDrawerOpen = ref(false)
const films = ref([])
const page = ref(1)
const pagesNumber = ref(0)
const chosenFilm = ref({})

function handleDrawer() {
  isDrawerOpen.value ? (isDrawerOpen.value = false) : (isDrawerOpen.value = true)
}
async function getFilms(page) {
  try {
    const { data } = await axios.get(
      `https://f3f76ea5491c3712.mokky.dev/films?page=${page}&limit=6`
    )
    films.value = data.items
    pagesNumber.value = data.meta.total_pages
  } catch (error) {
    console.log(error)
  }
}

watch(page, async () => {
  await getFilms(page.value)
})

onMounted(async () => {
  await getFilms(page.value)
  chosenFilm.value = films.value[0]
})

provide('app', { page, chosenFilm, films })
</script>

<template>
  <div class="flex flex-col">
    <Header :onClickOpen="handleDrawer" />
    <main>
      <Cover :chosenFilm="chosenFilm" :onClickOpen="handleDrawer" />
      <Cards :films="films" :pagesNumber="pagesNumber" />
      <transition name="fade">
        <Drawer v-if="isDrawerOpen" :onClickClose="handleDrawer" :chosenFilm="chosenFilm" />
      </transition>
    </main>
  </div>
</template>

<style scoped>
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
</style>
