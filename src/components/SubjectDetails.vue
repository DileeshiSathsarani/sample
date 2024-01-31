<!-- SubjectDetails.vue -->

<template>
  <div>
    <h1>Subject Details</h1>
    <template v-if="subjects.length > 0"> 
      <DataTable :data="paginatedSubjects" :columns="subjectColumns" :hasActions="true" @edit-subject="handleEditSubject" @delete-subject="handleDeleteSubject">
        <template v-slot:actions="{ index }">
          <button class="edit-button" @click="openEditSubjectModal(index)">Edit</button>
          <button class="delete-button" @click="deleteSubject(index)">Delete</button>
        </template>
      </DataTable>
    </template>
    
    <!-- Pagination Section for Subjects -->
    <div class="mt-3" v-if="subjects.length > 0"> 
      <b-pagination
        v-model="subjectCurrentPage"
        :total-rows="subjectTotalRows"
        :per-page="pageSize"
        aria-controls="subject-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import axios from 'axios';

export default {
  name: 'SubjectDetails',
  components: {
    DataTable
  },

  data() {
    return {
      subjects: [],
      isComponentModalActive: false,
      subjectCurrentPage: 1,
      pageSize: 5,
      editedSubject: null,
      modalTitle: 'Add Subject',
      modalAction: 'Add Subject',
      modalSubjectCode: '',
      modalSubjectName: '',
    };
  },

  computed: {
    subjectColumns() {
      return [
        { field: 'subject_code', label: 'Subject Code' },
        { field: 'subject_name', label: 'Subject Name' },
        { field: 'actions', label: 'Actions' },
      ];
    },
    subjectTotalRows() {
      return this.subjects.length;
    },
    paginatedSubjects() {
      const startIndex = (this.subjectCurrentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.subjects.slice(startIndex, endIndex);
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
      this.isComponentModalActive = true;
      this.modalTitle = 'Add Subject';
      this.modalAction = 'Add Subject';
      this.modalSubjectCode = '';
      this.modalSubjectName = '';
      this.editedSubject = null;
    },

    openEditModal(index) {
      this.isComponentModalActive = true;
      this.modalTitle = 'Edit Subject';
      this.modalAction = 'Save Changes';
      this.modalSubjectCode = this.subjects[index].subject_code;
      this.modalSubjectName = this.subjects[index].subject_name;
      this.editedSubject = { ...this.subjects[index] };
    },

    closeModal() {
      this.isComponentModalActive = false;
    },

    saveSubjectChanges() {
      const updatedSubject = {
        subject_code: this.modalSubjectCode,
        subject_name: this.modalSubjectName,
      };

      if (this.editedSubject !== null) {
        axios.put(`http://localhost:5029/api/Subject/${this.editedSubject.subject_code}`, updatedSubject)
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
  },
};
</script>

<style scoped>
.modal-style {
  width: 500px;
  height: 225px;
  background-color: grey;
  margin: auto;
}
</style>
