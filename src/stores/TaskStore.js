import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'buy some milk', isFav: false },
      { id: 2, title: 'play some music', isFav: true },
      { id: 3, title: 'walk around', isFav: false }
    ]
  })
});
