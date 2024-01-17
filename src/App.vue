<!-- App.vue -->
<template>
  <div>
    <the-header :title="title"></the-header>
    <div class="container">
      <base-card>
      <router-link to="/login" class="nav-button" :class="{ 'active': $route.path === '/login' }">Login</router-link>
        <router-link to="/register" class="nav-button" :class="{ 'active': $route.path === '/register' }">Register</router-link>
      </base-card>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader";

export default {
  name: "App",
  components: {
    'the-header': TheHeader,
  },
  data() {
    return {
      title: "Student Registration",
    };
  },
  methods: {
    setLoginActiveTab() {
      return this.$route.path === '/login' ? 'active' : '';
    },
    setRegisterActiveTab() {
      return this.$route.path === '/register' ? 'active' : '';
    },
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");

* {
  margin: 0;
  box-sizing: border-box;
}
body,
html {
  font-family: "Open Sans", sans-serif;
}
.container {
  width: 90%;
  margin: 0 auto;
}

.nav-button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #03045e;
  border: 1px solid #03045e;
  color: white;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  margin-right: 10px; /* Add margin between buttons */
}

.nav-button:hover,
.nav-button:active {
  background-color: #023e8a;
  border-color: #023e8a;
}

/* Style for active button */
.active {
  background-color: #023e8a;
  border-color: #023e8a;
}
</style>
