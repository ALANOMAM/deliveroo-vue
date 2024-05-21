<script>
export default{
 name:'CardPage',
 data(){
    return{


    }
 },


}

</script>

<template>

<div class="container">
<h2>Checkout</h2>    
<hr>
<form>
  <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="exampleInputEmail1" class="form-label"><strong>Indirizzo Consegna</strong></label>
    </div>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Inserisci Indirizzo">
  </div>

  <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="exampleInputEmail1" class="form-label"><strong>Nome</strong></label>
    </div>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Inserisci Nome" >
  </div>

  <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="exampleInputEmail1" class="form-label"><strong>Email</strong></label>
     </div>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="esempio@rossi.com" >
  </div>

  <div class="mb-3 d-flex flex-column">
    <label for="exampleInputEmail1" class="form-label"><strong>Una nota per noi?</strong></label>
    <textarea name="" id="" cols="50" rows="5" placeholder="Inserisci un commento o nota"></textarea>
  </div>
<hr>
  <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="exampleInputEmail1" class="form-label"><strong>Metodo Di Pagamento</strong></label>
    </div>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Come vuoi pagare?">
  </div>



  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>

</template>


<style lang="scss" scoped>
i{
    color:#ebb45b;
    font-size: 20px;
}

</style>
