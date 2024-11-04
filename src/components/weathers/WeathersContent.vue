<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import { storeToRefs } from 'pinia';

const weatherStore = useWeatherStore();
const { weatherData, loading, error, cityData } = storeToRefs(weatherStore);

const getCityInfo = (city) => {
  weatherStore.cityData.forEach(c => c.selected = c.code === city.code);
  weatherStore.fetchWeather(city.code);
};

const selectedCityTimezone = computed(() => weatherData.value?.time ?? 0);
console.log(selectedCityTimezone.value);
const currentTime = ref('');
const updateLocalTime = () => {
  if (selectedCityTimezone.value) {
    currentTime.value = weatherStore.convertToLocalTime(selectedCityTimezone.value);
  }
};

onMounted(() => {
  updateLocalTime(); // 초기 렌더 시 한 번 업데이트
  const interval = setInterval(updateLocalTime, 1000); // 매초 업데이트
  onUnmounted(() => clearInterval(interval)); // 컴포넌트 해제 시 타이머 제거
});

</script>

<template>
  <div class="weather-wrapper">
    <h1>도시를 클릭해서 날씨를 알아보세요.</h1>
    <ul class="city-wrap">
      <li
        v-for="(city, index) in cityData"
        :key="city.code"
        :class="{ selected: city.selected }"
        @click="getCityInfo(city)"
      >
        {{ city.label }}
      </li>
    </ul>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="weatherData" class="weather-info">
      <h2>{{ cityData.find(city => city.selected).label }}</h2>
      <img :src="weatherData.weatherIconUrl" alt="Weather Icon" class="weather-icon">
      <div class="temp-container">
        <p class="temperature">{{ weatherStore.displayTemperature(weatherData.tempMax) }}<span class="temp-unit">°C</span></p>
        <p class="temperature">{{ weatherStore.displayTemperature(weatherData.tempMin) }}<span class="temp-unit">°C</span></p>
      </div>
      <p class="description">{{ weatherData.description }}</p>
      <p class="humidity">습도: {{ weatherData.humidity }}%</p>
      <p class="wind">풍속: {{ weatherData.windSpeed }} m/s</p>
      <p class="time">현재시간: {{ currentTime }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather-wrapper {
  text-align: center;
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: auto;
  background: #6666;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  .city-wrap {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;

    li {
      border: 1px solid;
      padding: 10px;
      cursor: pointer;
      transition: color 0.3s;
      &.selected {
        font-weight: bold;
        color: #007bff;
      }
      &:hover {
        color: #007bff;
      }
    }
  }

  .weather-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .weather-icon {
      width: 100px;
    }

    .temp-container {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 10px;

      p {
        margin: 0;
      }

      p:last-of-type {
        color: #70757a;
      }

      .temperature {
        font-size: 2rem;
        color: #202124;
        margin: 10px 0;

        .temp-unit {
          font-size: 1.125rem;
        }
      }
    }

    .description, .humidity, .wind, .time {
      font-size: 1rem;
      color: #555;
      margin: 4px 0;
    }
  }

  .loading, .error {
    color: #ff5722;
    font-weight: bold;
    margin: 20px;
  }
}
</style>
