<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">오늘의 할일</RouterLink>
        <RouterLink to="/weathers">오늘의 날씨</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

  nav {
    width: 100%;
    font-size: 14px;
    text-align: center;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  nav a.router-link-exact-active {
    color:#111;
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 1rem;
    border: 1px solid;
    color: #666;
  }

  @media (min-width: 1024px) {

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
