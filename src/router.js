import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';

import SingleRestaurant from "./pages/SingleRestaurant.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/restaurant/:id',
            name: 'single-restaurant',
            component: SingleRestaurant,
        },
    ]
});

export { router };