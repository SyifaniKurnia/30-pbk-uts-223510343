<template>
  <div class="d-flex justify-content-end align-items-center pt-2 pb-3 me-lg-4">
    <p class="small mb-0 me-3 text-muted">Filter</p>
    <select
      class="form-select w-25"
      :value="selectedUser"
      @change="updateSelectedUser($event.target.value)"
    >
      <option :value="''">All User</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  users: Array,
  selectedUser: [Number, null],
});

const emits = defineEmits(["update:selectedUser"]);

const updateSelectedUser = (value) => {
  const userId = value !== "" ? Number(value) : null;
  emits("update:selectedUser", userId);
};
</script>
