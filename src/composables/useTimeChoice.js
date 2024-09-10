import { computed, ref, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'

export function useTimeChoice() {
  const { sessions, chosenTime } = toRefs(useCartStore())
  const { setSessions } = useCartStore()

  const error = ref(null)
  const isButtonDisabled = computed(() => !chosenTime.value.time)

  function handleChooseTime(e) {
    let date = e.target.closest('.flex').children[0].textContent
    let time = e.target.textContent
    if (date === chosenTime.value.date && time === chosenTime.value.time) {
      date = null
      time = null
      error.value = 'Выберите дату и время'
    } else {
      error.value = null
    }
    setSessions(
      sessions.value.map((item) =>
        item.date !== date
          ? { ...item, times: item.times.map((item) => ({ ...item, selected: false })) }
          : {
              ...item,
              times: item.times.map((item) =>
                item.time !== time ? { ...item, selected: false } : { ...item, selected: true }
              )
            }
      )
    )
    localStorage.setItem('sessions', JSON.stringify(sessions.value))
  }

  return {
    handleChooseTime,
    error,
    isButtonDisabled
  }
}
