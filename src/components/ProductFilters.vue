<template>
  <div class="flex flex-col md:flex-row gap-4 mb-6 items-center">
    <select v-model="selectedCategory" class="p-8 border rounded w-full md:w-100">
      <option value="">Todas las categorías</option>
      <option v-for="cat in categories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>

    <div class="flex flex-col">
      <label class="text-sm mb-1">Precio máximo: ${{ priceRange }}</label>
      <input type="range" v-model="priceRange" :min="0" :max="maxPrice" class="w-100" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['categories', 'maxPrice']);
const emit = defineEmits(['filter']);

const selectedCategory = ref('');
const priceRange = ref(props.maxPrice);

watchEffect(() => {
  if (props.maxPrice > 0) {
    priceRange.value = props.maxPrice
  }
})

watch([selectedCategory, priceRange], () => {
  emit('filter', {
    category: selectedCategory.value,
    price: priceRange.value
  });
});
</script>
