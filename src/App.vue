<script>
import HeaderApp from './components/HeaderApp.vue';
import FooterApp from './components/FooterApp.vue';
export default{
  components:{
 HeaderApp,
 FooterApp,
  }
}
</script>

<template>
   
    <HeaderApp></HeaderApp>
    <div class="container">
        <router-view></router-view>
    </div>
    <FooterApp></FooterApp>
</template>

<style>

</style>
