import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'buy some milk', isFav: false },
      { id: 2, title: 'play some music', isFav: true },
      { id: 3, title: 'walk around', isFav: false }
    ]
  }),
  actions: {
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
