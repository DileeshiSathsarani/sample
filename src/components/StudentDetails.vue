<template>
  <div>
    <h1>Student Details</h1>
    <template v-if="students.length > 0"> 
      <DataTable :data="paginatedStudents" :columns="studentColumns" :hasActions="true" @edit-user="handleEditUser" @delete-user="handleDeleteUser">
        <template v-slot:actions="{ index }">
          <button class="edit-button" @click="openEditModal(index)">Edit</button>
          <button class="delete-button" @click="deleteStudent(index)">Delete</button>
          
        </template>
      </DataTable>
      
    </template>
    <ModalForm v-if="isComponentModalActive" :student="formProps.student" :canCancel="true" @close="closeModal" @save-changes="saveChanges" />
    
    <!-- <router-link :to="{ name: 'SubjectDetails' }">
      <b-button type="is-info">Go to Subject Details</b-button>
    </router-link> -->
    <button @click="logout" class="logout-button">Logout</button>
    <!-- Pagination Section -->
    <div class="mt-3" v-if="students.length > 0"> 
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="10"
        aria-controls="my-table"
        
      ></b-pagination>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from '@/components/DataTable.vue';
import ModalForm from '@/components/EditModal.vue';

export default {
  name: 'StudentDetails',
  components: {
    DataTable,
    ModalForm
  },
  data() {
    return {
      students: [],
      formProps: {
        student: {
          first_name: '',
          last_name: '',
          address: '',
          email: '',
          contact_number: '',
        },
      },
      isComponentModalActive: false,
      currentPage: 1,
      pageSize: 5,
      editedFirstName: '',
      editedLastName: '',
      editedAddress: '',
      editedEmail: '',
      editedContactNumber: '',
      editedStudentIndex: null,
      modalTitle: 'Edit Student',
      modalAction: 'Save Changes',
    };
  },
  computed: {
    studentColumns() {
      return [
        { field: 'first_name', label: 'First Name' },
        { field: 'last_name', label: 'Last Name' },
        { field: 'address', label: 'Address' },
        { field: 'email', label: 'Email' },
        { field: 'contact_number', label: 'Contact Number' },
        { field: 'actions', label: 'Actions', slot: 'actions' },
      ];
    },
    totalRows() {
      return this.students.length;
    },
    paginatedStudents() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.students.slice(startIndex, endIndex);
    },
  },
  created() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:5029/api/Student/id');
        this.students = response.data.data.student;
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    handleEditUser(index) {
      this.isComponentModalActive = true;
      this.formProps.student = { ...index };
    },
    closeModal() {
      this.isComponentModalActive = false;
    },
    handleDeleteUser(id) {
      const deletedStudent = { ...this.students[id] };
      if (confirm(`Are you sure you want to delete ${deletedStudent.id}?`)) {
        this.students = this.students.filter((student, i) => i !== id);
        axios.delete(`http://localhost:5029/api/Student/${deletedStudent.id}`)
          .then(response => {
            if (response.data.id === 200) {
              console.log("Deleted student:", deletedStudent);
            } else {
              console.error('Failed to delete student:', response.message);
            }
          })
          .catch(error => {
            this.students.push(deletedStudent);
            console.error('Error deleting student:', error);
          });
      }
    },
    deleteStudent(index) {
      console.log(index);
    },
    saveChanges(updatedStudent) {
      this.formProps.student = { ...this.formProps.student, ...updatedStudent };
      this.isComponentModalActive = false;
    },

    logout() {
      
      localStorage.removeItem('token');
      this.$router.push('/login');
      
    },
  }
}
</script>
