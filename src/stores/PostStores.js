// PostStore.js

import { defineStore } from "pinia";

export const usePostStore = defineStore({
  id: "postStore",
  state: () => ({
    users: [],
    selectedUser: null,
    posts: [],
    error: null,
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = await response.json();
        this.error = null;
      } catch (err) {
        this.error = "Gagal mengambil data pengguna";
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.posts = await response.json();
        this.error = null;
      } catch (err) {
        this.error = "Gagal mengambil data postingan";
      }
    },
    getUserById(userId) {
      return (
        this.users.find((user) => user.id === userId) || {
          name: "Pengguna tidak ditemukan!",
        }
      );
    },
    set selectedUser(userId) {
      this.selectedUser = userId;
    },
  },
  getters: {
    filteredPosts() {
      if (this.selectedUser === null) {
        return this.posts;
      }
      return this.posts.filter((post) => post.userId === this.selectedUser);
    },
  },
});
