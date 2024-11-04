<script setup lang="ts">
import AddList from '../components/AddList.vue';
import TodoInput from '../components/TodoInput.vue';
import { ref } from 'vue';
import { useTodoStore } from '../stores/todo';
import { storeToRefs } from 'pinia';


</script>
<template>
  <div class="todo-list">
    <h1>To-Do List</h1>

    <!-- 할 일 입력 -->
    <TodoInput />

    <!-- 할 일 목록 출력 -->
     <AddList />
  </div>
</template>

<style lang="scss" scoped>
  .todo-list {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h1 {
      text-align: center;
      color: $primary-color;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
</style>
