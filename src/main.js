
import { createApp } from 'vue'
import './style.scss'
import Vue from 'vue';
import App from './App.vue'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";


// local storage

import VueLocalStorage from 'vue-localstorage'

new Vue({
    render: h => h(App),
  }).$mount('#app');


//router import
import { router } from './router.js'




createApp(App).use(router).use(VueAwesomePaginate).use(VueLocalStorage).mount('#app') 
