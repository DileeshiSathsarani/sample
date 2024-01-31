<template>
  <base-card>
    <h2>Login Here</h2>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(handleLogin)">
        <div class="form-control">
          <label for="username">Username</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input type="text" id="username" v-model="loginData.username" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input type="password" id="password" v-model="loginData.password" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <base-button type="submit">Login</base-button>
        </div>
      </form>
    </ValidationObserver>
  </base-card>
</template>

<script>
import axios from 'axios';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required',
});

export default {
  name: 'LoginComponent',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loginData: {
        password: '',
        username:'',
        
      }
    };
  },
  methods: {
    async handleLogin() {
    try {

      const person = {
        user_name:this.loginData.username,
        password:this.loginData.password,
      };

      console.log(person);

      const response = await axios.post('http://localhost:5029/api/Student/login', person);
        if (response.data.status_code) {
          console.log(response.data.data.token);
          localStorage.setItem('token', response.data.data.token);
          this.$router.push('/student-details');
        } else {
          console.error('Login failed:', response.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },


    loginUser() {
     
      return new Promise((resolve, reject) => {
      
        setTimeout(() => {
          const success = true; 
              if (success) {
                resolve({ success: true });
              } else {
                reject(new Error('Login failed'));
              }
            }, 1000); 
      });
    },
  },
};
</script>


