<template>
  <div class="container">
    <div class="header">
      <h1>Student Directory</h1>

      <div class="controls">
        <search-bar :groups="groups" @search="onSearch" />

        <select v-model="query.ageFilter" class="age-filter">
          <option value="">All ages</option>
          <option value="under18">Under 18</option>
          <option value="18plus">18 and older</option>
        </select>

        <div class="button-group">
          <button class="btn btn-primary" @click="openAdd">Add a student</button>
          <button class="btn btn-theme" @click="$emit('toggle-theme')">
            {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="grid">
      <student-card
        v-for="s in filtered"
        :key="s.id"
        :student="s"
        @edit="openEdit"
        @delete="confirmDelete"
      />
    </div>

    <modal v-if="showForm" @close="closeForm">
      <h3>{{ formMode === 'add' ? 'Add a student' : 'Edit the student' }}</h3>
      <student-form
        :initial="currentStudent"
        :submitLabel="formMode === 'add' ? 'Add' : 'Update'"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </modal>

    <modal v-if="showDelete" @close="closeDelete">
      <h3>Confirm the deletion</h3>
      <p>Do you really want to delete <strong>{{ currentStudent.name }}</strong>?</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" @click="closeDelete">Cancel</button>
        <button class="btn btn-danger" @click="handleDelete">Delete</button>
      </div>
    </modal>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import StudentCard from './StudentCard.vue'
import StudentForm from './StudentForm.vue'
import Modal from './Modal.vue'
import * as api from '../services/api.js'

export default {
  props: ['theme'],
  components: { SearchBar, StudentCard, StudentForm, Modal },
  data() {
    return {
      students: [],
      loading: false,
      error: null,
      query: { q: '', group: '', ageFilter: '' },
      showForm: false,
      formMode: 'add',
      currentStudent: null,
      showDelete: false,
      groups: ['3f1', '3f2', '3f3', '3f4']
    }
  },
  computed: {
    filtered() {
      let list = [...this.students]
      if (this.query.q) {
        const q = this.query.q.toLowerCase()
        list = list.filter(s => s.name.toLowerCase().includes(q))
      }
      if (this.query.group) {
        list = list.filter(s => s.group === this.query.group)
      }
      if (this.query.ageFilter === 'under18') {
        list = list.filter(s => s.age < 18)
      } else if (this.query.ageFilter === '18plus') {
        list = list.filter(s => s.age >= 18)
      }
      return list
    }
  },
  created() {
    this.fetchStudents()
  },
  methods: {
    async fetchStudents() {
      this.loading = true
      this.error = null
      try {
        this.students = await api.getStudents()
      } catch (e) {
        this.error = 'Error when uploading students'
      } finally {
        this.loading = false
      }
    },
    onSearch(payload) {
      this.query.q = payload.q
      this.query.group = payload.group
    },
    openAdd() {
      this.formMode = 'add'
      this.currentStudent = { name: '', age: null, group: '', email: '', avatar: '' }
      this.showForm = true
    },
    openEdit(student) {
      this.formMode = 'edit'
      this.currentStudent = { ...student }
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
    },
    async handleSubmit(payload) {
      this.loading = true
      try {
        if (this.formMode === 'add') {
          const exists = this.students.some(
            s =>
              s.name.toLowerCase() === payload.name.toLowerCase() &&
              s.email.toLowerCase() === payload.email.toLowerCase()
          )
          if (exists) {
            alert('This student already exists!')
          } else {
            const created = await api.createStudent(payload)
            this.students.unshift(created)
            alert('The student added')
          }
        } else {
          const updated = await api.updateStudent(this.currentStudent.id, payload)
          const idx = this.students.findIndex(s => s.id === updated.id)
          if (idx !== -1) this.students.splice(idx, 1, updated)
          alert('The data has been updated')
        }
        this.closeForm()
      } catch (e) {
        alert('Error when saving')
      } finally {
        this.loading = false
      }
    },
    confirmDelete(student) {
      this.currentStudent = student
      this.showDelete = true
    },
    closeDelete() {
      this.showDelete = false
    },
    async handleDelete() {
      this.loading = true
      try {
        await api.deleteStudent(this.currentStudent.id)
        this.students = this.students.filter(s => s.id !== this.currentStudent.id)
        alert('Student deleted')
      } catch (e) {
        alert('Error when deleting')
      } finally {
        this.loading = false
        this.closeDelete()
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
}

.header {
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.age-filter {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
}

.age-filter:hover {
  border-color: #ff85b3;
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #ffffff;
  color: black;
}

.btn-primary:hover {
  background-color: #f6a9c3;
}

.btn-theme {
  background-color: #ffffff;
}

.btn-theme:hover {
  background-color: #f19cb3;
}

.btn-danger {
  background-color: #ff5c8d;
  color: white;
}

.btn-danger:hover {
  background-color: #e84c7a;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.error {
  color: red;
}
</style>
