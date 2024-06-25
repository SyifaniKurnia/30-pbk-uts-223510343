<template>
  <div class="pb-2">
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row align-items-center">
          <input
            v-model="newTodoText"
            type="text"
            class="w-100 form-control-lg"
            id="exampleFormControlInput1"
            placeholder="Add new task..."
            style="margin-right: 5px"
          />
          <input
            v-model="newTodoDate"
            type="date"
            class="form-control-lg w-50"
            name="tgl"
            style="margin-right: 5px"
          />
          <div>
            <button @click="addTodo" type="button" class="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  addTodo: Function,
});

const newTodoText = ref("");
const newTodoDate = ref("");

const addTodo = () => {
  props.addTodo({
    text: newTodoText.value.trim(),
    completed: false,
    dueDate: newTodoDate.value !== "" ? newTodoDate.value : null,
    createdDate: new Date().toLocaleDateString(),
  });
  newTodoText.value = "";
  newTodoDate.value = "";
};
</script>

<style scoped>
.btn-primary {
  background-color: #135d66;
}
</style>
