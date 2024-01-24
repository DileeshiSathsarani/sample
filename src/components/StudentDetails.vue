<template>
  <div>
    <h1>Student Details</h1>

    <data-table :data="students" :columns="studentColumns" :hasActions="true">
      <template v-slot:actions="{ index }">
        <button class="edit-button" @click="openEditModal(index)">Edit</button>
        <button class="delete-button" @click="deleteStudent(index)">Delete</button>
      </template>
    </data-table>

    <!-- EditModal component for Editing -->
    <edit-modal
      :is-active="isEditModalActive"
      :edited-first-name="editedFirstName"
      :edited-last-name="editedLastName"
      :edited-address="editedAddress"
      :edited-email="editedEmail"
      :edited-contact-number="editedContactNumber"
      @save-changes="handleSaveChanges"
      @close-modal="closeEditModal"
    ></edit-modal>
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from '@/components/DataTable.vue';
import EditModal from '@/components/EditModal.vue';
import { eventBus } from '@/App';

export default {
  name: 'StudentDetails',
  components: {
    DataTable,
    EditModal,
  },
  data() {
    return {
      students: [],
      isEditModalActive: false,
      editedFirstName: '',
      editedLastName: '',
      editedAddress: '',
      editedEmail: '',
      editedContactNumber: '',
      editedStudentIndex: null,
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

    eventBus.$on('edit-item', ({ row, index }) => {
      this.openEditModal(row, index);
    });
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

    openEditModal(row, index) {
      this.editedStudentIndex = index;
      const editedStudent = row;
      this.editedFirstName = editedStudent.first_name;
      this.editedLastName = editedStudent.last_name;
      this.editedAddress = editedStudent.address;
      this.editedEmail = editedStudent.email;
      this.editedContactNumber = editedStudent.contact_number;
      this.isEditModalActive = true;
    },

    handleSaveChanges(updatedValues) {
      this.editedFirstName = updatedValues.editedFirstName;
      this.editedLastName = updatedValues.editedLastName;
      this.editedAddress = updatedValues.editedAddress;
      this.editedEmail = updatedValues.editedEmail;
      this.editedContactNumber = updatedValues.editedContactNumber;

      // Additional logic after saving changes
      // ...

      this.closeEditModal();
    },

    closeEditModal() {
      this.isEditModalActive = false;
      this.editedStudentIndex = null;
    },

    deleteStudent(index) {
      const deletedStudent = { ...this.students[index] };

      if (confirm(`Are you sure you want to delete ${deletedStudent.id}?`)) {
        this.students = this.students.filter((student, i) => i !== index);

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
  },
};
</script>
