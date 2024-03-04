<script setup>
import { inject, ref } from 'vue'
import axios from 'axios'
import { handleInput } from '../utils/handleInput'

const { apiError, chosenTime, chosenPlaces, totalPrice, sessions, isOrderForm, isSuccess } =
  inject('provider')
const { chosenFilm } = inject('app')
const occupiedPlacesApiData = ref([])

async function onFormSubmit() {
  occupiedPlacesApiData.value =
    sessions.value[
      sessions.value.indexOf(sessions.value.find((item) => item.date === chosenTime.value.date))
    ].times
  chosenPlaces.value.forEach((item, index) => {
    occupiedPlacesApiData.value = occupiedPlacesApiData.value.map((item) =>
      item.time !== chosenTime.value.time
        ? item
        : {
            ...item,
            rows: item.rows.map((item) =>
              item.row !== chosenPlaces.value[index].row.slice(4)
                ? item
                : {
                    ...item,
                    places: item.places.map((item) =>
                      item.place !== chosenPlaces.value[index].place
                        ? item
                        : { ...item, isOccupied: true }
                    )
                  }
            )
          }
    )
  })
  try {
    await axios.post('https://f3f76ea5491c3712.mokky.dev/orders', {
      chosenFilm: chosenFilm.value.title,
      chosenTime: chosenTime.value,
      chosenPlaces: chosenPlaces.value,
      totalPrice: totalPrice.value,
      userEmail: document.forms.order.elements.email.value,
      userTel: document.forms.order.elements.tel.value
    })
    await axios.patch(
      `https://f3f76ea5491c3712.mokky.dev/sessions/${sessions.value.find((item) => item.date === chosenTime.value.date).id}`,
      {
        times: occupiedPlacesApiData.value
      }
    )
    isOrderForm.value = false
    isSuccess.value = true
  } catch (error) {
    apiError.value = 'Что-то пошло не так. Попробуйте оформить заказ позже'
    console.log(error)
  }
}

function checkValidity(e) {
  apiError.value = ''
  const form = e.target.form
  const formErrors = form.querySelectorAll('span')
  const formInputs = form.querySelectorAll('input')
  const formButton = document.querySelector('button[type="submit"]')
  const isFormInvalid = Array.from(formErrors).some((error) => {
    return error.textContent !== ''
  })
  const hasAnEmptyInput = Array.from(formInputs).some((input) => {
    return input.value === ''
  })
  if (!isFormInvalid && !hasAnEmptyInput) {
    formButton.removeAttribute('disabled')
  } else {
    formButton.setAttribute('disabled', true)
  }
}
</script>

<template>
  <form
    @submit.prevent="onFormSubmit"
    @input="checkValidity"
    name="order"
    id="order"
    novalidate
    class="w-full px-7 pt-7 pb-2 flex flex-col bg-slate-600 rounded-3xl mt-2"
  >
    <input
      @input="handleInput"
      type="email"
      name="email"
      id="email"
      placeholder="Почта"
      minlength="2"
      maxlength="30"
      required
      class="bg-slate-700 rounded-xl text-sm py-2 px-5 outline-none"
    />
    <span id="error-email" class="min-h-5 text-rose-400 text-left text-sm ml-5 mb-1"></span>
    <input
      @input="handleInput"
      type="tel"
      inputmode="tel"
      name="tel"
      id="tel"
      placeholder="+7 (9"
      minlength="11"
      maxlength="16"
      required
      class="w-1/2 bg-slate-700 rounded-xl text-sm py-2 px-5 outline-none"
    />
    <span id="error-tel" class="min-h-5 text-rose-400 text-left text-sm ml-5"></span>
  </form>
</template>

<style scoped></style>
