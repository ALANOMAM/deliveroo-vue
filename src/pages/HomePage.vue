<script>
import CategoryApp from '../components/CategoryApp.vue';
import IntroApp from '../components/IntroApp.vue';

export default{
name:'HomePage',
components:{
CategoryApp,
IntroApp,
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
</template>

<style>

</style>