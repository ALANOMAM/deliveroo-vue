<script>
import axios from 'axios';
import FilterRestaurants from './FilterRestaurants.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CategoryApp',
  data() {
    return {
      restaurants: [],
      categories: [],
      checkBoxValue: [],
      apiBaseUrl: 'http://127.0.0.1:8000/api',
      apiPageNumber: 1,
    };
  },

  components: {
    FilterRestaurants,
  },

  mounted() {
    axios.get('http://127.0.0.1:8000/api/restaurants').then(res => {
      this.restaurants = res.data.results;
    });

    axios.get('http://127.0.0.1:8000/api/categories').then(res => {
      this.categories = res.data.results;
    })
  },

  methods: {
    navigateToCategory(category) {
      this.$router.push({ name: 'filter-restaurants', params: { category } });

      if(this.checkBoxValue.length > 0) {
                axios.get('http://127.0.0.1:8000/api/restaurant?categories=' + this.checkBoxValue, {
                    params: {
                        page: this.apiPageNumber
                    }
                }).then(res => {

                    this.restaurants = res.data.results

                })

            } 
    },
  }
};
</script>

<template>
  <section class="parallax"> 
    <div class="container text-center">
      <h2 class="text-white">Cerca Per Categorie</h2>

      <div class="row">
        <div class="col-sm-3 mt-4 mb-sm-0" v-for="categoryElement in categories" :key="categoryElement">
          <div class="card">
            <div class="card-body d-flex flex-column align-items-center">
              <div class="category-icon">
                <i class="fa-solid fa-bowl-food"></i>
              </div>
              <a href="#" class="btn category-name" @click.prevent="navigateToCategory(categoryElement.category_name)">{{ categoryElement.category_name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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