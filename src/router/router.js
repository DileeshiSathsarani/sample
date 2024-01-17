// src/router/router.js
import Vue from 'vue';
import Router from 'vue-router';
import LoginComponent from '../components/Authentication/Login.vue';
import RegisterComponent from '../components/Authentication/Register.vue';
import StudentDetailsComponent from '../components/StudentDetails.vue';

Vue.use(Router);

export default new Router({
 
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterComponent,
    }, 
    {
        path: '/student-details',
        name: 'StudentDetails',
        component: StudentDetailsComponent, 
      },
  ],

});
