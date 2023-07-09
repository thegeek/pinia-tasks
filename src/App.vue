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
    <!-- Loading -->
    <div class="loading" v-if="isLoading">Loading Tasks...</div>
    <!-- Task List -->
    <div class="task-list" v-else>
      <p>You have {{ taskList.count }} {{ taskList.type }} left to do</p>
      <div v-for="task in taskList.query" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- <button @click="taskStore.$reset">Reset</button> -->
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTaskStore } from './stores/TaskStore';
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();

taskStore.getTasks();

const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore);

const filter = ref('all');
const taskList = computed(() => {
  switch (filter.value) {
    case 'favs':
      return { query: favs.value, type: 'Fav Tasks', count: favCount };

    default:
      return { query: tasks.value, type: 'Tasks', count: totalCount };
  }
});
</script>
