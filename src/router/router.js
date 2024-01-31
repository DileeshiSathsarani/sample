// src/router/router.js
import Vue from 'vue';
import Router from 'vue-router';
import LoginComponent from '../components/Authentication/Login.vue';
import RegisterComponent from '../components/Authentication/Register.vue';
import StudentDetailsComponent from '../components/StudentDetails.vue';
import SubjectDetailsComponent from '../components/SubjectDetails.vue'; 
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);
Vue.use(Router);

const router = new Router({
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
      meta: { requiresAuth: true },
    },
    {
      path: '/subject-details', 
      name: 'SubjectDetails',
      component: SubjectDetailsComponent,
      meta: { requiresAuth: true },
    },
    {
      path: '/register/:id?', 
      name: 'register',
      component: RegisterComponent,
    },
  ],
});


router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("token")
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
