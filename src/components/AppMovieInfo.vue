<script setup>
defineProps({
  rating: String,
  director: String,
  genre: String
})
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row md:gap-5 text-xs sm:text-sm md:text-base text-white">
    <p>
      <img src="/star.svg" alt="Иконка рейтинга" class="inline w-2.5 mr-1.5 mb-1" />{{ rating }}
    </p>
    <div class="flex items-center">
      <div class="bg-orange-300 w-1 h-1 rounded-lg mt-1 mr-1"></div>
      <p>{{ director }}</p>
    </div>
    <div class="flex items-center">
      <div class="bg-orange-300 w-1 h-1 rounded-lg mt-1 mr-1"></div>
      <p>{{ genre }}</p>
    </div>
  </div>
</template>
