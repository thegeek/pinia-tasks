import axios from 'axios';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    isLoading: false
  }),
  actions: {
    async getTasks() {
      this.isLoading = true;
      const res = await axios.get('http://localhost:3000/tasks');
      this.tasks = res.data;
      await new Promise((res) => setTimeout(res, 1000));
      this.isLoading = false;
    },
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(task_id) {
      this.tasks = this.tasks.filter(({ id }) => id !== task_id);
    },
    toggleFav(task_id) {
      const task = this.tasks.find(({ id }) => id === task_id);
      task.isFav = !task.isFav;
    }
  },
  getters: {
    favs() {
      //   return this.tasks.filter((el) => el.isFav);
      return this.tasks.filter(({ isFav }) => isFav);
    },
    favCount: (state) => {
      return state.tasks.reduce((prev, current) => {
        return current.isFav ? prev + 1 : prev;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    }
  }
});
