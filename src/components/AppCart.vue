<script setup>
import { onUnmounted } from 'vue'

import TimeSection from '@/components/sections/TimeSection.vue'
import PlaceSection from '@/components/sections/PlaceSection.vue'
import OrderSection from '@/components/sections/OrderSection.vue'
import FormSection from '@/components/sections/FormSection.vue'
import SuccessSection from '@/components/sections/SuccessSection.vue'

defineProps({
  chosenFilm: Object,
  section: String,
  sessions: Array,
  chosenTime: Object
})

const emit = defineEmits(['onClose', 'setSection'])

onUnmounted(() => emit('setSection', 'time'))
</script>

<template>
  <div
    @click="$emit('onClose')"
    class="fixed inset-0 bg flex justify-center items-center cursor-pointer"
  >
    <div
      @click.stop
      class="p-8 flex flex-col gap-10 sm:gap-3 text-white cursor-default relative w-full h-full max-w-96 max-h-650 sm:w-3/4 sm:max-w-xl sm:h-5/6 sm:max-h-full md:w-2/3 lg:w-1/2 lg:max-w-2xl bg-slate-700 opacity-1 rounded-3xl"
    >
      <img
        @click="$emit('onClose')"
        class="absolute top-4 right-4 w-6 md:w-8 cursor-pointer hover:opacity-40 transition"
        src="/close.svg"
        alt="Иконка закрытия"
      />
      <TimeSection v-if="section === 'time'" :chosen-film :sessions />
      <PlaceSection v-else-if="section === 'place'" :chosen-film :chosen-time />
      <OrderSection v-else-if="section === 'order'" :chosen-film :chosen-time />
      <FormSection v-else-if="section === 'form'" :chosen-film :chosen-time />
      <SuccessSection v-else-if="section === 'success'" @on-close="$emit('onClose')" />
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
