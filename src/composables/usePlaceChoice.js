import { computed, onMounted, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'

export function usePlaceChoice() {
  const { placesData, selectedPlaces, selectedTime } = toRefs(useCartStore())
  const { setPlacesData } = useCartStore()

  const isPlacesButtonDisabled = computed(() => selectedPlaces.value.length === 0)
  const placesError = computed(() => (selectedPlaces.value.length === 0 ? 'Выберите место' : null))
  const selectedPlacesText = computed(() =>
    selectedPlaces.value.length === 0
      ? null
      : selectedPlaces.value.map((item) => `Ряд ${item.row}, место ${item.place}`).join('/')
  )

  function choosePlace(e) {
    let row = e.target.closest('.flex').children[0].textContent.slice(4)
    let place = e.target.textContent
    let placeToUnset = null
    if (selectedPlaces.value.some((item) => item.row === row && item.place === place)) {
      placeToUnset = place
    }
    setPlacesData(
      placesData.value.map((item) =>
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
    )
    localStorage.setItem('placesData', JSON.stringify(placesData.value))
  }

  onMounted(() => {
    const savedPlacesData = JSON.parse(localStorage.getItem('placesData'))
    if (savedPlacesData) {
      setPlacesData(savedPlacesData)
    }
  })

  return {
    placesData,
    setPlacesData,
    selectedTime,
    choosePlace,
    isPlacesButtonDisabled,
    placesError,
    selectedPlacesText
  }
}
