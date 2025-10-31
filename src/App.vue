<template>
  <div :class="['app', theme]">
    <main class="content">
      <StudentList :theme="theme" @toggle-theme="toggleTheme" />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import StudentList from './components/StudentList.vue'

export default {
  components: { StudentList },
  setup() {
    const theme = ref(localStorage.getItem('theme') || 'light')

    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', theme.value)
      document.documentElement.setAttribute('data-theme', theme.value)
    }

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value)
    })

    return { theme, toggleTheme }
  },
}
</script>

<style>
.app {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.app.light {
  background-color: #facadd; 
  color: #2c2c2c;
}

.app.dark {
  background-color: #1a1a1a;
  color: #f5f5f5;
}

.content {
  padding: 2rem;
}
</style>
