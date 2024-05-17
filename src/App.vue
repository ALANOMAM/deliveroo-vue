<script>
import HeaderApp from './components/HeaderApp.vue';
import FooterApp from './components/FooterApp.vue';
import FilterRestaurants from './pages/FilterRestaurants.vue';
export default{
  components:{
 HeaderApp,
 FooterApp,
 FilterRestaurants
  }
}
</script>

<template>
   
    <HeaderApp></HeaderApp>
    <div class="container">
        <router-view></router-view>
        <FilterRestaurants></FilterRestaurants>
    </div>
    <FooterApp></FooterApp>
</template>

<style>

</style>
