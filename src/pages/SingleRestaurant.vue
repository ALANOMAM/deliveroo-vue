<script>

import axios from 'axios';

export default {
    name: 'SingleRestaurant',
    data() {
        return {
            restaurantId: null,
            restaurant: null,   
            baseApiUrl: 'http://127.0.0.1:8000/api',
        }
    },
    mounted() {
    
        this.restaurantId = this.$route.params.id;
        
        axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`)
            .then(res => {
                this.restaurant = res.data.restaurant;
            })
           
    }
}
</script>

<template>
   <div>
    singolo ristorante
   </div>
   
</template>

<style>

</style>
