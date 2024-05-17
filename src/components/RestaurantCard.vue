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
    
    <div class="card pt-3 px-3">
        <div class="image">
            <img :src="'http://localhost:8000/storage/' + restaurant.image" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title text-center py-3">{{ restaurant.restaurant_name }}</h5>
        </div>
        <router-link :to="{name: 'single-restaurant', params: {id: restaurant.id}}" class="btn btn-primary ">Visualizza</router-link>
    </div>
    
</template>

<style lang="scss">
    .card {
        width: 20%;
    }

    .image {
        width: 100%;
        height: 150px;
        display: flex; 
    }

    img {
        object-fit: cover;
    }
</style>