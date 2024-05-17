import { createRouter, createWebHistory } from "vue-router";

// components

// qui importo le mie viste 
import HomePage from './pages/HomePage.vue';
//import SinglePage from './pages/SinglePage.vue';

const router = createRouter({
    history: createWebHistory(),

    // qui definisco le rotte delle mie viste 
   routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
      /*  {
            path: '/posts/:id',
            name: 'single-page',
            component: SinglePage
        },*/
    ]
});

export { router };  