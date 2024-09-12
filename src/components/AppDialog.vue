<script setup>
import { ref } from 'vue'
import UIButton from '@/components/UI/UIButton.vue'

const props = defineProps({
  chosenFilm: [Object, null],
  observedFilm: Object,
  sessions: Array
})

const emit = defineEmits(['setChosenFilm', 'setTimeData', 'setPlacesData'])

const dialog = ref()

function openDialog() {
  dialog.value.showModal()
}

function closeDialog() {
  dialog.value.close()
}

function handleClick() {
  emit('setChosenFilm', props.observedFilm)
  localStorage.setItem('chosenFilm', JSON.stringify(props.observedFilm))
  localStorage.removeItem('timeData')
  localStorage.removeItem('placesData')
  emit(
    'setTimeData',
    props.sessions.map((date) => ({
      ...date,
      times: date.times.map((time) => ({ time: time.time }))
    }))
  )
  emit('setPlacesData', [])
  closeDialog()
}

defineExpose({
  openDialog
})
</script>

<template>
  <dialog
    ref="dialog"
    class="dialog w-5/6 h-1/2 md:h-1/4 md:w-2/3 lg:w-1/2 min-h-52 fixed flex justify-center items-center opacity-0 cursor-pointer border-none outline-none bg-slate-600 p-8 rounded-3xl backdrop:backdrop-blur-md"
    @click="closeDialog"
  >
    <div @click.stop class="h-full flex flex-col justify-between items-stretch">
      <p class="text-left text-white text-md md:text-lg">
        Вы не закончили оформление билетов на сеанс картины '{{ chosenFilm && chosenFilm.title }}'.
        Выберите фильм, на который желаете оформить билеты
      </p>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-8 items-stretch">
        <UIButton @click="closeDialog" class="w-full">{{
          chosenFilm && chosenFilm.title
        }}</UIButton>
        <UIButton @click="handleClick" class="w-full">{{ observedFilm.title }}</UIButton>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.dialog {
  transition:
    display 0.7s allow-discrete,
    overlay 0.5s allow-discrete,
    opacity 0.5s ease;
}

.dialog[open] {
  opacity: 1;

  @starting-style {
    opacity: 0;
  }
}
</style>
