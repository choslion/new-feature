<script setup lang="ts">
  import { useTodoStore } from '../stores/todo';
  import { storeToRefs } from 'pinia';

  // 스토어 사용
  const todoStore = useTodoStore();
  const { todos } = storeToRefs(todoStore);
  const { addTodo, deleteTodo, toggleTodo } = todoStore;
</script>

<template>
  <div class="test">
    <ul class="todo-items">
      <li v-for="todo in todos" :key="todo.id">
        <div class="todo-item">
          <label>
            <input type="checkbox" v-model="todo.completed" @click="toggleTodo(todo.id)" />
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          </label>
          <button class="delete-btn" @click="deleteTodo(todo.id)">🗑️</button>
        </div>
      </li>
    </ul>

    <p v-if="todos.length === 0">할 일을 추가해 보세요.</p>
  </div>
</template>
<style lang="scss" scoped>
  .todo-items {
    list-style: none;
    padding: 0;

    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background-color: white;
      border-radius: 4px;
      border: 1px solid #eee;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f1f1f1;
      }

      label {
        display: flex;
        align-items: center;
        flex-grow: 1;

        input[type='checkbox'] {
          margin-right: 0.5rem;
        }

        span {
          font-size: 1rem;
          transition: color 0.3s ease;

          &.completed {
            color: gray;
            text-decoration: line-through;
          }
        }
      }

      .delete-btn {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #ff6b6b;
        transition: color 0.3s ease;

        &:hover {
          color: #ff6b6b;
          opacity: 0.3;
        }
      }
    }
  }
</style>