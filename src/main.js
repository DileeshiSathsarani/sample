import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import BaseCard from './components/UI/BaseCard';
import BaseButton from './components/UI/BaseButton';
import LoginComponent from './components/Authentication/Login';
import RegisterComponent from './components/Authentication/Register';
import '@/css/styles.css';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
 

Vue.component('base-card', BaseCard);
Vue.component('base-button', BaseButton);
Vue.component('login-component', LoginComponent);  
Vue.component('register-component', RegisterComponent);  

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
