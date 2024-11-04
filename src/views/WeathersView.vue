<script setup lang="ts">
// import { useCounterStore } from "@/stores/counter";
// import { storeToRefs } from "pinia";
//   const store = useCounterStore();
//   const { count } = storeToRefs(store);
//   count.value++;
// storeToRefs로 필요한 속성들을 ref로 분리
// const { count, doubleCount } = storeToRefs(store);
import WeathersContent from '../components/weathers/WeathersContent.vue';

  
</script>

<template>
  <div class="weathers">
    <h1>오늘의 날씨</h1>
    <WeathersContent />
    <!-- 컴포넌트들 -->
  </div>
</template>

<style>

</style>
