import { computed, toRefs } from 'vue'
import { useCartStore } from '@/store/cart'

export function useOrder() {
  const { selectedTime, selectedPlaces, placesData } = toRefs(useCartStore())
  const { setPlacesData } = useCartStore()

  const isButtonDisabled = computed(() => selectedPlaces.value.length === 0)
  const totalPriceText = computed(() =>
    selectedPlaces.value.length === 0
      ? null
      : `Итого: ${selectedPlaces.value.reduce((sum, item) => sum + item.price, 0)} руб.`
  )

  function handleDelete(e) {
    let data = e.target.closest('#ticket').children[0].children[0].textContent.split(', ')
    let row = data[0].slice(7)
    let place = data[1].slice(6)
    setPlacesData(
      placesData.value.map((item) =>
        item.row !== row
          ? item
          : {
              ...item,
              places: item.places.map((item) =>
                item.place !== place ? item : { ...item, selected: false }
              )
            }
      )
    )
    localStorage.setItem('placesData', JSON.stringify(placesData.value))
  }

  return {
    selectedTime,
    selectedPlaces,
    handleDelete,
    isButtonDisabled,
    totalPriceText
  }
}
