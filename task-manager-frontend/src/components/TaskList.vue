<template>
  <div class="app-container">
    <!-- Header Component -->
    <Header />

    <div class="main-content">
      <div class="content-wrapper">
        <!-- Task Management Section -->
        <section class="task-management">
          <header class="section-header">
            <h1 class="section-title">Task Management</h1>
            <button class="primary-button" @click="openCreateTaskDialog">
              <i class="fas fa-plus"></i> Create Task
            </button>
          </header>

          <!-- Create Task Dialog -->
          <div v-if="showDialog" class="dialog">
            <div class="dialog-content">
              <h2>
                <i class="fas fa-tasks"></i>
                {{ editingTask ? 'Update Task' : 'Create Task' }}
              </h2>
              <form @submit.prevent="editingTask ? updateTask() : createTask()">
                <div class="form-group">
                  <label for="task-name">Task Name</label>
                  <input type="text" id="task-name" v-model="task.name" required />
                </div>

                <div class="form-group">
                  <label for="task-description">Description</label>
                  <textarea id="task-description" v-model="task.description"></textarea>
                </div>

                <div class="form-group">
                  <label for="task-priority">Priority</label>
                  <select id="task-priority" v-model="task.priority">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="task-status">Status</label>
                  <select id="task-status" v-model="task.status">
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    id="task-assignee"
                    v-model="task.assignee"
                    required
                    readonly
                    hidden
                  />
                </div>

                <div class="form-group">
                  <label for="task-deadline">Deadline</label>
                  <input type="date" id="task-deadline" v-model="task.deadlineFormatted" />
                </div>

                <div class="button-group">
                  <button type="submit" class="primary-button">
                    <i :class="editingTask ? 'fas fa-edit' : 'fas fa-check'"></i>
                    {{ editingTask ? 'Update' : 'Create' }}
                  </button>
                  <button
                    type="button"
                    class="secondary-button"
                    @click="closeCreateTaskDialog"
                  >
                    <i class="fas fa-times"></i> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Task List Table -->
          <div class="task-table-container">
            <table class="task-table" v-if="tasks.length">
              <thead>
                <tr>
                  <th><i class="fas fa-file-alt"></i> Name</th>
                  <th><i class="fas fa-align-left"></i> Description</th>
                  <th><i class="fas fa-exclamation"></i> Priority</th>
                  <th><i class="fas fa-tasks"></i> Status</th>
                  <th><i class="fas fa-calendar"></i> Created At</th>
                  <th><i class="fas fa-calendar-day"></i> Deadline</th>
                  <th><i class="fas fa-cogs"></i> Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks" :key="task._id">
                  <td>{{ task.name }}</td>
                  <td>{{ task.description }}</td>
                  <td>{{ task.priority }}</td>
                  <td>{{ task.status }}</td>
                  <td>{{ task.createdAtFormatted }}</td>
                  <td>{{ task.deadlineFormattedDisplay }}</td>
                  <td>
                    <button class="view-button" @click="viewTask(task._id)">
                      <i class="fas fa-eye"></i> View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else class="no-tasks">
              <i class="fas fa-info-circle"></i> No tasks found.
            </p>
          </div>
        </section>
      </div>
    </div>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import axios from "axios";

export default {
  name: 'TaskProfileView',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: {},
      tasks: [],
      task: {
        name: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        assignee: "",
        deadline: "",
        deadlineFormatted: "",
      },
      showDialog: false,
      editingTask: false,
    };
  },
  created() {
    this.fetchUserProfile();
    this.fetchTasks();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:4001/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    async fetchTasks() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:4003/api/tasks/assignee/${userId}`);
        this.tasks = response.data.map((task) => {
          task.createdAtFormatted = task.createdAt
            ? new Date(task.createdAt).toLocaleDateString()
            : "No Date Available";

          task.deadlineFormattedDisplay = task.deadline
            ? new Date(task.deadline).toLocaleDateString()
            : "No Deadline Set";

          task.deadlineFormatted = task.deadline
            ? new Date(task.deadline).toISOString().split("T")[0]
            : "";

          return { ...task };
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async createTask() {
      this.task.deadline = this.task.deadlineFormatted
        ? new Date(this.task.deadlineFormatted)
        : null;
      this.task.assignee = localStorage.getItem('userId');
      try {
        const response = await axios.post("http://localhost:4003/api/tasks", this.task);
        this.tasks.push(response.data);
        this.closeCreateTaskDialog();
        this.fetchTasks();
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },
    openCreateTaskDialog() {
      this.task = {
        name: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        assignee: localStorage.getItem('userId'),
        deadline: "",
        deadlineFormatted: "",
      };
      this.showDialog = true;
    },
    closeCreateTaskDialog() {
      this.showDialog = false;
      this.editingTask = false;
    },
    viewTask(taskId) {
      this.$router.push({ name: 'TaskDetails', params: { taskId } });
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8f9fa;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.profile-section {
  margin-bottom: 40px;
}

.profile-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-title {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.profile-subtitle {
  font-size: 1em;
  color: #6c757d;
}

.logout-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c82333;
}

.section-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
  color: #343a40;
}

.primary-button {
  display: block;
  margin: 20px auto;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #0056b3;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-table th, .task-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.task-table th {
  background-color: #f1f3f5;
  color: #495057;
  font-weight: bold;
}

.task-table tr:hover {
  background-color: #f8f9fa;
}

.view-button {
  padding: 5px 10px;
  background-color: #17a2b8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.view-button:hover {
  background-color: #138496;
}
</style>
