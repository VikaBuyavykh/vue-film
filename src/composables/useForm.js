import { computed, ref, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'
import axios from 'axios'
import { API_URL } from '@/utils/constants'

export function useForm(chosenFilm) {
  const { sessions, selectedTime, selectedPlaces, placesData } = toRefs(useCartStore())
  const { setSessions, setSection, setChosenFilm } = useCartStore()

  const email = ref('')
  const tel = ref('')

  const isButtonDisabled = ref(true)
  const errorApi = ref(null)
  const totalPriceText = computed(() =>
    selectedPlaces.value.length === 0
      ? null
      : `Итого: ${selectedPlaces.value.reduce((sum, item) => sum + item.price, 0)} руб.`
  )

  async function handleSubmit() {
    const updatedPlaces = placesData.value.map((item) => ({
      row: item.row,
      places: item.places.map((item) =>
        item.selected
          ? { place: item.place, isOccupied: true }
          : { place: item.place, isOccupied: item.isOccupied }
      )
    }))
    const updatedSessions = sessions.value.map((item) =>
      item.date !== selectedTime.value.date
        ? item
        : {
            ...item,
            times: item.times.map((item) =>
              item.time !== selectedTime.value.time ? item : { ...item, rows: updatedPlaces }
            )
          }
    )
    try {
      await axios.post(`${API_URL}/orders`, {
        chosenFilm: chosenFilm.title,
        chosenTime: selectedTime.value,
        chosenPlaces: selectedPlaces.value,
        totalPrice: selectedPlaces.value.reduce((sum, item) => sum + item.price, 0),
        userEmail: email.value,
        userTel: tel.value
      })
      await axios.patch(`${API_URL}/sessions`, updatedSessions)
      setSessions(updatedSessions)
      setChosenFilm(null)
      localStorage.removeItem('chosenFilm')
      localStorage.removeItem('timeData')
      localStorage.removeItem('placesData')
      setSection('success')
    } catch (error) {
      errorApi.value = 'Что-то пошло не так. Попробуйте оформить заказ позже'
      console.log(error)
    }
  }

  function checkValidity(e) {
    errorApi.value = null
    const form = e.target.form
    const formErrors = form.querySelectorAll('span')
    const formInputs = form.querySelectorAll('input')
    const isFormInvalid = Array.from(formErrors).some((error) => {
      return error.textContent !== ''
    })
    const hasAnEmptyInput = Array.from(formInputs).some((input) => {
      return input.value === ''
    })
    if (!isFormInvalid && !hasAnEmptyInput) {
      isButtonDisabled.value = false
    } else {
      isButtonDisabled.value = true
    }
  }

  return {
    email,
    tel,
    selectedTime,
    checkValidity,
    handleSubmit,
    errorApi,
    isButtonDisabled,
    totalPriceText
  }
}
