import { createRouter, createWebHistory } from "vue-router";
import Todolist from "../views/Todolist.vue";
import Postlist from "../views/Postlist.vue";
import Albumlist from "../views/Albumlist.vue";
import PhotoList from "../components/PhotoList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todo",
      component: Todolist,
    },
    {
      path: "/post",
      name: "post",
      component: Postlist,
    },
    {
      path: "/album",
      name: "album",
      component: Albumlist,
    },
    {
      path: "/albums/:userId",
      name: "Album",
      component: PhotoList,
      props: true,
    },
  ],
});

export default router;
