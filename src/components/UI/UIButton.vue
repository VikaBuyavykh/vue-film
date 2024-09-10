<script setup></script>

<template>
  <button
    class="cursor-pointer bg-white hover:bg-orange-300 active:bg-orange-400 transition rounded-xl w-36 py-2 px-7 text-cyan-900 text-xs sm:text-sm font-semibold disabled:bg-white disabled:opacity-40 disabled:cursor-default"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
