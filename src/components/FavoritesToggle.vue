<template>
  <button
    @click="$emit('toggle')"
    class="border border-red-400 px-3 py-1 rounded text-sm hover:bg-red-100 text-red-600"
  >
    {{ active ? 'Ver todos' : 'Ver favoritos ❤️' }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  active: Boolean
});
defineEmits(['toggle']);
</script>