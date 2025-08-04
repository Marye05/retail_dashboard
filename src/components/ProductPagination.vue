<template>
  <div class="flex justify-center mt-4 gap-2">
    <button
      v-for="page in totalPages"
      :key="page"
      :class="['px-3 py-1 rounded border', { 'bg-blue-500 text-white': currentPage === page }]"
      @click="$emit('change', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['currentPage', 'totalPages']);
defineEmits(['change']);
</script>
