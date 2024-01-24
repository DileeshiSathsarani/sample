<template>
<base-card>
  <h2>Register Here</h2>
  <ValidationObserver ref="registerForm" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleRegister)">
      <div class="form-control">
        <label for="firstname">First name</label>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <b-input type="text" id="firstname" v-model="loginData.firstname" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-control">
        <label for="lastname">Last name</label>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <b-input type="text" id="lastname" v-model="loginData.lastname" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-control">
        <label for="address">Address</label>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <b-input type="text" id="address" v-model="loginData.address" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <ValidationProvider rules="required|customEmail" v-slot="{ errors }">
        <b-input type="email" id="email" v-model="loginData.email" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      </div>

      <div class="form-control">
        <label for="contactnumber">Contact Number</label>
        <ValidationProvider rules="required|maxDigits" v-slot="{ errors }">
        <b-input type="text" id="contactnumber" v-model="loginData.contactnumber" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      </div>

      <div class="form-control">
        <label for="username">Username</label>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <b-input type="username" id="username" v-model="loginData.username" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <b-input type="password" id="password" v-model="loginData.password" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div>
        <base-button type="submit">Register</base-button>
      </div>
    </form>
  </ValidationObserver>
</base-card>
</template>

<script>
import axios from 'axios';
import StudentDetails from '@/components/StudentDetails.vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('maxDigits', {
  validate: (value) => {
    return /^[0-9]{1,10}$/.test(value);
  },
  message: 'The field must have a maximum of 10 digits.',
});
extend('email', email);
extend('customEmail', {
  validate: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message: 'The email field must be a valid email address.',
});

export default {
  name: 'RegisterComponent',
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      loginData: {
        firstname: '',
        lastname: '',
        address: '',
        email: '',
        password: '',
        contactnumber: '',
        username: '',
      },
    };
  },

  created() {
    if (this.$route.params.id) {
      this.fetchUserData(this.$route.params.id);
    }
  },

  methods: {
    async handleRegister() {
      try {
        const person = {
          first_name: this.loginData.firstname,
          last_name: this.loginData.lastname,
          address: this.loginData.address,
          email: this.loginData.email,
          contact_number: this.loginData.contactnumber,
          user_name: this.loginData.username,
          password: this.loginData.password,
        };

        if (this.$route.params.id) {
          const response = await axios.put(`http://localhost:5029/api/Student/${this.$route.params.id}`, person);
          if (response.data.status_code === 200) {
            console.log('Student updated successfully');
            this.$router.push('/student-details');
          } else {
            console.error('Failed to update student:', response.data.message);
          }
        } else {

          const response = await axios.post('http://localhost:5029/api/Student/register', person);
          if (response.data.status_code === 200) {
            console.log('Student registered successfully');
            StudentDetails.methods.fetchStudents.call(StudentDetails);
            this.$router.push('/student-details');
          } else {
            console.error('Registration failed:', response.data.message);
          }
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },

    async fetchUserData(id) {
      try {
        const response = await axios.get(`http://localhost:5029/api/Student/search/${id}`);
        console.log(response.data.first_name,"llllllllllllll")
        const userData = response.data;
        

        this.loginData = {
          firstname: userData.first_name,
          lastname: userData.last_name,
          address: userData.address,
          email: userData.email,
          contactnumber: userData.contact_number,
          username: userData.user_name,
          password: userData.password,
        };
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      
  },

  },
};
</script>

