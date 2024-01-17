<template>
  <base-card>
    <h2>Register Here</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-control">
        <label for="firstname">First name</label>
        <input type="text"  id="firstname" v-model="loginData.firstname" required/>
      </div>
      <div class="form-control">
        <label for="lastname">Last name</label>
        <input type="text"  id="lastname" v-model="loginData.lastname" required/>
      </div>
      <div class="form-control">
        <label for="address">Address</label>
        <input type="text"  id="address" v-model="loginData.address" required/>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email"  id="email" v-model="loginData.email" required/>
      </div>
      <div class="form-control">
          <label for="contactnumber">Contact Number</label>
          <input type="text"  id="contactnumber" v-model="loginData.contactnumber" required/>
        </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password"  id="password" v-model="loginData.password" required/>
      </div>
      
      <div>
        <base-button type="submit">Register</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      loginData: {
        firstname: '',
        lastname: '',
        address: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async handleRegister() {
    try {
      console.log(JSON.stringify(this.loginData));

      const response = await axios.post('http://localhost:5029/api/Student/register', JSON.stringify(this.loginData), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8;',
          'Accept' : '*/*',
        },
      });
        if (response.data.success) {
          
          this.$router.push('/student-details');
        } else {

          console.error('Registration failed:', response.message);
        }
      } catch (error) {
       
        console.error('Error during registration:', error);
      }
    },
    registerUser() {
     
      return new Promise((resolve, reject) => {
      
        setTimeout(() => {
          const success = true; 
          if (success) {
            resolve({ success: true });
          } else {
            reject(new Error('Registration failed'));
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
