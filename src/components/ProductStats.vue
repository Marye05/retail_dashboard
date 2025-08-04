<template>
  <div class="grid grid-cols-3 md:grid-cols-3 gap-8 mb-6 text-center">
    <div class="bg-white shadow p-4 rounded">
      <h3 class="text-gray-500 text-sm">Total Productos</h3>
      <p class="text-xl font-bold">{{ total }}</p>
    </div>
    <div class="bg-white shadow p-4 rounded">
      <h3 class="text-gray-500 text-sm">Categorías Únicas</h3>
      <p class="text-xl font-bold">{{ categoryCount }}</p>
    </div>
    <div class="bg-red shadow p-4 rounded">
      <h3 class="text-gray-500 text-sm">Precio Prom. USD</h3>
      <p class="text-xl font-bold">${{ avgPrice }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps(['total', 'categoryCount', 'avgPrice']);
</script>
