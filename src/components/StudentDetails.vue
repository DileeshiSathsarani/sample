<!-- StudentDetails.vue -->
<template>
  <div>
    <h1>Student Details</h1>
    <DataTable :data="students" :columns="studentColumns" :hasActions="true" @edit-user="handleEditUser" @delete-user="handleDeleteUser">
      <template v-slot:actions="{ index }">
        <button class="edit-button" @click="openEditModal(index)">Edit</button>
        <button class="delete-button" @click="deleteStudent(index)">Delete</button>
      </template>
    </DataTable>
    <ModalForm v-if="isComponentModalActive" :student="formProps.student" :canCancel="true" @close="closeModal" @save-changes="saveChanges" />
    
    <router-link :to="{ name: 'SubjectDetails' }">
      <b-button type="is-info">Go to Subject Details</b-button>
    </router-link>
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

    editStudent(id) {
  const editedStudent = { ...this.students[id] };
  const newFirstName = prompt("Enter First Name:", editedStudent.first_name);
  const newLastName = prompt("Enter Last Name:", editedStudent.last_name);
  const newAddress = prompt("Enter Address:", editedStudent.address);
  const newEmail = prompt("Enter Email:", editedStudent.email);
  const newUserName = prompt("Enter User Name:", editedStudent.user_name);
  const newContactNumber = prompt("Enter Contact Number:", editedStudent.contact_number);
  const newPassword = prompt("Enter Password:", editedStudent.password);

  const updatedStudent = {
    first_name: newFirstName,
    last_name: newLastName,
    address: newAddress,
    email: newEmail,
    user_name: newUserName,
    contact_number: newContactNumber,
    password: newPassword,
  };

  if (this.editedStudentIndex !== null) {
    axios.put(`http://localhost:5029/api/Student/${this.students[id].id}`, updatedStudent)
      .then(response => {
        if (response.data.status_code === 200) {
          this.fetchStudents();
          console.log("Edited student:", updatedStudent);
        } else {
          console.error('Failed to edit student:', response.message);
        }
      })
      .catch(error => {
        console.error('Error editing student:', error);
      });
  } else {
    axios.post('http://localhost:5029/api/Student/save', updatedStudent)
      .then(response => {
        if (response.data.status_code === 200) {
          this.fetchStudents();
          console.log("Added student:", updatedStudent);
        } else {
          console.error('Failed to add student:', response.message);
        }
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  }

  this.closeModal();
}, 

  }
}
</script>
