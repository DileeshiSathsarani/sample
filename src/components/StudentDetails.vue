<!-- StudentDetails.vue -->
<template>
  <div>
    <DataTable :data="students" :columns="studentColumns" :hasActions="true" @edit-user="(handleEditUser)=>{edituser(handleEditUser);}" @delete-user="handleDeleteUser">
    </DataTable>
    
    <b-modal has-modal-card v-model="isComponentModalActive">
      <template v-if="isComponentModalActive">
        <ModalForm
          :student="editedStudent"
          :canCancel="true"
          @close="closeModal"
          @save-changes="handleEditUser"
         
        />
      </template>
    </b-modal>
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
      isComponentModalActive: false,
      editedStudent: null,
    };
  },
      
  //     editedFirstName: '',
  //     editedLastName: '',
  //     editedAddress: '',
  //     editedEmail: '',
  //     editedContactNumber: '',
  //     editedStudentIndex: null,
  //     modalTitle: 'Edit Student',
  //     modalAction: 'Save Changes',
  //   };
  // },

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
    closeModal() {
      this.isComponentModalActive = false;
    },
    edituser(value) {
      console.log('XEdit user with ID:');
      this.editedStudent = value;
      this.isComponentModalActive = true;
    },

    handleEditUser(value){
    console.log(value);
    // console.log('Save Changes:', updatedStudent);
        const updatedStudent = {
          id: value.id,
          first_name: value.first_name,
          last_name: value.last_name,
          address: value.address,
          email: value.email,
          contact_number: value.contact_number,
        };

        console.log('Updating student:', updatedStudent);

    axios.put(`http://localhost:5029/api/Student/${value.id}`, updatedStudent)
      .then(response => {
        console.log('Server response:', response.data);
        if (response.data.status_code === 200) {
          console.log("Updated student:", updatedStudent);
          this.fetchStudents();
        } else {
          console.error('Failed to update student:', response.message);
        }
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  
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

  saveChanges() {
    
  if (this.editedStudent && this.editedStudent.id) {
    // console.log('Save Changes:', updatedStudent);
        const updatedStudent = {
          id: this.editedStudent.id,
          first_name: this.editedStudent.first_name || this.editedFirstName,
          last_name: this.editedStudent.last_name || this.editedLastName,
          address: this.editedStudent.address || this.editedAddress,
          email: this.editedStudent.email || this.editedEmail,
          contact_number: this.editedStudent.contact_number || this.editedContactNumber,
        };

        console.log('Updating student:', updatedStudent);

    axios.put(`http://localhost:5029/api/Student/${this.editedStudent.id}`, updatedStudent)
      .then(response => {
        console.log('Server response:', response.data);
        if (response.data.status_code === 200) {
          console.log("Updated student:", updatedStudent);
          this.fetchStudents();
        } else {
          console.error('Failed to update student:', response.message);
        }
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  } else {
   
    const newStudent = {
      first_name: this.editedFirstName,
      last_name: this.editedLastName,
      address: this.editedAddress,
      email: this.editedEmail,
      contact_number: this.editedContactNumber,
    };

    axios.post('http://localhost:5029/api/Student/save', newStudent)
      .then(response => {
        if (response.data.status_code === 200) {
          console.log("Added student:", newStudent);
          this.fetchStudents(); 
        } else {
          console.error('Failed to add student:', response.message);
        }
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  }

  this.closeModal();
}

//   saveChanges() {
//     const updatedStudent = {
//       first_name: this.editedFirstName,
//       last_name: this.editedLastName,
//       address: this.editedAddress,
//       email: this.editedEmail,
//       contact_number: this.editedContactNumber,
//     };

//   if (updatedStudent.id) {
//     this.$emit('save-changes', updatedStudent);
//   } else {
//     console.error('Updated student does not have an id.');
//   }
// },

//   EditUser(id) {
//     const editedStudent = { ...this.students[id] };
//     this.editedStudent = editedStudent;
//     this.isComponentModalActive = true;

//       const newFirstName = prompt("Enter First Name:", editedStudent.first_name);
//       const newLastName = prompt("Enter Last Name:", editedStudent.last_name);
//       const newAddress = prompt("Enter Address:", editedStudent.address);
//       const newEmail = prompt("Enter Email:", editedStudent.email);
//       const newUserName = prompt("Enter User Name:", editedStudent.user_name);
//       const newContactNumber = prompt("Enter Contact Number:", editedStudent.contact_number);
//       const newPassword = prompt("Enter Password:", editedStudent.password);

//   const updatedStudent = {
//     first_name: newFirstName,
//     last_name: newLastName,
//     address: newAddress,
//     email: newEmail,
//     user_name: newUserName,
//     contact_number: newContactNumber,
//     password: newPassword,
//   };

//   if (this.editedStudentIndex !== null) {
//     axios.put(`http://localhost:5029/api/Student/${this.students[id].id}`, updatedStudent)
//       .then(response => {
//         if (response.data.status_code === 200) {
//           this.fetchStudents();
//           console.log("Edited student:", updatedStudent);
//         } else {
//           console.error('Failed to edit student:', response.message);
//         }
//       })
//       .catch(error => {
//         console.error('Error editing student:', error);
//       });
//   } else {
//     axios.post('http://localhost:5029/api/Student/save', updatedStudent)
//       .then(response => {
//         if (response.data.status_code === 200) {
//           this.fetchStudents();
//           console.log("Added student:", updatedStudent);
//         } else {
//           console.error('Failed to add student:', response.message);
//         }
//       })
//       .catch(error => {
//         console.error('Error adding student:', error);
//       });
//   }

//   this.closeModal();
// }, 

  }
}
</script>
