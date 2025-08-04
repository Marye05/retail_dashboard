<template>
  <div class="border rounded p-4 flex flex-col items-center space-y-2 h-full bg-white shadow">
    <div class="w-full h-[180px] flex items-center justify-center overflow-hidden">
      <img 
        :src="product.image" 
        class="object-contain h-full w-auto max-w-full"
      />
    </div>
    <h2 class="text-sm text-center font-semibold line-clamp-2">
      {{ product.title }}
    </h2>
    <p class="text-xs text-gray-500 text-center">
      {{ product.category }}
    </p>
    <p class="text-sm font-bold text-center">
      {{ usdPrice }} | {{ vesPrice }}
    </p>
  </div>
</template>


<script setup>
import { defineProps } from 'vue'

const props = defineProps(['product', 'rate']);

// Formateador del precio
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

// Cálculos del precio
const vesPrice = vesFormatter.format(props.product.price * props.rate);
const usdPrice = usdFormatter.format(props.product.price);
</script>
