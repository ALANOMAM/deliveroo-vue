<script>
import axios from 'axios';

export default{
name:'CategoryApp',
data(){
  return{
    restaurants:[],
    categorieyElements:["5","5","5","5","5","5","5","5","5","5","5","5"],
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
 <section class="parallax"> 
   <div class="container text-center">
    <h2 class="text-white">Cerca Per Categorie</h2>

    <div class="row">

  <div class="col-sm-3 mt-4 mb-sm-0" v-for="categorieyElement in categorieyElements">
    <div class="card">
      <div class="card-body d-flex flex-column align-items-center">
        <div class="category-icon">
            <i class="fa-solid fa-bowl-food"></i>
        </div>
        <a href="#" class="btn category-name">nome categoria</a>
      </div>
    </div>
  </div>

</div>


   </div>
  
 

   <!--<img src="/public/img/image.png"  style="background-color: brown;" alt="">
    <i class="fa-solid fa-house"></i>
    <div v-for="restaurant in restaurants">
    <div>
      <img :src="restaurant.image" alt="">
      {{ restaurant.restaurant_name }}  
      <ul v-for="category in restaurant.categories">
        <li>{{ category.category_name }}</li>
      </ul> 
    </div>
    </div>-->
</section>  
</template>

<style lang="scss" scoped>

section {

  background-image: url('/img/categories_background.jpeg');
  background-position: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.parallax {

  min-height: 600px;

  background-attachment: fixed;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(0px);

}

.category-icon {

  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
    
  i {
    font-size: 100px;
    color:#FFCA0B; 
  }

}

.category-name{
  color:#FFCA0B; 
}

.category-name:active{
    color:#F17228;
}

</style>