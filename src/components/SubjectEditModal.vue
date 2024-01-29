<!-- SubjectEditModal.vue -->
<template>
    <form>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ modalTitle }}</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Subject Code">
            <b-input v-model="editedSubjectCopy.subject_code" placeholder="Subject code" required></b-input>
          </b-field>
          <b-field label="Subject Name">
            <b-input v-model="editedSubjectCopy.subject_name" placeholder="Subject name" required></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Close" @click="$emit('close')" />
          <b-button label="Save Changes" type="is-primary" @click="saveChanges" />
        </footer>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    props: ['editedSubject', 'modalTitle'],
    data() {
      return {
        editedSubjectCopy: { ...this.editedSubject },
      };
    },
    methods: {
      saveChanges() {
        const updatedSubject = {
          subject_code: this.editedSubjectCopy.subject_code,
          subject_name: this.editedSubjectCopy.subject_name,
        };
        this.$emit('save-changes', updatedSubject);
      },
    },
  };
  </script>
  