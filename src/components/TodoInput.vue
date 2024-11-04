<script setup lang="ts">
  import { ref } from 'vue';
  import { useTodoStore } from '../stores/todo';
  import { storeToRefs } from 'pinia';

  // 스토어 사용
  const todoStore = useTodoStore();
  const { addTodo } = todoStore;

  // 새로운 할 일 입력 관리
  const newTodo = ref('');

  // 할 일 추가 함수
  const addNewTodo = () => {
    if (newTodo.value.trim()) {
      addTodo(newTodo.value);
      newTodo.value = ''; // 입력창 초기화
    }
  };

</script>

<template>
  <div class="todo-input">
    <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="오늘의 할 일" />
    <button @click="addNewTodo">Add</button>
  </div>
</template>

<style lang="scss" scoped>
  .todo-input {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      outline: none;

      &:focus {
        border-color: $primary-color;
      }
    }

    button {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: $primary-color;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background-color: red;
      }
    }
  }
</style>
