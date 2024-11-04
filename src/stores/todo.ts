import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 스토어 정의
export const useTodoStore = defineStore('todo', () => {
  // 로컬스토리지에서 할 일 목록 불러오기
  const loadTodos = (): Todo[] => {
    const storedTodos = localStorage.getItem('todos');
    console.log(storedTodos);
    
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  // 할 일 목록 상태
  const todos = ref<Todo[]>(loadTodos());

  // 할 일 목록을 로컬스토리지에 저장
  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  };

  // 새로운 할 일 추가
  const addTodo = (text: string) => {
    todos.value.push({ id: Date.now(), text, completed: false });
    saveTodos();
  };

  // 할 일 삭제
  const deleteTodo = (id: number) => {
    console.log('todos의 value : ',todos.value);
    todos.value = todos.value.filter(todo => todo.id !== id);
    saveTodos();
  };

  // 할 일 완료 상태 토글
  const toggleTodo = (id: number) => {
    const todo = todos.value.find(todo => todo.id === id);
    console.log(todo);
    
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
    }
  };

  // 완료된 할 일 목록
  const completedTodos = computed(() => todos.value.filter(todo => todo.completed));

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    completedTodos,
  };
});