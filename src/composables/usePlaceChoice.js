import { computed, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'

export function usePlaceChoice() {
  const { sessions, chosenTime, chosenPlaces } = toRefs(useCartStore())
  const { setSessions } = useCartStore()

  const isButtonDisabled = computed(() => chosenPlaces.value.length === 0)
  const error = computed(() => (chosenPlaces.value.length === 0 ? 'Выберите место' : null))
  const chosenPlacesText = computed(() =>
    chosenPlaces.value.length === 0
      ? null
      : chosenPlaces.value.map((item) => `Ряд ${item.row}, место ${item.place}`).join('/')
  )

  const hallData = computed(() => {
    let places = []
    const data = sessions.value
      .find((item) => item.date === chosenTime.value.date)
      .times.find((item) => item.time === chosenTime.value.time).rows
    if (data) places = data
    return places
  })

  function handleChoosePlace(e) {
    let row = e.target.closest('.flex').children[0].textContent.slice(4)
    let place = e.target.textContent
    let placeToUnset = null

    if (chosenPlaces.value.some((item) => item.row === row && item.place === place)) {
      placeToUnset = place
    }

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
                                item.place !== place
                                  ? item
                                  : item.place === placeToUnset
                                    ? { ...item, selected: false }
                                    : { ...item, selected: true }
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
    hallData,
    handleChoosePlace,
    isButtonDisabled,
    error,
    chosenPlacesText
  }
}
