<template>
  <div class="q-pa-md text-black">
    <q-list v-if="posts.length">
      <div class="q-gutter-sm q-mb-md">
        <q-item
          v-for="(post, index) in posts"
          :key="index"
          clickable
          @click="handleClick(post)"
        >
          <q-card>
            <q-card-section>
              <q-item-label class="text-h6"
                >Title : {{ post.title }}</q-item-label
              >
              <q-item-label caption>
                <span>By : {{ getUserById(post.userId)?.name }}</span>
              </q-item-label>
              <q-item-label> {{ post.body }}</q-item-label>
            </q-card-section>
          </q-card>
        </q-item>
      </div>
    </q-list>
    <q-item v-else>
      <q-item-section>
        <q-item-label class="text-center"
          >Tidak ada postingan untuk pengguna yang dipilih.</q-item-label
        >
      </q-item-section>
    </q-item>
    <q-banner v-if="error" color="negative" text-color="white">
      {{ error }}
    </q-banner>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import PostItem from "./PostItem.vue";

const props = defineProps({
  posts: Array,
  getUserById: Function,
  error: String,
});

const handleClick = (post) => {
  console.log("Post clicked:", post);
};
</script>

<style scoped>
.q-card {
  border-radius: 0.75rem;
}
.q-item {
  border-radius: 0.75rem;
}
</style>
