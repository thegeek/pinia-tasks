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
    async addTask(task) {
      this.tasks.push(task);
      try {
        const res = await axios.post('http://localhost:3000/tasks', JSON.stringify(task), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        console.error(err);
      }
    },
    async deleteTask(task_id) {
      this.tasks = this.tasks.filter(({ id }) => id !== task_id);
      const task = this.tasks.find(({ id }) => id === task_id);
      try {
        const res = await axios.delete(`http://localhost:3000/tasks/${task_id}`);
      } catch (err) {
        console.error(err);
      }
    },
    async toggleFav(task_id) {
      const task = this.tasks.find(({ id }) => id === task_id);
      task.isFav = !task.isFav;
      try {
        const res = await axios.patch(
          `http://localhost:3000/tasks/${task_id}`,
          JSON.stringify({ isFav: task.isFav }),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } catch (err) {
        console.error(err);
      }
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
