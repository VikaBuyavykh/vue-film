<script setup>
import { ref, provide, computed, onMounted } from 'vue'
import axios from 'axios'
import MovieInfo from './MovieInfo.vue'
import TimeChoice from './TimeChoice.vue'
import PlaceChoice from './PlaceChoice.vue'
import Tickets from './Tickets.vue'
import OrderForm from './OrderForm.vue'
import Success from './Success.vue'
import { HIGH_PRICE, LOW_PRICE } from '../utils/constants'

defineProps({
  onClickClose: Function,
  chosenFilm: Object
})

const sessions = ref([])
const errorMessage = ref('')
const apiError = ref('')
const chosenTime = ref({})
const chosenPlaces = ref([])
const hasAChosenPlace = computed(() => chosenPlaces.value.length !== 0)
const chosenPlacesString = computed(() =>
  chosenPlaces.value.map((item) => `${item.row}, место ${item.place}`).join('/')
)
const totalPrice = computed(() => {
  const prices = chosenPlaces.value.map((item) =>
    Number(item.row.slice(4)) > 1 &&
    Number(item.row.slice(4)) < 5 &&
    Number(item.place) > 3 &&
    Number(item.place) < 8
      ? HIGH_PRICE
      : LOW_PRICE
  )
  return prices.reduce((a, b) => a + b, 0)
})

const isTimeChoice = ref(true)
const isPlaceChoice = ref(false)
const isBasket = ref(false)
const isOrderForm = ref(false)
const isSuccess = ref(false)

function onNextClick() {
  if (isTimeChoice.value) {
    if (!chosenTime.value.date) {
      errorMessage.value = 'Выберите дату и время'
    } else {
      isTimeChoice.value = false
      isPlaceChoice.value = true
    }
  } else if (isPlaceChoice.value) {
    if (chosenPlaces.value.length === 0) {
      errorMessage.value = 'Выберите место'
    } else {
      isPlaceChoice.value = false
      isBasket.value = true
    }
  } else if (isBasket.value) {
    isBasket.value = false
    isOrderForm.value = true
  }
}

function onBackClick() {
  if (isPlaceChoice.value) {
    isPlaceChoice.value = false
    isTimeChoice.value = true
    chosenPlaces.value = []
  }
  if (isBasket.value) {
    isBasket.value = false
    isPlaceChoice.value = true
  }
  if (isOrderForm.value) {
    isOrderForm.value = false
    isBasket.value = true
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get('https://f3f76ea5491c3712.mokky.dev/sessions')
    sessions.value = data
  } catch (error) {
    console.log(error)
  }
})

provide('provider', {
  chosenTime,
  errorMessage,
  chosenPlaces,
  sessions,
  apiError,
  totalPrice,
  isOrderForm,
  isSuccess
})
</script>

<template>
  <div
    @click="onClickClose"
    class="fixed inset-0 bg flex justify-center items-center cursor-pointer"
  >
    <div
      @click.stop
      :class="{
        'justify-center': isSuccess,
        'justify-start': !isSuccess,
        'sm:justify-between': !isSuccess
      }"
      class="overflow-y-auto p-8 flex flex-col gap-10 sm:gap-3 text-white cursor-default relative w-full h-full max-w-96 max-h-650 narrow-size sm:w-3/4 sm:max-w-xl sm:h-5/6 sm:max-h-full md:w-2/3 lg:w-1/2 lg:max-w-2xl bg-slate-700 opacity-1 rounded-3xl"
    >
      <div class="flex flex-col gap-3">
        <img
          @click="onClickClose"
          class="absolute top-4 right-4 w-6 md:w-8 cursor-pointer hover:opacity-40 transition"
          src="/close.svg"
          alt="Иконка закрытия"
        />
        <Success v-if="isSuccess" :onCloseDrawer="onClickClose" />
        <p
          v-if="!isTimeChoice && !isSuccess"
          class="text-sm cursor-pointer hover:opacity-60 transition hover:-translate-x-1"
          @click="onBackClick"
        >
          <span class="mr-2">&#10094;</span> Назад
        </p>
        <MovieInfo
          v-if="isTimeChoice"
          :rating="chosenFilm.rating"
          :director="chosenFilm.director"
          :genre="chosenFilm.genre"
        />
        <h2 v-if="!isSuccess" class="text-2xl sm:text-3xl md:text-4xl overflow-wrap">
          {{
            isTimeChoice
              ? chosenFilm.title
              : isPlaceChoice
                ? 'Выберите место'
                : isBasket
                  ? 'Корзина'
                  : isOrderForm
                    ? 'Оформление заказа'
                    : ''
          }}
        </h2>
        <p v-if="!isSuccess" class="text-sm md:text-base">
          {{
            isTimeChoice
              ? chosenFilm.shortDescription
              : `${chosenFilm.title}, ${chosenTime.date}, ${chosenTime.time}`
          }}
        </p>
        <Tickets v-if="isBasket" />
        <OrderForm v-if="isOrderForm" />
      </div>
      <div :class="{ 'gap-8': isPlaceChoice || isTimeChoice }" class="flex flex-col">
        <PlaceChoice v-if="isPlaceChoice" />
        <TimeChoice v-if="isTimeChoice" />
        <span v-if="isOrderForm" class="min-h-5 mb-3 ml-2 text-rose-400 text-left text-sm">{{
          apiError
        }}</span>
        <div class="mx-auto w-full sm:m-0 flex gap-2 sm:gap-4">
          <button
            v-if="isTimeChoice || isPlaceChoice || isBasket"
            @click="onNextClick"
            type="button"
            :disabled="isBasket && !hasAChosenPlace"
            class="cursor-pointer bg-white hover:bg-orange-300 active:bg-orange-400 transition rounded-xl w-36 py-2 text-cyan-900 text-xs sm:text-sm font-semibold disabled:bg-white disabled:opacity-40 disabled:cursor-default"
          >
            {{ isBasket ? 'Оформить' : 'Далее' }}
          </button>
          <button
            v-if="isOrderForm"
            type="submit"
            form="order"
            disabled
            class="cursor-pointer bg-white hover:bg-orange-300 active:bg-orange-400 transition rounded-xl w-36 py-2 text-cyan-900 text-xs sm:text-sm font-semibold disabled:bg-white disabled:opacity-40 disabled:cursor-default"
          >
            Оплатить
          </button>
          <span
            v-if="(isPlaceChoice && hasAChosenPlace) || isBasket || isOrderForm"
            class="text-nowrap overflow-x-auto mt-1"
            >{{
              isPlaceChoice && hasAChosenPlace ? chosenPlacesString : `Итого: ${totalPrice} руб.`
            }}</span
          >
          <span v-else class="text-rose-400 text-xs sm:text-sm mt-0 mt">{{ errorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-color: rgba(0, 0, 0, 0.7);
}

.max-h-650 {
  max-height: 650px;
}

@media screen and (width > 328px) {
  .mt {
    margin-top: 8px;
  }
}
</style>
