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
          <b-input v-model="editedSubjectCode" placeholder="Subject code" required></b-input>
        </b-field>
        <b-field label="Subject Name">
          <b-input v-model="editedSubjectName" placeholder="Subject name" required></b-input>
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
      editedSubjectCode: '',
      editedSubjectName: '',
      // editedSubjectCode: this.editedSubject.subject_code,
      // editedSubjectName: this.editedSubject.subject_name,
    };
  },
  watch: {
    editedSubject: {
      immediate: true,
      handler(newVal) {
        this.editedSubjectCode = newVal ? newVal.subject_code : '';
        this.editedSubjectName = newVal ? newVal.subject_name : '';
      },
    },
  },
  methods: {
    saveChanges() {
      const updatedSubject = {
        subject_code: this.editedSubjectCode,
        subject_name: this.editedSubjectName,
      };
      this.$emit('save-changes', updatedSubject);
    },
  },
};
</script>
