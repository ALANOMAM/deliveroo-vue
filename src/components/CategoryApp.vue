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

      currentPage: 1,
      per_page: 1,
      last_page: 1,
      total_items:1,
      apiLinks: [],


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
                    this.restaurants = res.data.results.data

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
      //aggiorna l'elenco dei ristoranti con i dati ricevuti
        this.restaurants = res.data.results.data;
        //aggiorna i link di navigazione della paginazione
        this.apiLinks = res.data.results.links;
        //aggiorna l'ultima pagina disponibile
        this.last_page = res.data.results.last_page;
        //aggiorna il numero totale di ristoranti
        this.total_items = res.data.results.total;
        //aggiorna il numero di elementi per pagina
        this.per_page = res.data.results.per_page;
      });
    },
  

//funzione per cambiare la pagina corrente
  changePage(direction) {
            if (direction === 'next' && this.currentPage < this.last_page) {
                this.currentPage++;
            } else if (direction === 'prev' && this.currentPage > 1) {
                this.currentPage--;
            }

            this.apiPageNumber = this.currentPage;

            
            this.getAllRestaurants();
        }
      },

 /*selectedCategory(index){

    if(this.activeCatNumber == index){
        this.isActive = !this.isActive
    }
    console.log(index);
 }   */


  }

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

        <div class="text-center mt-5">
            <vue-awesome-paginate
              :total-items="total_items"
              v-model="currentPage"
              :items-per-page="per_page"
              :max-pages-shown="last_page"
              :on-click="changePage"
              :hide-prev-next-when-ends="true"
            />
        </div>
    </div>
  </section>

</template>


<style lang="scss" >

.checkbox-name{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box:hover{
    border: #F17228 solid 2px;
    background-color: whitesmoke;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #F17228;
    border: 1px solid #F17228;
    color: white;
  }
  .active-page:hover {
    background-color: rgba(255, 179, 14, 1);
    border: 1px solid rgba(255, 179, 14, 1);
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