<script>
export default{
    name:'IntroApp',
    data(){
        return{

        }
    }
}
</script>

<template>
  <section>

    <div class="container text-center">
      <h2 class="my-5">Come Funziona</h2>

      <div class="row mb-5">
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card-body d-flex flex-column align-items-center text-center">
            <div class="order-box mb-4">
              <img src="/public/img/order-bg.png" alt="" class="order-bg">
              <img src="/public/img/order.png" alt="" class="order-icon">
            </div>
            <p class="card-text">Scegli l'ordine</p>
            <p class="card-description">Scegli tra più di cento menu disponibili il tuo piatto preferito</p>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card-body d-flex flex-column align-items-center text-center">
            <div class="payments-box mb-4">
              <img src="/public/img/payments-bg.png" alt="" class="payments-bg">
              <img src="/public/img/payments.png" alt="" class="payments-icon">
            </div>
            <p class="card-text">Paga con comodità</p>
            <p class="card-description">Comodo, facile e veloce, scegli tra i nostri diversi metodi di pagamento</p>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card-body d-flex flex-column align-items-center text-center">
            <div class="meals-box mb-4">
              <img src="/public/img/meals-bg.png" alt="" class="meals-bg">
              <img src="/public/img/meals.png" alt="" class="meals-icon">
            </div>
            <p class="card-text">Goditi il cibo</p>
            <p class="card-description">Il cibo è fatto e consegnato direttamente a casa tua</p>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<style lang="scss" scoped>

h2 {
  color: #F17228;
  font-weight: 700;
}

.order-box {
  position: relative;
  
  .order-bg {
    width: 60px;
    border-radius: 20px;
  }
  
  .order-icon {
    width: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.payments-box {
  position: relative;
  
  .payments-bg {
    width: 50px;
  }

  .payments-icon {
    width: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.meals-box {
  position: relative;
  
  .meals-bg {
    width: 70px;
  }

  .meals-icon {
    width: 55px;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.meals-bg,
.order-bg,
.payments-bg{
  filter: drop-shadow(0px 15px 20px rgba(255, 174, 0, 0.3));
}

.card-text {
  font-weight: bold;
  font-size: 22px;
}

.card-description {
  max-width: 300px;
  font-size: 18px;
  color: #9E9E9E;
}
</style>