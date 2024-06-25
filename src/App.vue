<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";
import { createRouter, createWebHistory } from "vue-router";
import Todolist from "./views/Todolist.vue";
import Postlist from "./views/Postlist.vue";
import Albumlist from "./views/Albumlist.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Todolist },
    { path: "/post", component: Postlist },
    { path: "/album", component: Albumlist },
  ],
});

defineComponent({
  components: {
    Navbar,
  },
  router,
});
</script>
