import { computed, ref, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'

export function useTimeChoice() {
  const { timeData, selectedTime } = toRefs(useCartStore())
  const { setTimeData, setPlacesData } = useCartStore()

  const timeError = ref(null)
  const isTimeButtonDisabled = computed(() => !selectedTime.value.time)

  function chooseTime(e) {
    let date = e.target.closest('.flex').children[0].textContent
    let time = e.target.textContent
    if (date === selectedTime.value.date && time === selectedTime.value.time) {
      date = null
      time = null
      timeError.value = 'Выберите дату и время'
    } else {
      timeError.value = null
    }

    setTimeData(
      timeData.value.map((item) =>
        item.date === date
          ? {
              ...item,
              times: item.times.map((item) =>
                item.time === time ? { ...item, selected: true } : { ...item, selected: false }
              )
            }
          : { ...item, times: item.times.map((item) => ({ ...item, selected: false })) }
      )
    )
    localStorage.setItem('timeData', JSON.stringify(timeData.value))
    setPlacesData([])
    localStorage.removeItem('placesData')
  }

  return {
    timeData,
    setTimeData,
    chooseTime,
    timeError,
    isTimeButtonDisabled
  }
}
