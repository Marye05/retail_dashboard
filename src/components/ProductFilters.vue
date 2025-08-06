<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
    <div class="w-full sm:w-1/2" v-if="categories?.length">
      <label class="block text-sm font-medium mb-1">Categoría</label>
      <Listbox v-model="selectedCategory">
        <div class="relative">
          <ListboxButton class="w-full border px-3 py-2 rounded flex justify-between items-center">
            <span>{{ selectedCategory || 'Todas las categorías' }}</span>
            <!-- Flecha -->
            <svg class="w-4 h-4 text-gray-500 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </ListboxButton>

          <ListboxOptions class="absolute z-10 w-full mt-1 bg-white border rounded shadow">
            <ListboxOption :value="null" class="cursor-pointer px-4 py-2 hover:bg-gray-100">
              Todas las categorías
            </ListboxOption>
            <ListboxOption
              v-for="cat in categories"
              :key="cat"
              :value="cat"
              class="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {{ cat }}
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>

    <div class="w-full sm:w-1/2">
      <label class="block text-sm font-medium mb-1">
        Precio máximo: ${{ isNaN(price) ? '0.00' : price.toFixed(2) }}
      </label>
      <input
        type="range"
        class="w-full"
        :max="maxPrice"
        min="0"
        step="1"
        v-model.number="price"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  maxPrice: {
    type: Number,
    default: 1000
  }
})

const emit = defineEmits(['filter'])

const selectedCategory = ref(null)
const price = ref(props.maxPrice)

watch(() => props.maxPrice, (newVal) => {
  price.value = newVal
})

watch([selectedCategory, price], () => {
  emit('filter', {
    category: selectedCategory.value,
    price: price.value
  })
})
</script>
