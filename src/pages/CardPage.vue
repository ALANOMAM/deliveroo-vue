<script>
import axios from 'axios';
import {store} from '../store.js'
export default{
    name:'CardPage',
    data(){
        return{
            store,
            restaurantId: null,
            restaurant: {},   
            baseApiUrl: 'http://127.0.0.1:8000/api',
            quantity: 1,
            currentDish: null,
                
            //pezzi legati al form che aggiunge indirizzo ecc 
            customerInfo :{},
            customerAddress:'',
            customerName:'',
            customerEmail:'',
            customerComment:'',
            customerSurname:'',
            customerPhone: '',

            //pezzo carrello
            cart: [],
            //loader
            loading: false,
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
        }),

        this.getToken();

        var button = document.querySelector('#submit-button');

        const makePayment = (nonce) => {
            this.makePayment(nonce);
        }

        braintree.dropin.create({
            authorization: 'sandbox_38ccykrv_y58kr6st43mn4zfc',
            selector: '#dropin-container'
            }, function (err, instance) {
            button.addEventListener('click', function () {
                instance.requestPaymentMethod(function (err, payload) {
                    
                    if (err) {
                        console.error(err)

                        return 
                    }
                    console.log(payload)
                    makePayment(payload.nonce);
                });
            })
        });
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
                price: this.currentDish.dish_price * this.quantity,
                id: this.currentDish.id,
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
        // addToCart2() {

        //     this.customerInfo = {
        //         one:this.customerAddress,
        //         two:this.customerName,
        //         three:this.customerEmail,
        //         four:this.customerComment,
        //     }

        
        //     console.log(this.test);

            
        // },
        //AGGIUNTO DA ME END


        removeFromCart(index) {
            this.cart.splice(index, 1);
            this.updateLocalStorage();
        },

        updateLocalStorage() {
            localStorage.setItem('cart_' + this.restaurantId, JSON.stringify(this.cart));
        },

        updateCartItem(index, increment) {
            if (increment) {
                this.cart[index].quantity++;
            } else if (this.cart[index].quantity > 1) {
                this.cart[index].quantity--;
            } else {
                // Non fare nulla se la quantità è 1 e si tenta di decrementare
                return;
            }

            this.cart[index].price = this.cart[index].quantity * (this.cart[index].price / (this.cart[index].quantity + (increment ? -1 : 1)));
            this.updateLocalStorage();
        },

        //pagamento (token braintree)
        async getToken() {
            try {
                const response = await axios.get( this.store.apiBaseUrl + '/get-token');
                this.nonce = response.data.token;
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        },
        
        async makePayment(nonce) {
            this.loading = true;
            
            const paymentData = {
                customer_name: this.customerName,
                customer_surname: this.customerSurname,
                customer_email: this.customerEmail,
                customer_phone: this.customerPhone,
                customer_address: this.customerAddress,
                message: this.customerComment,
                cart: this.cart,
                totalPrice: this.totalPrice,
                nonce
            };

            try {
                const response = await axios.post(this.store.apiBaseUrl + '/payment', paymentData);

                if (response.data.success) {
                    this.$router.push({ name: 'payment-status', query: { paymentSuccess: true, transactionId: response.data.transaction_id } });
                } else {
                    this.$router.push({ name: 'payment-status', query: { paymentSuccess: false, errorMessage: response.data.message } });
                }

            } catch (error) {
                console.error('Error processing payment:', error);
                this.$router.push({ name: 'payment-status', query: { paymentSuccess: false, errorMessage: 'Error processing payment' } });
            
            } finally {
                this.loading = false;
                this.clearCart();
            }
        },

        clearCart() {
            this.cart = [];
            this.updateLocalStorage();
        },
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
<div class="container d-flex gap-4">

 <!--form start-->   
<form class="form" @submit.prevent="makePayment">

  <div class="mb-3">
     <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_address" class="form-label"><strong>Indirizzo Consegna</strong></label>
     </div>
    <input  v-model="customerAddress" type="text" class="form-control" name="user_address" id="user_address" placeholder="Inserisci Indirizzo">
  </div>

 <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_name" class="form-label"><strong>Nome</strong></label>
    </div>
    <input v-model="customerName"  type="text" class="form-control" name="user_name" id="user_name" placeholder="Inserisci Nome" >
  </div>

  <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_surname" class="form-label"><strong>Cognome</strong></label>
    </div>
    <input v-model="customerSurname"  type="text" class="form-control" name="user_surname" id="user_surname" placeholder="Inserisci Cognome" >
  </div>

  <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="phone" class="form-label"><strong>Numero di telefono</strong></label>
    </div>
    <input v-model="customerPhone"  type="text" class="form-control" name="phone" id="phone" placeholder="Numero di telefono" >
  </div>

  <div class="mb-3">
    <div class="d-flex gap-2">
    <i class="fa-solid fa-location-dot"></i>
    <label for="user_mail" class="form-label"><strong>Email</strong></label>
    </div>
    <input v-model="customerEmail"  type="email" class="form-control"  name="user_mail" id="user_mail" aria-describedby="emailHelp" placeholder="esempio@rossi.com" >
  </div>
           
  
<div class="mb-3 d-flex flex-column">
    <label for="exampleInputEmail1" class="form-label"><strong>Una nota per noi?</strong></label>
    <textarea v-model="customerComment" name="exampleInputEmail1" id="exampleInputEmail1" cols="50" rows="5" placeholder="Inserisci un commento o nota"></textarea>
</div>


</form>
<!--form end-->

 



 <!--carello inizio-->
 <div class="col-md-4 mb-5">
    <div class="cart">
        <h2 class="text-center fs-2 mb-5 pt-4 text-uppercase">Carrello</h2>

            <ul>
            <li v-for="(cartItem, index) in cart" :key="index" class="d-flex justify-content-between mb-4">
                <div class="d-flex flex-column">
                    <span>{{ cartItem.name }}</span>
                    <span class="price">€ {{ cartItem.price }}</span>
                </div>

                <div class="d-flex align-items-center">
                    <!--numero, piu e meno-->
                    <div class="d-flex gap-2 align-items-center" >
                    <i class="fa-solid fa-minus" @click="updateCartItem(index, false)"></i>
                    <span>{{ cartItem.quantity }}</span>
                    <i class="fa-solid fa-plus" @click="updateCartItem(index, true)"></i>
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
            <button id="submit-button" class="btn cart-btn">vai al pagamento</button>
            <!--<a :href="'/restaurant/' + restaurant.id + '/card'"  class="btn card-btn">vai alla card</a>-->
        </div>
    
    </div>

    
</div>
<!--carello fine-->

<!--box del pagamento-->
<div id="dropin-container"></div>


</div>
<!--fine container-->

<!-- Loader -->
<div v-if="loading" class="loader-box">
    <span class="loader"></span>
</div>

</template>


<style lang="scss" scoped>
i{
    color:#ebb45b;
    font-size: 20px;
}

.form-btn, .cart-btn{
    background-color:#ebb45b;
    color: white;
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

/* loader */
.loader-box {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.826);
    z-index: 9999;
}
.loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    width:70px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loader:after {
    content: "";
    position: absolute;
    inset: 0;
    padding: 3px 6px;
    border-top: 1px solid #bbb6aa;
    border-bottom: 2px solid #bbb6aa;
    background: linear-gradient(#eb6b3e 0 0) bottom no-repeat content-box,#e4e0d7;
    mix-blend-mode: darken;
    animation: l1 1.7s infinite linear;
}

.loader:before {
    content: "";
    position: absolute;
    inset: -30px calc(50% - 2px) 6px;
    background: #612329;
    transform-origin: bottom;
    transform: rotate(8deg);
}

@keyframes l1 {
    0%   {background-size: 100% 100%}
    100% {background-size: 100% 0%}
}
</style>
