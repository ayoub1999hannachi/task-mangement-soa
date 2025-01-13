<template>
  <div>
    <h1>Project Management</h1>
    <button @click="openCreateProjectDialog">Create Project</button>

    <!-- Create/Update Project Dialog -->
    <div v-if="showProjectDialog" class="dialog">
      <div class="dialog-content">
        <h2>{{ editingProject ? "Update Project" : "Create Project" }}</h2>
        <form @submit.prevent="editingProject ? updateProject() : createProject()">
          <label for="project-name">Project Name:</label>
          <input type="text" id="project-name" v-model="project.name" required />

          <label for="project-description">Description:</label>
          <textarea id="project-description" v-model="project.description"></textarea>

          <label for="project-members">Members (User IDs):</label>
          <input
            type="text"
            id="project-members"
            v-model="project.members"
            placeholder="Comma-separated User IDs"
          />

          <label for="project-start-date">Start Date:</label>
          <input type="date" id="project-start-date" v-model="project.startDateFormatted" />

          <label for="project-end-date">End Date:</label>
          <input type="date" id="project-end-date" v-model="project.endDateFormatted" />

          <button type="submit">{{ editingProject ? "Update" : "Create" }}</button>
          <button @click="closeProjectDialog">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Project List -->
    <div v-if="projects.length">
      <ul>
        <li v-for="project in projects" :key="project._id">
          <div>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <p>
              <strong>Members:</strong>
              {{ project.members.join(", ") }}
            </p>
            <p><strong>Start Date:</strong> {{ project.startDateFormatted }}</p>
            <p><strong>End Date:</strong> {{ project.endDateFormatted }}</p>
            <button @click="openUpdateProjectDialog(project)">Edit</button>
            <button @click="deleteProject(project._id)">Delete</button>
            <button @click="fetchTasks(project._id)">View Tasks</button>
          </div>

          <!-- Task List -->
          <div v-if="selectedProjectId === project._id && tasks.length">
            <h4>Tasks for {{ project.name }}</h4>
            <ul>
              <li v-for="task in tasks" :key="task._id">
                <h5>{{ task.name }}</h5>
                <p>{{ task.description }}</p>
                <p><strong>Priority:</strong> {{ task.priority }}</p>
                <p><strong>Status:</strong> {{ task.status }}</p>
                <button @click="openCreateTaskDialog(project._id)">Add Task</button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>No projects found</div>

    <!-- Create Task Dialog -->
    <div v-if="showTaskDialog" class="dialog">
      <div class="dialog-content">
        <h2>Create Task</h2>
        <form @submit.prevent="createTask()">
          <label for="task-name">Task Name:</label>
          <input type="text" id="task-name" v-model="task.name" required />

          <label for="task-description">Description:</label>
          <textarea id="task-description" v-model="task.description"></textarea>

          <label for="task-priority">Priority:</label>
          <input type="text" id="task-priority" v-model="task.priority" />

          <label for="task-status">Status:</label>
          <input type="text" id="task-status" v-model="task.status" />

          <label for="task-assignee">Assignee (User ID):</label>
          <input type="text" id="task-assignee" v-model="task.assignee" />

          <label for="task-deadline">Deadline:</label>
          <input type="date" id="task-deadline" v-model="task.deadline" />

          <button type="submit">Create Task</button>
          <button @click="closeTaskDialog">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projects: [],
      tasks: [],
      project: {
        name: "",
        description: "",
        members: "",
        startDate: "",
        endDate: "",
        startDateFormatted: "",
        endDateFormatted: "",
      },
      task: {
        name: "",
        description: "",
        priority: "",
        status: "",
        assignee: "",
        deadline: "",
      },
      selectedProjectId: null,
      showProjectDialog: false,
      showTaskDialog: false,
      editingProject: false,
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get("http://localhost:4002/api/projects");
        this.projects = response.data.map((project) => ({
          ...project,
          startDateFormatted: project.startDate
            ? new Date(project.startDate).toLocaleDateString()
            : "No Start Date",
          endDateFormatted: project.endDate
            ? new Date(project.endDate).toLocaleDateString()
            : "No End Date",
        }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    async createProject() {
      try {
        const project = {
          ...this.project,
          members: this.project.members.split(",").map((id) => id.trim()),
          startDate: this.project.startDateFormatted
            ? new Date(this.project.startDateFormatted)
            : null,
          endDate: this.project.endDateFormatted
            ? new Date(this.project.endDateFormatted)
            : null,
        };
        const response = await axios.post("http://localhost:4002/api/projects", project);
        this.projects.push(response.data);
        this.closeProjectDialog();
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
    async updateProject() {
      try {
        const project = {
          ...this.project,
          members: this.project.members.split(",").map((id) => id.trim()),
          startDate: this.project.startDateFormatted
            ? new Date(this.project.startDateFormatted)
            : null,
          endDate: this.project.endDateFormatted
            ? new Date(this.project.endDateFormatted)
            : null,
        };
        const response = await axios.put(
          `http://localhost:4002/api/projects/${this.project._id}`,
          project
        );
        const index = this.projects.findIndex((p) => p._id === this.project._id);
        this.projects.splice(index, 1, response.data);
        this.closeProjectDialog();
      } catch (error) {
        console.error("Error updating project:", error);
      }
    },
    async deleteProject(id) {
      try {
        await axios.delete(`http://localhost:4002/api/projects/${id}`);
        this.projects = this.projects.filter((project) => project._id !== id);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    },
    async fetchTasks(projectId) {
      try {
        const response = await axios.get(
          `http://localhost:4002/api/projects/${projectId}/tasks`
        );
        this.selectedProjectId = projectId;
        this.tasks = response.data;  // Ensure tasks are assigned to this.selectedProjectId
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async createTask() {
      try {
        const task = {
          ...this.task,
          deadline: this.task.deadline ? new Date(this.task.deadline) : null,
        };
        const response = await axios.post(
          `http://localhost:4002/api/projects/${this.selectedProjectId}/tasks`,
          task
        );
        this.tasks.push(response.data);  // Add task to the task list
        this.closeTaskDialog();
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },
    openCreateProjectDialog() {
      this.showProjectDialog = true;
      this.editingProject = false;
      this.project = {
        name: "",
        description: "",
        members: "",
        startDate: "",
        endDate: "",
        startDateFormatted: "",
        endDateFormatted: "",
      };
    },
    openUpdateProjectDialog(project) {
      this.showProjectDialog = true;
      this.editingProject = true;
      this.project = {
        ...project,
        members: project.members.join(", "),
        startDateFormatted: project.startDateFormatted,
        endDateFormatted: project.endDateFormatted,
      };
    },
    openCreateTaskDialog(projectId) {
      this.selectedProjectId = projectId;
      this.showTaskDialog = true;
      this.task = {
        name: "",
        description: "",
        priority: "",
        status: "",
        assignee: "",
        deadline: "",
      };
    },
    closeProjectDialog() {
      this.showProjectDialog = false;
    },
    closeTaskDialog() {
      this.showTaskDialog = false;
    },
  },
};
</script>

<style>
.dialog {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
}
.dialog-content {
  max-width: 500px;
}
</style>
