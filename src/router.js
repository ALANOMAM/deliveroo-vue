import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';
import FilterRestaurants from "./components/FilterRestaurants.vue";
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
            path: '/restaurants/:category?',
            name: 'filter-restaurants',
            component: FilterRestaurants,
        },
        {
            path: '/restaurant/:id',
            name: 'single-restaurant',
            component: SingleRestaurant,
        },
    ]
});

export { router };