<script setup>
import { onMounted, ref, watch, toRefs } from 'vue'
import { useFilmStore } from '@/store/film'
import { useCartStore } from '@/store/cart'
import { useTimeChoice } from '@/composables/useTimeChoice'
import { usePlaceChoice } from '@/composables/usePlaceChoice'
import AppHeader from '@/components/AppHeader.vue'
import AppCover from '@/components/AppCover.vue'
import AppCards from '@/components/AppCards.vue'
import AppCart from '@/components/AppCart.vue'
import AppDialog from '@/components/AppDialog.vue'

//dialog

const dialog = ref()

function openDialog() {
  dialog.value.openDialog()
}

//drawer

const isCartOpen = ref(false)

function handleCart() {
  isCartOpen.value = !isCartOpen.value
}

//stores stuff

const { observedFilm, films, page, pagesNumber } = toRefs(useFilmStore())
const { getFilms, setPage, setObservedFilm } = useFilmStore()
const { chosenFilm, section, sessions } = toRefs(useCartStore())
const { setChosenFilm, getSessions, setSection } = useCartStore()

//composables stuff

const { timeData, setTimeData, chooseTime, timeError, isTimeButtonDisabled } = useTimeChoice()
const {
  placesData,
  setPlacesData,
  selectedTime,
  choosePlace,
  placesError,
  isPlacesButtonDisabled,
  selectedPlacesText
} = usePlaceChoice()

//other stuff

watch(page, async () => {
  await getFilms(page.value)
})

watch(isCartOpen, () => {
  if (isCartOpen.value) {
    if (!chosenFilm.value) {
      setChosenFilm(observedFilm.value)
      localStorage.setItem('chosenFilm', JSON.stringify(chosenFilm.value))
    }
  }
})

onMounted(async () => {
  const savedPage = JSON.parse(localStorage.getItem('page'))
  if (savedPage) {
    setPage(savedPage)
  } else {
    setPage(1)
  }

  await getFilms(page.value)
  await getSessions()

  const savedObservedFilmId = JSON.parse(localStorage.getItem('observedFilmId'))
  if (savedObservedFilmId) {
    setObservedFilm(savedObservedFilmId)
  } else {
    setObservedFilm(1)
    localStorage.setItem('observedFilmId', 1)
  }

  const savedChosenFilm = JSON.parse(localStorage.getItem('chosenFilm'))
  if (savedChosenFilm) {
    setChosenFilm(savedChosenFilm)
  }
})
</script>

<template>
  <div class="flex flex-col">
    <AppHeader @on-open="handleCart" />
    <main>
      <AppCover :observed-film :chosen-film @on-click-open="handleCart" @open-dialog="openDialog" />
      <AppCards
        :films
        :pages-number
        :page
        :observed-film
        @set-page="setPage"
        @set-observed-film="setObservedFilm"
      />
      <transition name="fade">
        <AppCart
          v-if="isCartOpen"
          :sessions
          :section
          :chosen-film
          :time-data
          :time-error
          :is-time-button-disabled
          :places-data
          :selected-time
          :places-error
          :is-places-button-disabled
          :selected-places-text
          @set-places-data="setPlacesData"
          @set-time-data="setTimeData"
          @choose-time="chooseTime"
          @choose-place="choosePlace"
          @on-close="handleCart"
          @set-section="setSection"
        />
      </transition>
      <AppDialog
        ref="dialog"
        :chosen-film
        :observed-film
        :sessions
        @set-chosen-film="setChosenFilm"
        @set-time-data="setTimeData"
        @set-places-data="setPlacesData"
      />
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
