<script>

export default{
    name:'JumboApp',

}

</script>

<template>

    <section>

        <div class="container position-relative d-flex align-items-center h-100">

            <div class="d-flex justify-content-between align-items-center ">

                <!-- Titoli a sinistra -->
                <div>
                    <h1>Hai Fame?</h1>
                    <h2 class="fs-3">Con un click, senza stress, il tuo pasto è un success</h2>
                </div>

                <!-- Immagine a destra -->
                <div class="img-bowl">
                    <img src="/img/bowl-jumbo.png" alt="Bowl Jumbo">
                </div>

            </div>

        </div>

    </section>
    
</template>

<style lang="scss" scoped>

section {

    width: 100%;
    height: 620px;
    background: rgb(255,138,0);
    background: linear-gradient(0deg, rgba(255,138,0,1) 0%, rgba(255,174,0,1) 58%);

    overflow: hidden;

    h1 {
        font-size: 60px;
        color: white;
    }

    h2 {
        color: black;
        font-size: 18px;
    }

    .img-bowl {

        position: absolute;
        right: 0px;
        bottom: -180px;

        img {
            width: 500px;
            height: auto;
            filter: drop-shadow(-100px 0px 40px rgba(0, 0, 0, 0.5));
            
        }

    }

}

</style>