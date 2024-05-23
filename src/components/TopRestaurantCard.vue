<script>

import {store} from '../store.js'

export default{

    name: 'TopRestaurantCard',

    data(){
        return{
            store,
            

        }
    },

    props : {

        topRestaurant: Object,

    }
}

</script>

<template>
  <a :href="'/restaurant/' + topRestaurant.id" class="restaurant-card py-3 px-3 mb-sm-0 text-decoration-none d-flex justify-content-between">
    <div class="d-flex flex-column">
        <p class="text-center">{{ topRestaurant.total_orders }} ordini</p>
    <div class="d-flex flex-column align-self-start">
      <div class="image rounded-4 overflow-hidden">
        <img v-if="topRestaurant.image === null" src="/img/restaurant_placeholder.jpg" class="card-img-left" alt="...">
        <img v-else-if="topRestaurant.image.startsWith('images/')" :src="'http://localhost:8000/storage/' + topRestaurant.image" class="card-img-left" alt="...">
        <img v-else :src="topRestaurant.image" class="card-img-left" alt="...">
      </div>
    </div>

    <div class="d-flex flex-column justify-content-center align-items-center">
      <h4 class="py-2 mb-4 ms-3">{{ topRestaurant.name }}</h4>
      <div class="text-center d-flex gap-2 ms-3">
        <div class="bg-pills text-white px-2 rounded-5" v-for="category in topRestaurant.categories">{{ category.category_name }}</div>
      </div>
      
    </div>
</div>
    </a>
</template>
  
  <style lang="scss" scoped>
    .restaurant-card {
      background-color: white;
      width: 20%;
      border-bottom: 1px solid rgb(179, 179, 179);
    }
  
    .image {
      width: 200px;
      height: 150px;
      display: flex; 
    }

    h4 {
      font-weight: 700;
      color: black;
    }
  
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .bg-pills {
      background-color: rgba(255, 179, 14, 1);
    }
  </style>