<template>
  <div class="container py-5 h-100 w-100">
    <p class="h1 text-center mt-2 mb-2 pb-2 text-primary"><u>Postingan</u></p>
    <PostFilter :users="users" v-model:selectedUser="selectedUser" />
    <PostCheck
      :posts="filteredPosts"
      :getUserById="getUserById"
      :error="error"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import PostFilter from "../components/PostFilter.vue";
import PostCheck from "../components/PostCheck.vue";

const users = ref([]);
const selectedUser = ref(null);
const posts = ref([]);
const error = ref(null);

const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    users.value = await response.json();
    error.value = null; // Reset error on success
  } catch (err) {
    error.value = "Failed to fetch users";
  }
};

const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts.value = await response.json();
    error.value = null; // Reset error on success
  } catch (err) {
    error.value = "Failed to fetch posts";
  }
};

const filteredPosts = computed(() => {
  if (selectedUser.value === null) {
    return posts.value;
  }
  return posts.value.filter((post) => post.userId === selectedUser.value);
});

onMounted(() => {
  fetchUsers();
  fetchPosts();
});

const getUserById = (userId) => {
  return (
    users.value.find((user) => user.id === userId) || {
      name: "User not found!",
    }
  );
};
</script>

<style scoped>
.h1 u {
  color: #003c43;
  font-weight: bold;
  margin: 2rem auto;
}
.container {
  margin: 9rem auto;
  background-color: #eff1f2;
  border-radius: 0.75rem;
}
</style>
