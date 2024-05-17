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
    
        <router-view></router-view>

    <FooterApp></FooterApp>
</template>

<style>

</style>
