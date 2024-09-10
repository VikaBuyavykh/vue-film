import { computed, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'

export function useOrder() {
  const { sessions, chosenTime, chosenPlaces } = toRefs(useCartStore())
  const { setSessions } = useCartStore()

  const isButtonDisabled = computed(() => chosenPlaces.value.length === 0)
  const totalPriceText = computed(() =>
    chosenPlaces.value.length === 0
      ? null
      : `Итого: ${chosenPlaces.value.reduce((sum, item) => sum + item.price, 0)} руб.`
  )

  function handleDelete(e) {
    let data = e.target.closest('#ticket').children[0].children[0].textContent.split(', ')
    let row = data[0].slice(7)
    let place = data[1].slice(6)
    setSessions(
      sessions.value.map((item) =>
        item.date !== chosenTime.value.date
          ? item
          : {
              ...item,
              times: item.times.map((item) =>
                item.time !== chosenTime.value.time
                  ? item
                  : {
                      ...item,
                      rows: item.rows.map((item) =>
                        item.row !== row
                          ? item
                          : {
                              ...item,
                              places: item.places.map((item) =>
                                item.place !== place ? item : { ...item, selected: false }
                              )
                            }
                      )
                    }
              )
            }
      )
    )
    localStorage.setItem('sessions', JSON.stringify(sessions.value))
  }

  return {
    chosenPlaces,
    isButtonDisabled,
    totalPriceText,
    handleDelete
  }
}
