<script>
import HeaderApp from './components/HeaderApp.vue';
import FooterApp from './components/FooterApp.vue';
import JumboApp from './components/JumboApp.vue';

export default{

  components:{

    HeaderApp,
    FooterApp,
    JumboApp,

  }
}
</script>

<template>
   
    <HeaderApp></HeaderApp>

    <JumboApp></JumboApp>

    
        <router-view></router-view>
  
    
    <FooterApp></FooterApp>
</template>

<style>

</style>
