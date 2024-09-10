import { computed, ref, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'
import axios from 'axios'
import { API_URL } from '@/utils/constants'

export function useForm(chosenFilm) {
  const { sessions, chosenTime, chosenPlaces } = toRefs(useCartStore())
  const { setSessions, setSection } = useCartStore()

  const email = ref('')
  const tel = ref('')

  const isButtonDisabled = ref(true)
  const errorApi = ref(null)
  const totalPriceText = computed(() =>
    chosenPlaces.value.length === 0
      ? null
      : `Итого: ${chosenPlaces.value.reduce((sum, item) => sum + item.price, 0)} руб.`
  )

  async function handleSubmit() {
    const updatedSessions = sessions.value.map((item) => ({
      ...item,
      times: item.times.map((item) => ({
        time: item.time,
        rows: item.rows.map((item) => ({
          row: item.row,
          places: item.places.map((item) =>
            item.selected
              ? { place: item.place, isOccupied: true }
              : { place: item.place, isOccupied: item.isOccupied }
          )
        }))
      }))
    }))

    try {
      await axios.post(`${API_URL}/orders`, {
        chosenFilm: chosenFilm.title,
        chosenTime: chosenTime.value,
        chosenPlaces: chosenPlaces.value,
        totalPrice: chosenPlaces.value.reduce((sum, item) => sum + item.price, 0),
        userEmail: email.value,
        userTel: tel.value
      })
      await axios.patch(`${API_URL}/sessions`, updatedSessions)
      setSessions(updatedSessions)
      localStorage.setItem('sessions', JSON.stringify(sessions.value))
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
    checkValidity,
    handleSubmit,
    isButtonDisabled,
    totalPriceText,
    errorApi
  }
}
