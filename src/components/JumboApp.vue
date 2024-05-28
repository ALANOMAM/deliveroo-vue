<script>
export default {
    name: 'JumboApp',
}
</script>

<template>
    <section class="jumbo-section">
        <div class="container position-relative d-flex align-items-center h-100">
            <div class="d-flex justify-content-between align-items-center">
                <!-- Titoli a sinistra -->
                <div class="text-section p-3 rounded-4">
                    <h1 class="fw-semibold">Hai Fame?</h1>
                    <h2 class="fs-3 fw-normal">Con un click, senza stress, il tuo pasto è un success</h2>
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
        font-size: 100px;
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

/* Media Query per schermi piccoli */
@media (max-width: 1200px) {
    .img-bowl {
        display: none;
    }
    .jumbo-section {
        background: url('/img/jumbo.jpg') no-repeat center center;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-section {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6); 
        z-index: 1;
    }

    .container {
        display: none;
    }

    .jumbo-section h1 {
        font-size: 60px;
    }

    .jumbo-section h2 {
        color: white;
    }

}
</style>