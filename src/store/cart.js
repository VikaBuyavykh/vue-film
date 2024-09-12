import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL, HIGH_PRICE, LOW_PRICE } from '@/utils/constants'

export const useCartStore = defineStore('cart', () => {
  //film

  const chosenFilm = ref(null)

  function setChosenFilm(value) {
    chosenFilm.value = value
  }

  //sections

  const section = ref('time')

  function setSection(value) {
    section.value = value
  }

  //sessions

  const sessions = ref([])

  function setSessions(value) {
    sessions.value = value
  }

  async function getSessions() {
    try {
      const { data } = await axios.get(`${API_URL}/sessions`)
      sessions.value = data
    } catch (error) {
      console.log(error)
    }
  }

  //time

  const timeData = ref([])

  function setTimeData(value) {
    timeData.value = value
  }

  const selectedTime = computed(() => {
    let data = {}
    timeData.value.forEach((date) => {
      const time = date.times.find((time) => time.selected)
      if (time) {
        data = { date: date.date, time: time.time }
      }
    })
    return data
  })

  //place

  const placesData = ref([])

  function setPlacesData(value) {
    placesData.value = value
  }

  function setPrice(row, place) {
    if (row > 1 && row < 5 && place > 3 && place < 8) {
      return HIGH_PRICE
    } else {
      return LOW_PRICE
    }
  }

  const selectedPlaces = computed(() => {
    let data = []
    placesData.value.forEach((row) => {
      const places = row.places.filter((item) => item.selected)
      if (places.length > 0) {
        places.forEach((place) =>
          data.push({
            row: row.row,
            place: place.place,
            price: setPrice(row.row, place.place)
          })
        )
      }
    })

    return data
  })

  return {
    chosenFilm,
    setChosenFilm,
    section,
    setSection,
    sessions,
    setSessions,
    getSessions,
    timeData,
    setTimeData,
    selectedTime,
    placesData,
    setPlacesData,
    selectedPlaces
  }
})
