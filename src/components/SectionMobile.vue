<script>
export default{
  name:'SectionMobile',

  data(){
      return{
        
          
      }
  },
}
</script>

<template>
    <div class="mobile-section">
        <div class="img">
            <!-- onda di sfondo -->
            <img src="/public/img/wave.png" alt="" class="wave">
            <img src="/public/img/Light-iPhone-Shadow.png" alt="" class="iphone-bg">
            <img src="/public/img/Iphone.png" alt="" class="iphone">
        </div>

        <div class="text">
            <h2>Installa l'App</h2>
            <p>Non è mai stato così facile ordinare cibo. Cerca gli sconti migliori e ti perderai in un mondo di cibo delizioso.</p>
            <div class="buttons">
                <!-- <a href="">
                    <img src="/public/img/google-play.png" alt="" class="android"> 
                </a>
                <a href="">
                    <img src="/public/img/app-store.png" alt="" class="apple">
                </a> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mobile-section {
position: relative;

    .img {
        .wave {
            width: 100%;
            object-fit: cover;
        }
    
        .iphone-bg {
            position: absolute;
            top: 28%;
            left: 20%;
            max-width: 200px;
        }
    
        .iphone {
            position: absolute;
            top: 15%;
            left: 33.3%;
            max-width: 200px;
        }
    }

    .text {
        position: absolute;
        top: 15%;
        right: 20%;
        max-width: 300px;

        h2 {
            margin-bottom: 15px;
            font-size: 40px;
            font-weight: bold;
            color: #FFA103;
        }

        p {
            margin-bottom: 15px;
            font-size: 16px;
            color: #827E7E;
        }

        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>