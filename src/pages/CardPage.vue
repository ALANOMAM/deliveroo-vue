<script>
import axios from 'axios';
export default{
 name:'CardPage',
 data(){
    return{
        restaurantId: null,
            restaurant: {},   
            baseApiUrl: 'http://127.0.0.1:8000/api',
            quantity: 1,
            currentDish: null,


//pezzo carrello
cart: []
    }
 },

  //pezzo carrello
  created() {
        this.restaurantId = this.$route.params.id;
        this.loadCart();
    },

    
    mounted() {
    
    this.restaurantId = this.$route.params.id;
    
    axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`).then(res => {
        this.restaurant = res.data.restaurant;
    })
},

computed: {
    totalPrice() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }
},

methods: {
    getImageUrl(image) {
        if (image) {
            if (image.startsWith('http://') || image.startsWith('https://')) {
                return image;
            } else {
                return `${this.baseApiUrl}/storage/${image}`;
            }
        } else {
            return '/img/Default_different_food_0.jpg';
        }
    },    

    decrement() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    },
        
    increment() {
        this.quantity++;
    },

    //pezzo carrello
    loadCart() {
        const savedCart = localStorage.getItem('cart_' + this.restaurantId);
        this.cart = savedCart ? JSON.parse(savedCart) : [];
    },

    addToCart() {
        const cartItem = {
            name: this.currentDish.dish_name,
            quantity: this.quantity,
            price: this.currentDish.dish_price * this.quantity
        };

        
        //Controlla se il piatto esiste già nel carrello
        const existingItemIndex = this.cart.findIndex(item => item.name === cartItem.name);

        if (existingItemIndex !== -1) {
            //Aggiorna il piatto esistente
            this.cart[existingItemIndex].quantity += this.quantity;
            this.cart[existingItemIndex].price += cartItem.price;
        
        } else {
            //Aggiungi il nuovo piatto
            this.cart.push(cartItem);
        }

        this.updateLocalStorage();
    },

   //AGGIUNTO DA ME START
    addToCart2() {
        const cartItem2 = {
            address: this.user_address,
            name: this.user_name,
            email: this.user_mail,
            payment:this.user_payment
        }

        this.cart.push(cartItem2);
    
        console.log(cartItem2);
    },
     //AGGIUNTO DA ME END


    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateLocalStorage();
    },

    updateLocalStorage() {
        localStorage.setItem('cart_' + this.restaurantId, JSON.stringify(this.cart));
    },

    openModal(dish) {
        this.currentDish = dish;
        this.quantity = 1;
        new bootstrap.Modal(document.getElementById('addDish')).show();
    }   

},



// Osserva i cambiamenti del ristorante e aggiorna il carrello di conseguenza
watch: {
    $route(to, from) {
        // Salva il carrello corrente
        this.updateLocalStorage();

        // Aggiorna l'ID del ristorante e carica il nuovo carrello
        this.restaurantId = to.params.id;
        this.loadCart();

        // Ricarica i dati del ristorante
        axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`).then(res => {
            this.restaurant = res.data.restaurant;
        });
    }
}


}

</script>

<template>

<div class="container">
<h2>Checkout</h2>    
<hr>
</div>

<!--inizio container-->
<div class="container d-flex justify-content-between">
<form>
  <div class="mb-3">
    
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_address" class="form-label"><strong>Indirizzo Consegna</strong></label>
    
    <input type="text" class="form-control" name="user_address" id="user_address" placeholder="Inserisci Indirizzo">
  </div>

  <div class="mb-3">
    
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_name" class="form-label"><strong>Nome</strong></label>
    
    <input type="text" class="form-control" name="user_name" id="user_name" placeholder="Inserisci Nome" >
  </div>

  <div class="mb-3">
    
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_mail" class="form-label"><strong>Email</strong></label>
    
    <input type="email" class="form-control"  name="user_mail" id="user_mail" aria-describedby="emailHelp" placeholder="esempio@rossi.com" >
  </div>

 
<hr>
  <div class="mb-3">
    
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_payment" class="form-label"><strong>Metodo Di Pagamento</strong></label>
    
    <input type="text" class="form-control"  name="user_payment" id="user_payment" placeholder="Come vuoi pagare?">
  </div>



  <button type="submit" class="btn btn-primary" @click="addToCart2()">Submit</button>
</form>



<div class="mb-3 d-flex flex-column">
    <label for="exampleInputEmail1" class="form-label"><strong>Una nota per noi?</strong></label>
    <textarea name="exampleInputEmail1" id="exampleInputEmail1" cols="50" rows="5" placeholder="Inserisci un commento o nota"></textarea>
  </div>


 <!--carello inizio-->
 <div class="col-md-4">
                    <div class="cart">
                        <h2 class="text-center fs-2 mb-5 pt-4 text-uppercase">Carrello</h2>
                        
                        <ul>
                            <li>
                            Indirizzo : 
                            </li>

                            <li>Nome : </li>
                            <li>Email : </li>
                            <li>Pagamento : </li>
                            
                            <li v-for="(cartItem, index) in cart" :key="index" class="d-flex justify-content-between mb-4">
                                <div class="d-flex flex-column">
                                    <span>{{ cartItem.name }}</span>
                                    <span class="price">€ {{ cartItem.price }}</span>
                                </div>

                                <div class="d-flex align-items-center">
                                   <!--numero, piu e meno-->
                                    <div class="d-flex gap-2 align-items-center" >
                                    <i class="fa-solid fa-minus" @click="cartItem.quantity--"></i>
                                    <span>{{ cartItem.quantity }}</span>
                                    <i class="fa-solid fa-plus" @click="cartItem.quantity++"></i>
                                    </div>
                                    <!--numero, piu e meno-->

                                    <span @click="removeFromCart(index)" class="remove-item">
                                        <i class="fa-solid fa-x ms-4 me-2 d-none"></i>
                                        <i class="fa-solid fa-trash fs-5 ms-4 me-2"></i>
                                    </span>
                                </div>

                            </li>
                        </ul>
                        
                        <hr class="mx-4">

                        <div class="d-flex justify-content-between align-items-center mx-4">
                            <h2 class="fs-4 ms-2">Totale</h2>

                            <span class="fs-3 me-1">{{ totalPrice }} €</span>
                        </div>
                     
                         <!-- Bottone che porta alla pagina del carrello -->

                         <div class="d-flex justify-content-center">
                            <button class="btn btn-success">vai al pagamento</button>
                           <!--<a :href="'/restaurant/' + restaurant.id + '/card'"  class="btn card-btn">vai alla card</a>-->
                        </div>
                    
                    </div>
                </div>

                <!--carello fine-->

</div>
<!--fine container-->


</template>


<style lang="scss" scoped>
i{
    color:#ebb45b;
    font-size: 20px;
}

.cart {
    padding-bottom: 20px;
    background-color: #FEFAF1;

    .price {
        font-size: 14px;
        color: #A0A0A0;
    }

    .remove-item i {
        cursor: pointer;
        transition: 0.1s;

        &:hover {
            transform: scale(120%);
        }
    }
}
</style>
