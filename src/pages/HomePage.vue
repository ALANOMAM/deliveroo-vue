<script>
import CategoryApp from '../components/CategoryApp.vue';
import IntroApp from '../components/IntroApp.vue';
import SectionMobile from '../components/SectionMobile.vue';

export default{
  name:'HomePage',

  components:{
    CategoryApp,
    IntroApp,
    SectionMobile,
  },

  data(){
      return{
        
          
      }
  },
}

</script>

<template>
  <IntroApp></IntroApp>
  <CategoryApp></CategoryApp>
  <SectionMobile></SectionMobile>
</template>

<style>

</style>