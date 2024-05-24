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

            //var per validazione
            errors: {},
            isFormValid: false, 
            // errorMessage: '', // Messaggio di errore

            // isPaymentButtonDisabled: true,

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

        // Controlla la validità del form dopo ogni modifica del carrello
        this.checkFormValidity();
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

        // Controlla la validità del form dopo ogni modifica del carrello
        this.checkFormValidity();
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
                } catch (error) {

                    console.error('Error fetching token:', error);
                }
            },
        
    async makePayment(nonce) {

        

            // if (!this.isFormValid) {
            //     alert('Per favore, compila tutti i campi obbligatori.');
            //     return;
            // }

            this.errors = {};

            
            if (!this.customerName) {
                this.errors.customerName = 'Il campo nome è obbligatorio.'
            }

            if (!this.customerSurname) {
                this.errors.customerSurname = 'Il campo cognome è obbligatorio.'
            }

            if (!this.customerEmail) {
                this.errors.customerEmail = 'Il campo della mail è obbligatorio.'
            } else if (!this.validEmail(this.customerEmail)) {
                this.errors.customerEmail = 'Il campo email deve essere un indirizzo email valido.';
            }

            if (!this.customerPhone) {
                this.errors.customerPhone = 'Il campo telefono è obbligatorio.'
            }

            if (!this.customerAddress) {
                this.errors.customerAddress = 'Il campo indirizzo è obbligatorio.'
            }

            if (this.cart.length === 0) {
                this.errors.cart = 'Il carrello è obbligatorio.';
            }

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
            console.log(paymentData)

            try {
                const response = await axios.post(this.store.apiBaseUrl + '/payment', paymentData);

                if (response.data.success) {
                    alert('Payment successful! Transaction ID: ' + response.data.transaction_id);
                    // Esegui altre azioni dopo un pagamento riuscito
                } else {
                    alert('Payment failed: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error processing payment:', error);
            }finally{
                this.clearCart();
            }
    },

    // validateForm() {
    // //   controllo che i campi siano compilati
    //   const requiredFields = ['customerName', 'customerSurname', 'customerEmail', 'customerPhone', 'customerAddress' ];
    //   // controllo che non siano vuoti
    //   return requiredFields.every(field => this[field]); 

    // },

    clearCart() {
        this.cart = [];
        this.updateLocalStorage();
    },

    handlePaymentError(error) {
        this.errorMessage = error.message || 'Si è verificato un errore. Per favore, riprova.';
    },

    // // Metodo per controllare la validità del form
    // checkFormValidity() {
    //     this.isFormValid = Object.keys(this.errors).length === 0;
    // },

    // // Metodo per resettare gli errori del form
    // resetFormErrors() {
    //     this.errors = {};
    // },

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
},





}

</script>

<template>

<div class="header-checkout pt-5">

    <div class="w-100 m-auto position-relative">
        <h2 class="fs-2 pt-4 text-center text-uppercase text-black">Checkout</h2> 

        <!-- Immagine a destra -->
        <div class="img-bowl">
            <img src="/img/bowl-jumbo.png" alt="Bowl Jumbo">
        </div>
    </div>

</div>

