
import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
//router import
import { router } from './router.js'



createApp(App).use(router).mount('#app') 
