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

      isActive:false,
     
      
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
                  //console.log(res)
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

 selectedCategory(index){

 this.isActive = !this.isActive
    console.log(index);
 }   


  }
};
</script>

<template>
  <section class="parallax"> 
    <div class="container text-center">
      <h2 class="text-white">Cerca Per Categorie</h2>

      <div class="row">
        <div class="col-sm-3 mt-4 mb-sm-0" v-for="(categoryElement , catIndex) in categories" :key="categoryElement">
          <div class="card">
            <div class="card-body d-flex flex-column align-items-center">
              <div class="category-icon">
                <i class="fa-solid fa-bowl-food"></i>
              </div>
              <input class="form-check-input checkbox-hidden" type="checkbox" role="switch" :value="categoryElement.category_name" :id="categoryElement.category_name" :name="categoryElement.category_name" v-model="store.checkBoxValue" @change="filterCategory()">                  
              <label class="form-check-label categoryEv " :class=" isActive? 'active' : ''" @click = selectedCategory(catIndex)   :for="categoryElement.category_name">{{categoryElement.category_name}}</label>
              <!-- <a href="#" class="btn category-name" @click.prevent="filterCategory(categoryElement.category_name)">{{ categoryElement.category_name }}</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>  

  <section class="restaurants-section">
       
    <div class="container p-5">
         <h2 class="text-center">Lista Ristoranti</h2>
        <div class="row">
            <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant"></RestaurantCard>
        </div>
    </div>
  </section>

</template>


<style lang="scss" scoped>
.checkbox-hidden{
    display: none;
}

.categoryEv{
    padding:5px;
    border-radius: 5px;

}
.active{
  background-color:#FFCA0B;  
  color: white
}

.restaurants-section{
    background-color:#FEFAF1;
}

.parallax {

  background-image: url('/img/categories_background.jpeg');
  background-position: center;
  padding-top: 40px;
  padding-bottom: 40px;

min-height: 600px;

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