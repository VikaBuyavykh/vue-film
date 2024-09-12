<script setup>
import { useForm } from '@/composables/useForm'
import { handleInput } from '@/utils/handleInput'
import UICartContent from '@/components/UI/UICartContent.vue'

const props = defineProps({
  chosenFilm: Object
})

const {
  email,
  tel,
  selectedTime,
  checkValidity,
  handleSubmit,
  isButtonDisabled,
  totalPriceText,
  errorApi
} = useForm(props.chosenFilm)
</script>

<template>
  <UICartContent
    prev-section="order"
    :is-button-disabled
    :text="totalPriceText"
    is-submit
    :error="errorApi"
  >
    <template #title>Оформление заказа</template>
    <template #desc
      >{{ chosenFilm.title }}, {{ selectedTime.date }}, {{ selectedTime.time }}</template
    >
    <template #button>Оплатить</template>
    <template #main>
      <div class="grow">
        <form
          @submit.prevent="handleSubmit"
          @input="checkValidity"
          name="order"
          id="order"
          novalidate
          class="w-full px-7 pt-7 pb-2 flex flex-col bg-slate-600 rounded-3xl mt-2"
        >
          <input
            @input="handleInput"
            v-model="email"
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
            v-model="tel"
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
      </div>
    </template>
  </UICartContent>
</template>

<style scoped></style>
