import { createRouter, createWebHistory } from "vue-router";

// components

// qui importo le mie viste 
import HomePage from './pages/HomePage.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';
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
        {
            path: '/restaurants/:id',
            name: 'single-restaurant',
            component: SingleRestaurant
        },
    ]
});

export { router };  