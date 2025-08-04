<template>
  <div>
    <div class="flex items-center justify-between px-4 py-2 bg-white">
      <div class="p-2 rounded">
        <img src="../assets/img.png" alt="daka" class="h-4 w-auto" />
      </div>
      <h2 class="flex-1 text-center text-2xl font-semibold">Tablero de Control</h2>
      <div class="w-16"></div>
    </div>

  <div class="p-4 max-w-6xl mx-auto">
    <ProductStats
      :total="filteredProducts.length"
      :categoryCount="uniqueCategories"
      :avgPrice="averagePrice"
    />
    <ProductFilters
      :categories="categories"
      :maxPrice="maxPrice"
      @filter="applyFilters"
    />

    <div class="grid grid-cols-2 gap-4 auto-rows-auto">
      <template v-for="(p, index) in paginatedProducts" :key="p.id">
        <div
          :class="getGridClass(index)"
        >
          <ProductCard :product="p" :rate="exchangeRate" />
        </div>
      </template>
    </div>

    <ProductPagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change="goToPage"
    />
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProducts } from '@/services/useProducts';
import { useExchangeRate } from '@/services/useExchangeRate';
import ProductCard from '@/components/ProductCard.vue';
import ProductStats from '@/components/ProductStats.vue';
import ProductFilters from '@/components/ProductFilters.vue';
import ProductPagination from '@/components/ProductPagination.vue';

const { products, fetchProducts, categories, fetchCategories } = useProducts();
const { rate: exchangeRate, fetchRate } = useExchangeRate();

const filteredProducts = ref([]);
const currentPage = ref(1);
const perPage = 5;

const maxPrice = computed(() => Math.max(...products.value.map(p => p.price)));
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / perPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredProducts.value.slice(start, start + perPage);
});

const uniqueCategories = computed(() => {
  const set = new Set(filteredProducts.value.map(p => p.category));
  return set.size;
});

const averagePrice = computed(() => {
  if (filteredProducts.value.length === 0) return 0;
  const sum = filteredProducts.value.reduce((acc, p) => acc + p.price, 0);
  return (sum / filteredProducts.value.length).toFixed(2);
});

function applyFilters({ category, price }) {
  currentPage.value = 1;
  filteredProducts.value = products.value.filter(p => {
    const matchCategory = !category || p.category === category;
    const matchPrice = p.price <= price;
    return matchCategory && matchPrice;
  });
}

function goToPage(page) {
  currentPage.value = page;
}

const getGridClass = (index) => {
  return index === 4 ? 'col-span-2' : '';
};

onMounted(async () => {
  await Promise.all([fetchProducts(), fetchCategories(), fetchRate()]);
  filteredProducts.value = products.value;
});
</script>