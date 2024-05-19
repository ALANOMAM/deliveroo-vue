<script>
import CategoryApp from '../components/CategoryApp.vue';
import IntroApp from '../components/IntroApp.vue';
import JumboApp from '../components/JumboApp.vue';
import SectionMobile from '../components/SectionMobile.vue';

export default{
  name:'HomePage',

  components:{
    CategoryApp,
    IntroApp,
    SectionMobile,
    JumboApp,
  },

  data(){
      return{
        
          
      }
  },
}

</script>

<template>
   <JumboApp></JumboApp>
  <IntroApp></IntroApp>
  <CategoryApp></CategoryApp>
  <SectionMobile></SectionMobile>
</template>

<style>

</style>