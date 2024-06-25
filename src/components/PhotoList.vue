<template>
  <div class="container py-5 h-100 w-100">
    <p class="h1 text-center mt-2 mb-2 pb-2 text-primary"><u>Albums</u></p>
    <div v-if="error" class="text-danger">{{ error }}</div>
    <div v-if="photos.length" class="d-flex flex-wrap">
      <div
        class="card-box"
        v-for="photo in photos"
        :key="photo.id"
        :style="{ width: 'calc(25% - 10px)', margin: '5px' }"
      >
        <img
          :src="photo.thumbnailUrl"
          alt="Photo thumbnail"
          class="img-thumbnail"
          @click="showPhoto(photo.url)"
        />
        <p class="fw-bold">{{ photo.title }}</p>
      </div>
    </div>
    <p v-else>Tidak ada foto untuk album ini.</p>
    <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide" />
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  components: {
    VueEasyLightbox,
  },
  props: {
    albumId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const photos = ref([]);
    const error = ref(null);
    const visible = ref(false);
    const imgs = ref([]);

    const fetchPhotos = async (albumId) => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        photos.value = await response.json();
        error.value = null; // Reset error on success
      } catch (err) {
        error.value = `Failed to fetch photos: ${err.message}`;
        console.error(err);
      }
    };

    const showPhoto = (url) => {
      imgs.value = [url];
      visible.value = true;
    };

    const handleHide = () => {
      visible.value = false;
    };

    watch(
      () => route.params.userId,
      (newAlbumId) => {
        if (newAlbumId !== null) {
          fetchPhotos(newAlbumId);
        }
      },
      { immediate: true }
    );

    return {
      photos,
      error,
      visible,
      imgs,
      showPhoto,
      handleHide,
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
.card-box {
  padding: 1rem;
  color: #003c43;
}
.img-thumbnail {
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  cursor: pointer;
}
</style>
