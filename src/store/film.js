import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '@/utils/constants'

export const useFilmStore = defineStore('film', () => {
  const films = ref([])
  const page = ref(1)
  const pagesNumber = ref(0)
  const chosenFilm = ref({})

  async function getFilms(page) {
    try {
      const { data } = await axios.get(`${API_URL}/films?page=${page}&limit=6`)
      films.value = data.items
      pagesNumber.value = data.meta.total_pages
    } catch (error) {
      console.log(error)
    }
  }

  function setPage(value) {
    page.value = value
  }

  function setChosenFilm(id) {
    chosenFilm.value = films.value.find((film) => film.id == id)
  }

  return {
    films,
    getFilms,
    chosenFilm,
    setChosenFilm,
    page,
    setPage,
    pagesNumber
  }
})
