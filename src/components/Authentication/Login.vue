<template>

  <base-card>
    <h2>Login Here</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-control">
        <label for="username">User Name</label>
        <input type="username" name="username" id="username" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div>
        <base-button type="submit">Login</base-button>
      </div>
    </form>
  </base-card>
</template>


<script>
export default {
  name: "LoginComponent",
  methods: {
    async handleLogin() {
      try {
       
        const response = await this.authenticateUser();
        if (response.success) {

          this.$router.push('/student-details');
        } else {
         
          console.error('Login failed:', response.message);
        }
      } catch (error) {

        console.error('Error during login:', error);
      }
    },
    authenticateUser() {

      return new Promise((resolve, reject) => {
        
        setTimeout(() => {
          const success = true; 
          if (success) {
            resolve({ success: true });
          } else {
            reject(new Error('Authentication failed'));
          }
        }, 1000); 
      });
    },
  },
};
</script>


<style scoped>
input {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}

</style>