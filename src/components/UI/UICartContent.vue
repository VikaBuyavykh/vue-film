<script setup>
import { useCartStore } from '@/store/cart'
import UIButton from '@/components/UI/UIButton.vue'

const props = defineProps({
  nextSection: [String, null],
  prevSection: [String, null],
  error: [String, null],
  isButtonDisabled: [Boolean, null],
  text: [String, null],
  isSubmit: Boolean
})

const { setSection } = useCartStore()

function handleButtonClick() {
  if (props.nextSection) {
    setSection(props.nextSection)
  }
}

function handleBackClick() {
  if (props.prevSection) {
    setSection(props.prevSection)
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 h-full">
    <div v-if="$slots.info">
      <slot name="info"></slot>
    </div>
    <p
      v-else
      class="text-sm cursor-pointer hover:opacity-60 transition hover:-translate-x-1"
      @click="handleBackClick"
    >
      <span class="mr-2">&#10094;</span> Назад
    </p>
    <h2 class="text-2xl sm:text-3xl md:text-4xl overflow-wrap"><slot name="title"></slot></h2>
    <p class="text-sm md:text-base"><slot name="desc"></slot></p>
    <slot name="main"></slot>
    <div class="mt-auto w-full sm:m-0 flex gap-2 sm:gap-4">
      <UIButton
        :disabled="isButtonDisabled"
        :type="isSubmit ? 'submit' : 'button'"
        @click="handleButtonClick"
        :form="isSubmit ? 'order' : null"
        ><slot name="button"></slot
      ></UIButton>
      <span v-if="error" class="text-rose-400 text-xs sm:text-sm mt-0 mt">{{ error }}</span>
      <span
        v-else-if="!error && text"
        class="text-nowrap overflow-x-auto scrollbar-horizontal mt-1"
        >{{ text }}</span
      >
    </div>
  </div>
</template>

<style scoped>
@media screen and (width > 328px) {
  .mt {
    margin-top: 8px;
  }
}
</style>
