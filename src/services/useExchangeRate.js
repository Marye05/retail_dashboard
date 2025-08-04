import { ref } from 'vue';
import axios from 'axios';

export function useExchangeRate() {
  const rate = ref(0);

  const fetchRate = async () => {
    try {
      const res = await axios.get('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv');
      rate.value = res.data.monitors.bcv.price;
    } catch {
      rate.value = 35; // fallback si falla la API
    }
  };

  return { rate, fetchRate };
}
