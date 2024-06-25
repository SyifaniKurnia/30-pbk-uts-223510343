<template>
  <div class="container py-5 h-100 w-50">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div
          class="card"
          id="list1"
          style="border-radius: 0.75rem; background-color: #eff1f2"
        >
          <div class="card-body py-4 px-4 px-md-5">
            <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
              <i class="fas fa-check-square me-1"></i>
              <u>To Do List</u>
            </p>

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
                      <button
                        @click="addTodo"
                        type="button"
                        class="btn btn-primary"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="d-flex justify-content-end align-items-center pt-2 pb-3"
            >
              <p class="small mb-0 me-2 text-muted">Filter</p>
              <select class="form-select w-25" v-model="filterBy">
                <option value="1">All</option>
                <option value="2">Completed</option>
                <option value="3">Uncompleted</option>
                <option value="4">Has due date</option>
              </select>
            </div>

            <ul class="list-group list-group-flush bg-transparent">
              <li
                v-for="(todo, index) in filteredTodos"
                :key="index"
                class="list-group-item border-0 bg-transparent"
              >
                <div class="d-flex align-items-center justify-content-between">
                  <div class="form-check">
                    <input
                      class="form-check-input me-0"
                      type="checkbox"
                      v-model="todo.completed"
                      id="flexCheckChecked{{ index }}"
                      aria-label="..."
                    />
                  </div>
                  <div class="flex-grow-1 px-3">
                    <p
                      class="lead fw-normal mb-0"
                      :style="{
                        'text-decoration': todo.completed
                          ? 'line-through'
                          : 'none',
                      }"
                    >
                      {{ todo.text }}
                    </p>
                    <div class="text-muted small">
                      <i class="fas fa-clock"></i> Due Date: {{ todo.dueDate }}
                    </div>
                  </div>
                  <div class="text-end">
                    <a
                      href="#!"
                      class="text-info me-3"
                      @click="startEdit(index)"
                    >
                      <i class="fas fa-edit"></i>
                    </a>
                    <a href="#!" class="text-danger" @click="deleteTodo(index)">
                      <i class="fas fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
                <div v-if="index === editingIndex" class="edit-form">
                  <input
                    v-model="editedTodoText"
                    type="text"
                    class="form-control-lg w-50"
                    style="margin-right: 5px"
                  />
                  <div class="date-wrapper">
                    <input
                      v-model="editedTodoDate"
                      type="date"
                      class="form-control-lg"
                      name="tgl"
                      style="margin-right: 5px"
                    />
                  </div>
                  <div class="button-edit">
                    <button @click="saveEdit" class="btn btn-primary">
                      Save
                    </button>
                    <button @click="cancelEdit" class="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <p v-if="error" class="text-danger">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const newTodoText = ref("");
    const newTodoDate = ref("");
    const todos = ref([]);
    const filterBy = ref("1");
    const editingIndex = ref(-1);
    const editedTodoText = ref("");
    const editedTodoDate = ref("");
    const error = ref(null);

    const filteredTodos = computed(() => {
      if (filterBy.value === "1") return todos.value;
      else if (filterBy.value === "2")
        return todos.value.filter((todo) => todo.completed);
      else if (filterBy.value === "3")
        return todos.value.filter((todo) => !todo.completed);
      else if (filterBy.value === "4")
        return todos.value.filter((todo) => todo.dueDate !== null);
    });

    const addTodo = () => {
      if (newTodoText.value.trim() !== "") {
        const newTodo = {
          text: newTodoText.value.trim(),
          completed: false,
          dueDate: newTodoDate.value !== "" ? newTodoDate.value : null,
          createdDate: new Date().toLocaleDateString(),
        };
        todos.value.unshift(newTodo);
        newTodoText.value = "";
        newTodoDate.value = "";
      }
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const startEdit = (index) => {
      const todo = todos.value[index];
      editedTodoText.value = todo.text;
      editedTodoDate.value = todo.dueDate || "";
      editingIndex.value = index;
    };

    const cancelEdit = () => {
      editingIndex.value = -1;
    };

    const saveEdit = () => {
      if (editedTodoText.value.trim() !== "") {
        const editedTodo = {
          text: editedTodoText.value.trim(),
          completed: todos.value[editingIndex.value].completed,
          dueDate: editedTodoDate.value !== "" ? editedTodoDate.value : null,
          createdDate: todos.value[editingIndex.value].createdDate,
        };
        todos.value.splice(editingIndex.value, 1, editedTodo);
        editingIndex.value = -1;
      }
    };

    return {
      newTodoText,
      newTodoDate,
      todos,
      filterBy,
      editingIndex,
      editedTodoText,
      editedTodoDate,
      filteredTodos,
      addTodo,
      deleteTodo,
      startEdit,
      cancelEdit,
      saveEdit,
      error,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 7rem auto;
}
.h1 .fa-check-square,
.h1 u {
  color: #003c43;
  font-weight: bold;
}
.btn-primary {
  background-color: #135d66;
}
.button-edit {
  display: flex;
  justify-content: flex-end;
}
.edit-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date-wrapper {
  margin-top: 5px;
  margin-bottom: 5px;
}
.form-select {
  font-size: 0.9rem;
}
</style>
