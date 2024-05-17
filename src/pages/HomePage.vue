<script>
import axios from 'axios';
export default{
name:'HomePage',
data(){
    return{
      
        restaurants:[],
    }
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
    <h1>home</h1>
    <div v-for="restaurant in restaurants">
    <div>
      <img :src="restaurant.image" alt="">
      {{ restaurant.restaurant_name }}  
      <ul v-for="category in restaurant.categories">
        <li>{{ category.category_name }}</li>
      </ul>
    </div>

    </div>
</template>

<style>

</style>