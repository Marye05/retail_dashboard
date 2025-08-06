<template>
  <div>
    <div class="w-full border-b border-gray-200">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 bg-white">
        <div class="flex items-center justify-between w-full sm:w-auto">
          <div class="flex items-center">
            <img src="../assets/daka.png" alt="daka" class="h-16 w-auto" />
            <h2 class="text-2xl font-semibold ml-4">Tablero de Control</h2>
          </div>

        </div>

        <div class="mt-2 sm:mt-0 ml-auto">
          <FavoritesToggle :active="showFavoritesOnly" @toggle="toggleFavoritesView" />
        </div>
      </div>
    </div>

    <div class="p-4 max-w-6xl mx-auto">
      <ProductStats
        :total="filteredProducts.length"
        :categoryCount="uniqueCategories"
        :avgPrice="averagePrice"
      />
    <ProductFilters
      v-if="categories.length"
      :categories="categories"
      :maxPrice="maxPrice"
      @filter="applyFilters"
    />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <ProductCard
          v-for="p in paginatedProducts"
          :key="p.id"
          :product="p"
          :rate="exchangeRate"
          :isFavorite="favoriteIds.includes(p.id)"
          @toggle-favorite="toggleFavorite"
        />
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
import FavoritesToggle from '@/components/FavoritesToggle.vue';

const { products, fetchProducts, categories, fetchCategories } = useProducts();
const { rate: exchangeRate, fetchRate } = useExchangeRate();

const filteredProducts = ref([]);
const currentPage = ref(1);
const perPage = 5;
const showFavoritesOnly = ref(false);
const favoriteIds = ref([]);
const activeCategory = ref(null);
const activePrice = ref(null);

const maxPrice = computed(() => {
  const base = showFavoritesOnly.value
    ? products.value.filter(p => favoriteIds.value.includes(p.id))
    : products.value;
  return base.length ? Math.max(...base.map(p => p.price)) : 0;
});

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

function toggleFavoritesView() {
  showFavoritesOnly.value = !showFavoritesOnly.value;
  currentPage.value = 1;
  applyFilters({ category: activeCategory.value, price: activePrice.value });
}

function toggleFavorite(productId) {
  const index = favoriteIds.value.indexOf(productId);
  if (index >= 0) {
    favoriteIds.value.splice(index, 1);
  } else {
    favoriteIds.value.push(productId);
  }
  localStorage.setItem('favoriteProducts', JSON.stringify(favoriteIds.value));
  applyFilters({ category: activeCategory.value, price: activePrice.value });
}

function applyFilters({ category, price }) {
  activeCategory.value = category;
  activePrice.value = price;

  let baseProducts = products.value;

  if (showFavoritesOnly.value) {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
    baseProducts = baseProducts.filter(p => storedFavorites.includes(p.id));
  }

  filteredProducts.value = baseProducts.filter(p => {
    const matchCategory = !category || p.category === category;
    const matchPrice = typeof price === 'number' ? p.price <= price : true;
    return matchCategory && matchPrice;
  });

  currentPage.value = Math.min(currentPage.value, totalPages.value) || 1;
}

function goToPage(page) {
  currentPage.value = page;
}

onMounted(async () => {
  await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchRate()
  ]);
  filteredProducts.value = products.value;
  favoriteIds.value = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
});
</script>