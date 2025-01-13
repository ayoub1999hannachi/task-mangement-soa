<template>
    <div>
      <Header />
      <div class="task-details-container">
        <h2>{{ isEditing ? 'Edit Task' : 'Task Details' }}</h2>
        <div v-if="task">
          <!-- Display form if editing -->
          <div v-if="isEditing">
            <form @submit.prevent="updateTask">
              <div>
                <label for="name">Name:</label>
                <input type="text" v-model="task.name" id="name" required />
              </div>
              <div>
                <label for="description">Description:</label>
                <textarea v-model="task.description" id="description" required></textarea>
              </div>
              <div>
                <label for="priority">Priority:</label>
                <select v-model="task.priority" id="priority" required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label for="status">Status:</label>
                <select v-model="task.status" id="status" required>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label for="assignee">Assignee:</label>
                <input type="text" v-model="task.assignee" id="assignee" required />
              </div>
              <div>
                <label for="deadline">Deadline:</label>
                <input type="date" v-model="task.deadline" id="deadline" />
              </div>
              <div class="action-buttons">
                <button type="submit" class="edit-button">Save Changes</button>
                <button @click="cancelEdit" class="delete-button">Cancel</button>
              </div>
            </form>
          </div>
  
          <!-- Display task details if not editing -->
          <div v-else>
            <p><strong>Name:</strong> {{ task.name }}</p>
            <p><strong>Description:</strong> {{ task.description }}</p>
            <p><strong>Priority:</strong> {{ task.priority }}</p>
            <p><strong>Status:</strong> {{ task.status }}</p>
            <p><strong>Assignee:</strong> {{ task.assignee }}</p>
            <p><strong>Created At:</strong> {{ task.createdAtFormatted }}</p>
            <p><strong>Deadline:</strong> {{ task.deadlineFormattedDisplay }}</p>
  
            <div class="action-buttons">
              <button @click="editTask" class="edit-button">Edit</button>
              <button @click="deleteTask" class="delete-button">Delete</button>
            </div>
          </div>
        </div>
        <p v-else>Loading task details...</p>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";
  import axios from "axios";
  
  export default {
    name: "TaskDetails",
    components: { Header, Footer },
    data() {
      return {
        task: null,
        isEditing: false, // Track if in edit mode
      };
    },
    async created() {
      const { taskId } = this.$route.params;
      try {
        const response = await axios.get(`http://localhost:4003/api/tasks/task/${taskId}`);
        this.task = response.data;
        this.task.createdAtFormatted = new Date(this.task.createdAt).toLocaleDateString();
        this.task.deadlineFormattedDisplay = this.task.deadline
          ? new Date(this.task.deadline).toLocaleDateString()
          : "No Deadline Set";
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    },
    methods: {
      editTask() {
        this.isEditing = true; // Enable editing mode
      },
      cancelEdit() {
        this.isEditing = false; // Cancel editing and revert to details view
      },
      async updateTask() {
        try {
          const updatedTask = {
            name: this.task.name,
            description: this.task.description,
            priority: this.task.priority,
            status: this.task.status,
            assignee: this.task.assignee,
            deadline: this.task.deadline,
          };
          await axios.put(`http://localhost:4003/api/tasks/${this.task._id}`, updatedTask);
          alert("Task updated successfully!");
          this.isEditing = false; // Exit editing mode
          window.location.reload(); // Refresh the page to show updated task
        } catch (error) {
          console.error("Error updating task:", error);
          alert("Failed to update task. Please try again.");
        }
      },
      async deleteTask() {
  if (confirm("Are you sure you want to delete this task?")) {
    try {
      await axios.delete(`http://localhost:4003/api/tasks/${this.task._id}`);
      alert("Task deleted successfully!");
      window.location.reload(); // Reload the page to reflect the deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      window.location.reload();
      alert("Failed to delete the task. Please try again.");
    }
  }
},
    },
  };
  </script>
  
  <style scoped>
  .task-details-container {
    margin: 20px auto;
    max-width: 800px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .action-buttons {
    margin-top: 20px;
  }
  
  .edit-button,
  .delete-button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-button {
    background-color: #4caf50;
    color: white;
  }
  
  .edit-button:hover {
    background-color: #45a049;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
  }
  
  .delete-button:hover {
    background-color: #e53935;
  }
  
  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  form label {
    margin-bottom: 5px;
  }
  
  form input,
  form textarea,
  form select {
    padding: 8px;
    font-size: 16px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  </style>
  