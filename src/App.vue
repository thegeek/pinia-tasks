<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>
    <!-- New Task Form -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- filter -->
    <nav class="filter">
      <button :class="{ selected: filter === 'all' }" @click="filter = 'all'">All Tasks</button>
      <button :class="{ selected: filter === 'favs' }" @click="filter = 'favs'">Fav Tasks</button>
    </nav>
    <!-- Task List -->
    <div class="task-list">
      <p>You have {{ taskList.count }} {{ taskList.type }} left to do</p>
      <div v-for="task in taskList.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTaskStore } from './stores/TaskStore';
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';

const taskStore = useTaskStore();

const filter = ref('all');
const taskList = computed(() => {
  switch (filter.value) {
    case 'favs':
      return { tasks: taskStore.favs, type: 'Fav Tasks', count: taskStore.favCount };

    default:
      return { tasks: taskStore.tasks, type: 'Tasks', count: taskStore.totalCount };
  }
});
</script>
