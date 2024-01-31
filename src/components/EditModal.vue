<!-- ModalForm.vue -->
<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Student</p>
        <button type="button" class="delete" @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <b-field label="First Name">
          <b-input v-model="editedFirstName" placeholder="Student's first name" required></b-input>
        </b-field>
        <b-field label="Last Name">
          <b-input v-model="editedLastName" placeholder="Student's last name" required></b-input>
        </b-field>
        <b-field label="Address">
          <b-input v-model="editedAddress" placeholder="Student's address" required></b-input>
        </b-field>
        <b-field label="Email">
          <b-input v-model="editedEmail" type="email" placeholder="Student's email" required></b-input>
        </b-field>
        <b-field label="Contact Number">
          <b-input v-model="editedContactNumber" type="tel" placeholder="Student's contact number" required></b-input>
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
  props: ['student', 'canCancel'],
  data() {
    return {
        editedFirstName: this.student.first_name,
        editedLastName: this.student.last_name,
        editedAddress: this.student.address,
        editedEmail: this.student.email,
        editedContactNumber: this.student.contact_number,
};
  },
  methods: {
    saveChanges() {
      const updatedStudent = {
          first_name: this.editedFirstName,
          last_name: this.editedLastName,
          address: this.editedAddress,
          email: this.editedEmail,
          contact_number: this.editedContactNumber,
};
      this.$emit('edit-user', updatedStudent);
    },
  },
};
</script>