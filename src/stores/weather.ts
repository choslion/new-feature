import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

interface CityData {
  code: string;
  label: string;
  selected: boolean;
}

interface WeatherData {
  temp: number;
  tempMax: number;
  tempMin: number;
  description: string;
  time: number;
  icon: string;
  weatherIconUrl: string;
  humidity: number;
  windSpeed: number;
}

export const useWeatherStore = defineStore('weather', () => {
  const weatherData = ref<WeatherData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const cityData = ref<CityData[]>([
    { code: 'seoul', label: 'Seoul', selected: false },
    { code: 'tokyo', label: 'Tokyo', selected: false },
    { code: 'ankara', label: 'Ankara', selected: false },
    { code: 'rome', label: 'Rome', selected: false },
  ]);

  const fetchWeather = async (cityCode: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityCode}&appid=${API_KEY}&lang=kr`
      );

      const temp = response.data.main.temp;
      const tempMin = response.data.main.temp_min;
      const tempMax = response.data.main.temp_max;
      const description = response.data.weather[0].description;
      const icon = response.data.weather[0].icon;
      const time = response.data.timezone;
      const humidity = response.data.main.humidity;
      const windSpeed = response.data.wind.speed;
      const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherData.value = {
        temp,
        tempMin,
        tempMax,
        description,
        time,
        icon,
        weatherIconUrl,
        humidity,
        windSpeed
      };
    } catch (err) {
      error.value = 'Failed to fetch weather data';
      console.error('Error fetching weather data:', err);
    } finally {
      loading.value = false;
    }
  };

  // 온도 변경
  const displayTemperature = (temp: number) => {
    return (temp - 273.15).toFixed(1);
  };

  function convertToLocalTime(timezone: number) {
    // 현재 UTC 시간을 가져오기
    const currentUTC = new Date().getTime(); // 현재 시간 (밀리초 단위)
    const utcOffset = new Date().getTimezoneOffset() * 60 * 1000; // 로컬 UTC 오프셋 (밀리초)
    
    // OpenWeather의 timezone을 적용한 현지 시간 계산
    const localTime = new Date(currentUTC + timezone * 1000 - utcOffset);
  
    return localTime.toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  return {
    weatherData,
    loading,
    cityData,
    error,
    fetchWeather,
    displayTemperature,
    convertToLocalTime,
  };
});
