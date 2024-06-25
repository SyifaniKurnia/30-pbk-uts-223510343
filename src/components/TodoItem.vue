<template>
  <li class="list-group-item border-0 bg-transparent">
    <div class="d-flex align-items-center justify-content-between">
      <div class="form-check">
        <input
          class="form-check-input me-0"
          type="checkbox"
          v-model="todo.completed"
          @change="toggleComplete"
          aria-label="..."
        />
      </div>
      <div class="flex-grow-1 px-3">
        <p
          class="lead fw-normal mb-0"
          :style="{
            'text-decoration': todo.completed ? 'line-through' : 'none',
          }"
        >
          {{ todo.text }}
        </p>
        <div class="text-muted small">
          <i class="fas fa-clock"></i> Due Date: {{ todo.dueDate }}
        </div>
      </div>
      <div class="text-end">
        <a href="#!" class="text-info me-3" @click="startEdit">
          <i class="fas fa-edit"></i>
        </a>
        <a href="#!" class="text-danger" @click="deleteTodo">
          <i class="fas fa-trash-alt"></i>
        </a>
      </div>
    </div>
    <div v-if="isEditing" class="edit-form d-flex align-items-center mt-2">
      <input
        v-model="editedTodoText"
        type="text"
        class="form-control-lg flex-grow-1 me-2"
        style="margin-right: 5px"
      />
      <input
        v-model="editedTodoDate"
        type="date"
        class="form-control-lg me-2"
        name="tgl"
        style="margin-right: 5px"
      />
      <button @click="saveEdit" class="btn btn-primary me-2">Save</button>
      <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  todo: Object,
  index: Number,
  deleteTodo: Function,
  saveEdit: Function,
  toggleComplete: Function,
});

const isEditing = ref(false);
const editedTodoText = ref(props.todo.text);
const editedTodoDate = ref(props.todo.dueDate);

const startEdit = () => {
  isEditing.value = true;
  editedTodoText.value = props.todo.text;
  editedTodoDate.value = props.todo.dueDate || "";
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = () => {
  if (editedTodoText.value.trim() !== "") {
    props.saveEdit(props.index, {
      text: editedTodoText.value.trim(),
      completed: props.todo.completed,
      dueDate: editedTodoDate.value !== "" ? editedTodoDate.value : null,
      createdDate: props.todo.createdDate,
    });
    isEditing.value = false;
  }
};

const toggleComplete = () => {
  props.todo.completed = !props.todo.completed;
  props.toggleComplete(props.index);
};
</script>

<style scoped>
.edit-form input {
  flex: 1 1 auto;
  margin-right: 5px;
}
.edit-form button {
  margin-right: 5px;
}
.btn-primary {
  background-color: #135d66;
}
</style>
