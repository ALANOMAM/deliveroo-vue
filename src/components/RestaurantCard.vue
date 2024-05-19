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
    <div class="col-sm-3 mt-4 mb-sm-0">
      <div class="card pt-3 px-3">
        <div class="image">
          <img :src="'http://localhost:8000/storage/' + restaurant.image" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title text-center py-3">{{ restaurant.restaurant_name }}</h5>
        </div>
        <a :href="'/restaurant/' + restaurant.id" class="btn btn-primary d-block mx-auto my-3">Visualizza</a>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
    .card {
      width: 100%;
    }
  
    .image {
      width: 100%;
      height: 150px;
      display: flex; 
    }
  
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  </style>