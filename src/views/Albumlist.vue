<template>
  <div class="container py-5 h-100 w-100">
    <p class="h1 text-center mt-2 mb-2 pb-2 text-primary"><u>Albums</u></p>
    <div v-if="error" class="text-danger">{{ error }}</div>
    <div
      class="d-flex justify-content-end align-items-center pt-2 pb-3 me-lg-4"
    >
      <p class="small mb-0 me-3 text-muted">Filter</p>
      <select class="form-select w-25" v-model="selectedUser">
        <option :value="null">All Users</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <ul class="list-group list-group-light" v-if="filteredAlbums.length">
      <div class="d-flex flex-wrap me-lg-4 ms-lg-4">
        <li
          class="list-group-item d-flex justify-content-between flex-column"
          :style="{ width: 'calc(50% - 0px)' }"
          v-for="(album, index) in filteredAlbums"
          :key="index"
          @click="fetchPhotos(album.id)"
        >
          <div class="card-box">
            <h5 class="fw-bold">Title: {{ album.title }}</h5>
            <router-link :to="`/albums/${album.userId}`">View More</router-link>
          </div>
        </li>
      </div>
    </ul>
    <p v-else>Tidak ada album untuk pengguna yang dipilih.</p>
    <PhotoList v-if="selectedAlbumId !== null" :albumId="selectedAlbumId" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import PhotoList from "../components/PhotoList.vue";

export default {
  components: {
    PhotoList,
  },
  setup() {
    const albums = ref([]);
    const users = ref([]);
    const selectedUser = ref(null);
    const error = ref(null);
    const selectedAlbumId = ref(null);

    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        albums.value = await response.json();
        error.value = null; // Reset error on success
      } catch (err) {
        error.value = "Gagal mengambil data album";
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        users.value = await response.json();
        error.value = null; // Reset error on success
      } catch (err) {
        error.value = "Gagal mengambil data pengguna";
      }
    };

    const fetchPhotos = (albumId) => {
      selectedAlbumId.value = albumId;
    };

    const filteredAlbums = computed(() => {
      if (selectedUser.value === null) {
        return albums.value;
      }
      return albums.value.filter(
        (album) => album.userId === selectedUser.value
      );
    });

    onMounted(() => {
      fetchAlbums();
      fetchUsers();
    });

    return {
      albums,
      users,
      selectedUser,
      filteredAlbums,
      error,
      selectedAlbumId,
      fetchPhotos,
    };
  },
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
.list-group-item {
  border-radius: 0.75rem;
}
.card-box {
  padding: 1rem;
}
</style>
