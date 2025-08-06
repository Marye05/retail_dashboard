<template>
  <div class="relative rounded-lg shadow hover:shadow-lg p-4">    
    <button @click="toggleFavorite" class="absolute top-2 right-2 text-gray-400 hover:text-red-500">
      <svg v-if="isFavorite" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-red-500" viewBox="0 0 20 20">
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343 3.172 11.5a4 4 0 010-5.656z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/>
      </svg>
    </button>

    <div class="w-full h-[180px] flex items-center justify-center overflow-hidden">
      <img :src="product.image" class="object-contain h-full w-auto max-w-full" />
    </div>

    <h2 class="text-sm text-center font-semibold line-clamp-2">{{ product.title }}</h2>
    <p class="text-xs text-gray-500 text-center">{{ product.category }}</p>
    <p class="text-sm font-bold text-center">{{ usdPrice }} | {{ vesPrice }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['product', 'rate', 'isFavorite']);
const emit = defineEmits(['toggle-favorite']);

const vesFormatter = new Intl.NumberFormat('es-VE', {
  style: 'currency',
  currency: 'VES',
  minimumFractionDigits: 2,
});

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const vesPrice = vesFormatter.format(props.product.price * props.rate);
const usdPrice = usdFormatter.format(props.product.price);

function toggleFavorite() {
  emit('toggle-favorite', props.product.id);
}
</script>