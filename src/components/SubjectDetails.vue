<template>
  <div>
    <h1>Subject Details</h1>

    <!-- Buefy Modal for Adding and Editing -->
    <b-modal :active.sync="isModalActive" :title="modalTitle">
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
    </b-modal>

    <!-- Subjects Table -->
    <data-table :data="subjects" :columns="subjectColumns" :hasActions="true" :editAction="openEditModal" :deleteAction="deleteSubject">
    </data-table>

    <!-- Add Button -->
    <div class="add-button-container">
      <b-button class="add-button" @click="openAddModal">Add Subject</b-button>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import axios from 'axios';

export default {
  name: 'SubjectDetails',
  components: {
    DataTable,
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
    },

    saveSubjectChanges() {
      const updatedSubject = {
        subject_code: this.modalSubjectCode,
        subject_name: this.modalSubjectName,
      };

      if (this.editedSubjectIndex !== null) {
        // Editing an existing subject
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
        // Adding a new subject
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

    deleteSubject(index) {
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
  },
};
</script>