<!--inizio container-->
<div class="container d-flex gap-4 mt-5 pb-5">

    <!--form start-->   
    <form class="col-md-6 form" @submit.prevent="makePayment">

        <h2 class="text-center fs-4 mb-4 pt-4 text-uppercase">Dati personali</h2>

        <div class="mb-3">
            <div class="d-flex gap-2">
                <i class="fa-solid fa-truck-fast"></i>
            <label for="user_address" class="form-label"><strong>Indirizzo Consegna</strong></label>
            </div>
            <input  v-model="customerAddress" type="text" class="form-control" name="user_address" id="user_address" placeholder="Inserisci Indirizzo">
            <div v-if="errors.customerAddress" class="text-danger">{{ errors.customerAddress }}</div>
        </div>

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-solid fa-person"></i>
            <label for="user_name" class="form-label"><strong>Nome</strong></label>
            </div>
            <input v-model="customerName"  type="text" class="form-control" name="user_name" id="user_name" placeholder="Inserisci Nome">
            <div v-if="errors.customerName" class="text-danger">{{ errors.customerName }}</div>
        </div>

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-solid fa-person"></i>
            <label for="user_surname" class="form-label"><strong>Cognome</strong></label>
            </div>
            <input v-model="customerSurname"  type="text" class="form-control" name="user_surname" id="user_surname" placeholder="Inserisci Cognome">
            <div v-if="errors.customerSurname" class="text-danger">{{ errors.customerSurname }}</div>
        </div>

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-solid fa-phone"></i>
            <label for="phone" class="form-label"><strong>Numero di telefono</strong></label>
            </div>
            <input v-model="customerPhone"  type="text" class="form-control" name="phone" id="phone" placeholder="Numero di telefono">
            <div v-if="errors.customerPhone" class="text-danger">{{ errors.customerPhone }}</div>
        </div>

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-sharp fa-solid fa-envelope"></i>
            <label for="user_mail" class="form-label"><strong>Email</strong></label>
            </div>
            <input v-model="customerEmail"  type="email" class="form-control"  name="user_mail" id="user_mail" aria-describedby="emailHelp" placeholder="esempio@rossi.com">
            <div v-if="errors.customerEmail" class="text-danger">{{ errors.customerEmail }}</div>
        </div>
            
    
        <div class="mb-3 d-flex flex-column">
            <div class="d-flex gap-2">
                <i class="fa-solid fa-pen"></i>
            <label for="exampleInputEmail1" class="form-label"><strong>Una nota per noi?</strong></label>
            </div>
            <textarea class="p-2" v-model="customerComment" name="exampleInputEmail1" id="exampleInputEmail1" cols="50" rows="5" placeholder="Inserisci un commento o nota"></textarea>
        </div>



    </form>
    <!--form end-->


    <!--carello inizio-->
    <div class="col-md-6 mb-5">

        <div class="cart">

            <div>

                <h2 class="text-center fs-4 mb-5 pt-4 text-uppercase">Riepilogo ordine</h2>

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

            </div>

            <div>
                <!--box del pagamento-->
                <div>
                    <div class="box-payment" id="dropin-container"></div>
                </div>
                

                <!-- Bottone che porta alla pagina del carrello -->
                <div class="d-flex justify-content-center">

                    <button id="submit-button" class="btn pay-button" >Effettua PAGAmento</button>
                                        
                    <!--<a :href="'/restaurant/' + restaurant.id + '/card'"  class="btn card-btn">vai alla card</a>-->
                </div>

            </div>


        </div>

    </div>
    <!--carello fine-->




</div>
<!--fine container-->

</template>


<style lang="scss" scoped>

.header-checkout {
    width: 100%;
    height: 220px;
    background: rgb(255,138,0);
    background: linear-gradient(0deg, rgba(255,138,0,1) 0%, rgba(255,174,0,1) 58%);
    overflow: hidden;

    .img-bowl {

        position: absolute;
        right: 350px;
        bottom: -180px;

        img {
            width: 250px;
            height: auto;
            filter: drop-shadow(-100px 0px 40px rgba(0, 0, 0, 0.5));
            
        }

    }

}

form {
    min-height: 850px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

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

.pay-button,
.form-btn {

    margin-top: 10px;
    padding: 10px 20px;

    text-transform: uppercase;
    font-size: bold;
    font-weight: 16px;
    
    background-color: rgba(246, 89, 0, 1);
    color: white;

    &:hover {
        background-color: transparent;
        color: rgba(246, 89, 0, 1);
        border: 1px solid rgba(246, 89, 0, 1);
    }
}

.box-payment {
    padding-top: 20px;

}

</style>
