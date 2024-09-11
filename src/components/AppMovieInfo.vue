<script setup>
defineProps({
  rating: String,
  director: String,
  genre: String
})
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row md:gap-5 text-xs sm:text-sm md:text-base text-white">
    <p class="star">{{ rating }}</p>
    <p class="dote">{{ director }}</p>
    <p class="dote">{{ genre }}</p>
  </div>
</template>

<style scoped>
.dote::before {
  content: '•';
  color: #fdba74;
  margin-right: 6px;
}

.star::before {
  content: '★';
  color: #fdba74;
  margin-right: 8px;
}
</style>
