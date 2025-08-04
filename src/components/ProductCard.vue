<template>
  <div class="border rounded-md shadow-sm hover:shadow-md transition w-[160px] p-2 flex flex-col items-center space-y-2">
    <div class="w-14 h-14 flex items-center justify-center overflow-hidden">
      <img 
        :src="product.image" 
        loading="lazy" 
        class="max-w-full max-h-full object-contain"
      />
    </div>
    <h2 class="font-semibold text-[13px] text-center truncate">{{ product.title }}</h2>
    <p class="text-[11px] text-gray-500 text-center truncate">{{ product.category }}</p>
    <p class="font-bold text-[12px] text-center">{{ usdPrice }} | {{ vesPrice }}</p>
  </div>
</template>


<script setup>
import { defineProps } from 'vue'

const props = defineProps(['product', 'rate']);

// Formateadores
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

// Cálculos
const vesPrice = vesFormatter.format(props.product.price * props.rate);
const usdPrice = usdFormatter.format(props.product.price);
</script>
