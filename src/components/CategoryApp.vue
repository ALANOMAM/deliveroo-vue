<script>
import axios from 'axios';


import {store} from '../store.js'
import RestaurantCard from './RestaurantCard.vue';


export default {
  name: 'CategoryApp',
  data() {
    return {
      store,
      restaurants: [],
      categories: [],
      
      apiPageNumber: 1,

      /*isActive:false,*/

     
      //rispettare ordine
      categoryImages:[
      '/public/img/cinese-category.jpg',
      '/public/img/pizza-category.jpg',
      '/public/img/mexican-category.jpg',
      '/public/img/japanese-category.avif',
      '/public/img/fast-category.jpg',
      '/public/img/vegan-category.jpg',
      '/public/img/vege-category.jpeg',
      '/public/img/ita-category.jpg',
      '/public/img/corean-category.jpg',
      '/public/img/sushi-category.jpg',
      '/public/img/kebab-category.jpg',
      '/public/img/gourmet-category.jpg',
      ]
      
    };
  },

  components: {
    RestaurantCard,
  },

  mounted() {
    // axios.get('http://127.0.0.1:8000/api/restaurants').then(res => {
    //   this.restaurants = res.data.results;
    // });

    axios.get(this.store.apiBaseUrl +'/categories').then(res => {
      this.categories = res.data.results;
    })
    this.getAllRestaurants();
    this.filterCategory();
  },

  methods: {
    filterCategory() {

      if(this.store.checkBoxValue.length > 0) {
                axios.get(this.store.apiBaseUrl +'/restaurants?categories=' + this.store.checkBoxValue, {
                    params: {
                        page: this.apiPageNumber
                    }
                }).then(res => {
                  console.log(res)
                    this.restaurants = res.data.results

                })

            } else {
              this.getAllRestaurants();
            }
    },

    getAllRestaurants() {
      axios.get(this.store.apiBaseUrl + '/restaurants', {
        params: {
          page: this.apiPageNumber
        }
      }).then(res => {
        this.restaurants = res.data.results;
      });
    },

 /*selectedCategory(index){

    if(this.activeCatNumber == index){
        this.isActive = !this.isActive
    }
    console.log(index);
 }   */


  }
};
</script>

<template>
  <section class="parallax"> 
    <div class="container text-center">
      <h2 class="text-white">Cerca Per Categorie</h2>

      <div class="row">
        <div class="col-sm-2 mt-4 mb-sm-0 " v-for="(categoryElement , catIndex) in categories" :key="categoryElement">
          
            <div class="card box" >
            <div class="card-body d-flex flex-column align-items-center">

              <div  class="category-icon">
                 <!--tutti gli elementi dell'array delle immagini-->
                <div v-for="(categoryLogo,logoIndex) in categoryImages" >
                    <!--solo le immagini che corrispondono all'index della categoria-->
                    <div v-if="catIndex == logoIndex">
                    <img  class="category-image" :src="categoryLogo" alt="">
                    </div>
                </div>
               
              </div>
               

              <div class="checkbox-name">
              <input class="form-check-input" type="checkbox" role="switch" :value="categoryElement.category_name" :id="categoryElement.category_name" :name="categoryElement.category_name" v-model="store.checkBoxValue" @change="filterCategory()">                  
              <label class=" form-check-label categoryEv "   :for="categoryElement.category_name">{{categoryElement.category_name}}</label>
              <!--<label class=" form-check-label categoryEv "   :class=" isActive? 'active' : ''"  @click = selectedCategory(catIndex)  :for="categoryElement.category_name">{{categoryElement.category_name}}</label>-->
              <!-- <a href="#" class="btn category-name" @click.prevent="filterCategory(categoryElement.category_name)">{{ categoryElement.category_name }}</a> -->
             </div>
            
            </div>
          </div>






        </div>
      </div>
    </div>
    
  </section>  

  <section class="restaurants-section">
       <h2 class="text-center my-5">Lista Ristoranti</h2>
    <div class="container my-5">
        <div class="row">
            <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant"></RestaurantCard>
        </div>
    </div>
  </section>

</template>


<style lang="scss" scoped>

.checkbox-name{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box:hover{
    border: #F17228 solid 2px;
    background-color: whitesmoke;
}



.categoryEv{
    padding:5px;
    border-radius: 5px;

}

/*.active{
  background-color:#FFCA0B;  
  color: white
}*/

.parallax {

  background-image: url('/img/categories_background.jpeg');
  background-position: center;
  padding-top: 40px;
  padding-bottom: 400px;

max-height: 460px;

background-attachment: fixed;
background-position: center bottom;
background-repeat: no-repeat;
background-size: cover;
filter: blur(0px);

}

.card {
  width: 100%;
}

.category-icon {
  /*border: 1px solid red;*/
  width: 100%;
  height:auto;
  display: flex;
  justify-content: center;
  align-items: center;
    
 .category-image{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit:cover;
 }

}

.category-name{
  color:#FFCA0B; 
}

.category-name:active{
    color:#F17228;
}

</style>