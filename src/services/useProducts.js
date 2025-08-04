import { ref } from 'vue';
import axios from 'axios';

export function useProducts() {
  const products = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const res = await axios.get('https://fakestoreapi.com/products');
      products.value = res.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products/categories');
      categories.value = res.data;
    } catch (err) {
      console.error('Error al obtener categorías', err);
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories 
  };
}