<script>
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';
import {store} from '../store.js'
export default{
name:'FilterRestaurants',
data(){
    return{
        store,
        restaurants:[],
    }

  },

  components: {
    RestaurantCard,
  },
  
mounted(){
  axios.get(this.store.apiBaseUrl +'/restaurants?categories=' + this.store.checkBoxValue, {
                    params: {
                        page: this.apiPageNumber
                    }
                }).then(res => {
                  console.log(res)
                    this.restaurants = res.data.results

                })
}

}

</script>

<template>

  

    <div class="container my-5">
        <div class="row">
            <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant"></RestaurantCard>
        </div>
    </div>
</template>
