<template>
  <li
    class="list-group-item d-flex justify-content-between flex-column"
    :style="{ width: 'calc(50% - 0px)' }"
  >
    <div class="card-box">
      <h5 class="fw-bold">Title : {{ post.title }}</h5>
      <p class="fw-bold">Posting by {{ getUserById(post.userId).name }}</p>
      <p class="text-muted mb-0">{{ post.body }}</p>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  post: Object,
  getUserById: Function,
});
</script>

<style scoped>
.card-box {
  padding: 1rem;
}
</style>
