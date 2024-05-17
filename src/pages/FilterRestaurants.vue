<script>
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';
export default{
name:'FilterRestaurant',
data(){
    return{
      
        restaurants:[],
    }

  },

  components: {
    RestaurantCard,
  },
  
mounted(){
     //chiamata axios che tramite l'api mi restituisce i posts
     axios.get('http://127.0.0.1:8000/api/restaurants').then(res => {

   console.log(res.data);

   //salvato i miei ris dentro l'array 
 this.restaurants = res.data.results;

})
}

}

</script>

<template>

  

    <div>
        <h1>Home</h1>
        <div class="row">
            <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant"></RestaurantCard>
        </div>
    </div>
</template>
