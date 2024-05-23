<script>

export default{

    name: 'RestaurantCard',

    data(){
        return{

        }
    },

    props : {

        restaurant: Object,
        

    }
}

</script>

<template>
  <a :href="'/restaurant/' + restaurant.id" class="restaurant-card py-3 px-3 d-flex m-auto flex-row mb-sm-0 text-decoration-none">
    <div class="d-flex">
      <div class="image rounded-4 overflow-hidden">
        <img v-if="restaurant.image === null" src="/img/restaurant_placeholder.jpg" class="card-img-left" alt="...">
        <img v-else-if="restaurant.image.startsWith('images/')" :src="'http://localhost:8000/storage/' + restaurant.image" class="card-img-left" alt="...">
        <img v-else :src="restaurant.image" class="card-img-left" alt="...">
      </div>
      
      <div class="d-flex flex-column">
        <h4 class="py-2 mb-4 ms-3">{{ restaurant.restaurant_name }}</h4>
        <div class="text-center d-flex gap-2 ms-3">
          <div class="bg-pills text-white px-2 rounded-5" v-for="category in restaurant.categories">{{ category.category_name }}</div>
        </div>
      </div>
    </div>
  </a>
</template>
  
  <style lang="scss" scoped>
    .restaurant-card {
      background-color: white;
      width: 80%;
      border-bottom: 1px solid rgb(179, 179, 179);
    }
  
    .image {
      width: 300px;
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