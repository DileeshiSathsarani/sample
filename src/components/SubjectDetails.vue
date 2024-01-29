<template>
  <div>
    <h1>Subject Details</h1>

    <!-- Buefy Modal for Adding -->
    <b-modal :active.sync="isModalActive" :title="modalTitle">
      <div class="modal-style">
        <div>
          <label for="subjectCode">Subject Code</label>
          <b-input v-model="modalSubjectCode"></b-input>

          <label for="subjectName">Subject Name</label>
          <b-input v-model="modalSubjectName"></b-input>
        </div>

        <div class="buttons">
          <b-button @click="saveSubjectChanges">{{ modalAction }}</b-button>
          <b-button @click="closeModal">Cancel</b-button>
        </div>
      </div>
    </b-modal>

    <!-- Subject Edit Modal -->
    <subject-edit-modal
      v-if="isModalActive"
      :editedSubject.sync="editedSubject"
      :modal-title="modalTitle"
      @close="closeModal"
      @save-changes="saveSubjectChanges"
    ></subject-edit-modal>

    <!-- Subjects Table -->
    <data-table :data="subjects" :columns="subjectColumns" :hasActions="true" @delete-user="handleDeleteUser">
      <template v-slot:actions="{ index }">
        <button class="edit-button" @click="openEditModal(index)">Edit</button>
        <button class="delete-button" @click="deleteStudent(index)">Delete</button>
      </template>
    </data-table>

    <!-- Add Button -->
    <div class="add-button-container">
      <b-button type="is-info" @click="openAddModal">Add Subject</b-button>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import SubjectEditModal from '@/components/SubjectEditModal.vue';
import axios from 'axios';

export default {
  name: 'SubjectDetails',
  components: {
    DataTable,
    SubjectEditModal
  },
  data() {
    return {
      subjects: [],
      isModalActive: false,
      modalTitle: '',
      modalAction: '',
      modalSubjectCode: '',
      modalSubjectName: '',
      editedSubjectIndex: null,
      editedSubject: null,
    };
  },
  computed: {
    subjectColumns() {
      return [
        { field: 'subject_code', label: 'Subject Code' },
        { field: 'subject_name', label: 'Subject Name' },
        { field:'actions' , label:'Actions'},
      ];
    },
  },
  created() {
    this.fetchSubjects();
  },
  methods: {
    fetchSubjects() {
      axios.get('http://localhost:5029/api/Subject/list')
        .then(response => {
          this.subjects = response.data.data.subject;
        })
        .catch(error => {
          console.error('Error fetching subjects:', error);
        });
    },

    openAddModal() {
      this.isModalActive = true;
      this.modalTitle = 'Add Subject';
      this.modalAction = 'Add Subject';
      this.modalSubjectCode = '';
      this.modalSubjectName = '';
    },

    openEditModal(index) {
      this.isModalActive = true;
      this.modalTitle = 'Edit Subject';
      this.modalAction = 'Save Changes';
      this.editedSubjectIndex = index;
      this.modalSubjectCode = this.subjects[index].subject_code;
      this.modalSubjectName = this.subjects[index].subject_name;
      this.editedSubject = { ...this.subjects[index] };
    },

    saveSubjectChanges() {
      const updatedSubject = {
        subject_code: this.modalSubjectCode,
        subject_name: this.modalSubjectName,
      };

      if (this.editedSubjectIndex !== null) { 
        axios.put(`http://localhost:5029/api/Subject/${this.subjects[this.editedSubjectIndex].subject_code}`, updatedSubject)
          .then(response => {
            if (response.data.status_code === 200) {
              this.fetchSubjects();
              console.log("Edited subject:", updatedSubject);
            } else {
              console.error('Failed to edit subject:', response.message);
            }
          })
          .catch(error => {
            console.error('Error editing subject:', error);
          });
      } else {
        axios.post('http://localhost:5029/api/Subject/save', updatedSubject)
          .then(response => {
            if (response.data.status_code === 200) {
              this.fetchSubjects();
              console.log("Added subject:", updatedSubject);
            } else {
              console.error('Failed to add subject:', response.message);
            }
          })
          .catch(error => {
            console.error('Error adding subject:', error);
          });
      }

      this.closeModal();
    },

    closeModal() {
      this.isModalActive = false;
      this.editedSubjectIndex = null;
    },

    handleDeleteUser(index) {
      const deletedSubject = { ...this.subjects[index] };

      if (confirm(`Are you sure you want to delete ${deletedSubject.subject_code}?`)) {
        axios.delete(`http://localhost:5029/api/Subject/${deletedSubject.subject_code}`)
          .then(response => {
            if (response.data.status_code === 200) {
              this.subjects = this.subjects.filter(subject => subject.subject_code !== deletedSubject.subject_code);
              console.log("Deleted subject:", deletedSubject);
            } else {
              console.error('Failed to delete subject:', response.message);
            }
          })
          .catch(error => {
            console.error('Error deleting subject:', error);
          });
      }
    },
    deletedSubject(index) {
    console.log(index);
     
    },
  },
};
</script>

<style scoped>
.modal-style{
  width: 500px;
  height: 225px;
  background-color: grey;
  margin: auto;
}


</style>

