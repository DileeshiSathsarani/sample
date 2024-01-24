<template>
  <div class="modal" v-if="isActive">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Edit Student</h2>

      <form @submit.prevent="handleSubmit(saveChanges)">
        <div>
          <label for="editFirstName">First Name</label>
          <input v-model="localEditedFirstName" type="text" id="editFirstName" />

          <label for="editLastName">Last Name</label>
          <input v-model="localEditedLastName" type="text" id="editLastName" />

          <label for="editAddress">Address</label>
          <input v-model="localEditedAddress" type="text" id="editAddress" />

          <label for="editEmail">Email</label>
          <input v-model="localEditedEmail" type="text" id="editEmail" />

          <label for="editContactNumber">Contact Number</label>
          <input v-model="localEditedContactNumber" type="text" id="editContactNumber" />
        </div>

        <div class="buttons">
          <button @click="saveChanges">Save Changes</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: 
  [
    'isActive', 
    'editedFirstName', 
    'editedLastName', 
    'editedAddress', 
    'editedEmail', 
    'editedContactNumber'
  ],
  
  data() {
    return {
      localEditedFirstName: this.editedFirstName,
      localEditedLastName: this.editedLastName,
      localEditedAddress: this.editedAddress,
      localEditedEmail: this.editedEmail,
      localEditedContactNumber: this.editedContactNumber,
    };
  },
  methods: {
    handleSubmit(callback) {
      callback();
      this.closeModal();
    },
    saveChanges() {
      this.$emit('save-changes', {
        editedFirstName: this.localEditedFirstName,
        editedLastName: this.localEditedLastName,
        editedAddress: this.localEditedAddress,
        editedEmail: this.localEditedEmail,
        editedContactNumber: this.localEditedContactNumber,
      });
    },
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>
