<script>
import axios from 'axios';
import {store} from '../store.js'

export default {

    name: 'CardPage',

    data() {

        return {
            store,
            restaurantId: null,
            restaurant: {},
            baseApiUrl: 'http://127.0.0.1:8000/api',
            quantity: 1,
            currentDish: null,
            customerInfo: {},
            customerAddress: '',
            customerName: '',
            customerEmail: '',
            customerComment: '',
            customerSurname: '',
            customerPhone: '',
            cart: [],
            loading: false,

            // Per errori di validazione
            errors: {},

            // istanza di Braintree Drop-in
            dropinInstance: null,
        };
    },

    created() {
        // Caricamento del carrello quando il componente viene creato
        this.restaurantId = this.$route.params.id;
        this.loadCart();

    },

    mounted() {

        // Inizio Braintree Drop-in quando il componente viene montato
        this.restaurantId = this.$route.params.id;

        // Carica i dati del ristorante
        axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`).then(res => {
            this.restaurant = res.data.restaurant;
        });

        // Inizializzazione Braintree Drop-in
        braintree.dropin.create({
            authorization: 'sandbox_38ccykrv_y58kr6st43mn4zfc',
            selector: '#dropin-container'
        }, (err, instance) => {
            if (err) {
                console.error(err);
                return;
            }

            // Salva l'istanza di Braintree Drop-in
            this.dropinInstance = instance;
        });

    },

    computed: {

        // Calcolo il prezzo totale del carrello
        totalPrice() {
            return this.cart.reduce((total, item) => total + item.price, 0);
        }

    },

    methods: {

        // Metodi per manipolare il carrello e processare il pagamento

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

        // Metodo per caricare il carrello salvato in locale
        loadCart() {
            const savedCart = localStorage.getItem('cart_' + this.restaurantId);
            this.cart = savedCart ? JSON.parse(savedCart) : [];
        },

        // Metodo per aggiungere un articolo al carrello
        addToCart() {

            const cartItem = {
                name: this.currentDish.dish_name,
                quantity: this.quantity,
                price: this.currentDish.dish_price * this.quantity,
                id: this.currentDish.id,
            };

            const existingItemIndex = this.cart.findIndex(item => item.name === cartItem.name);

            if (existingItemIndex !== -1) {
                this.cart[existingItemIndex].quantity += this.quantity;
                this.cart[existingItemIndex].price += cartItem.price;
            } else {
                this.cart.push(cartItem);
            }
            this.updateLocalStorage();
        },

        // Metodo per rimuovere un articolo dal carrello
        removeFromCart(index) {
            this.cart.splice(index, 1);
            this.updateLocalStorage();
        },

        // Metodo per aggiornare il carrello nel localStorage
        updateLocalStorage() {
            localStorage.setItem('cart_' + this.restaurantId, JSON.stringify(this.cart));
        },

        // Metodo per aggiornare la quantità di un articolo nel carrello
        updateCartItem(index, increment) {
            if (increment) {
                this.cart[index].quantity++;
            } else if (this.cart[index].quantity > 1) {
                this.cart[index].quantity--;
            } else {
                return;
            }
            this.cart[index].price = this.cart[index].quantity * (this.cart[index].price / (this.cart[index].quantity + (increment ? -1 : 1)));
            this.updateLocalStorage();
        },

        // Metodo per validare form e modulo di pagamento
        validateForm() {

            this.errors = {};

            if (!this.customerName) {
                this.errors.customer_name = ['Il campo nome è obbligatorio.'];
            }

            if (!this.customerSurname) {
                this.errors.customer_surname = ['Il campo cognome è obbligatorio.'];
            }

            if (!this.customerEmail) {
                this.errors.customer_email = ['Il campo email è obbligatorio.'];
            } else {

                // Controllo del formato dell'email usando un'espressione regolare
                const emailPattern = /^[A-Za-z0-9._-']+@[A-Za-z._-]+\.[A-Za-z]{2,}$/;

                if (!emailPattern.test(this.customerEmail)) {
                    this.errors.customer_email = ['Inserisci una email valida, come justbool@example.com'];
                }
            } 

            if (!this.customerPhone) {

                this.errors.customer_phone = ['Il campo telefono è obbligatorio.'];

            } else {

                // Controllo se il telefono corrisponde al formato desiderato 
                const phonePattern = /^\+39\s?[0-9]*$/;

                if (!phonePattern.test(this.customerPhone)) {
                    this.errors.customer_phone = ['Inserisci un numero di telefono valido (es. +393123456789). Deve iniziare con +39'];
                }

                // Controllo della lunghezza del telefono
                if (this.customerPhone.length < 13 || this.customerPhone.length > 20) {
                    this.errors.customer_phone = ['Il campo telefono deve essere compreso tra 13 e 20 caratteri.'];
                }
            }

            if (!this.customerAddress) {
                this.errors.customer_address = ['Il campo indirizzo è obbligatorio.'];

            } else {
                // Controllo se l'indirizzo è nel formato desiderato usando un'espressione regolare
                const addressPattern = /^[a-zA-Z\s]+\s*,\s*[0-9]+[a-zA-Z]?\s*,\s*[a-zA-Z\s]+$/;
                if (!addressPattern.test(this.customerAddress)) {
                    this.errors.customer_address = ["L'indirizzo deve essere nel formato: via/piazza nome, numero civico, città"];
                }
            }

            if (!this.cart || this.cart.length === 0) {
                this.errors.cart = ['Il carrello è obbligatorio.'];
            }

            return Object.keys(this.errors).length === 0;
        },

        // Metodo per elaborare il pagamento
        async makePayment() {

            // Validazione del modulo di pagamento
            if (!this.validateForm()) {
                // Esce se la validazione fallisce
                return;
            }

            // Imposta lo stato di caricamento a true
            this.loading = true;
            // Resetta gli errori
            this.errors = {};

            try {

                // Richiesta del metodo di pagamento a Braintree Drop-in
                const payload = await this.requestPaymentMethod();
                if (!payload) {

                    // Lancia un errore se la richiesta del metodo di pagamento fallisce
                    throw new Error('Richiesta del metodo di pagamento fallita');
                }

                // Dati del pagamento
                const paymentData = {
                    customer_name: this.customerName,
                    customer_surname: this.customerSurname,
                    customer_email: this.customerEmail,
                    customer_phone: this.customerPhone,
                    customer_address: this.customerAddress,
                    message: this.customerComment,
                    cart: this.cart,
                    totalPrice: this.totalPrice,
                    nonce: payload.nonce
                };

                // Invio dati del pagamento al backend
                const response = await axios.post(this.store.apiBaseUrl + '/payment', paymentData);

                // Gestione della risposta dal backend
                const paymentStatus = {
                    paymentSuccess: response.data.success,
                    transactionId: response.data.transaction_id || null,
                    errorMessage: response.data.message || null,
                    customerEmail: this.customerEmail,
                    customerPhone: this.customerPhone,
                    customerAddress: this.customerAddress
                };

                // Salva lo stato del pagamento nel localStorage
                localStorage.setItem('paymentStatus', JSON.stringify(paymentStatus));

                if (response.data.success) {
                    // Reindirizza alla pagina di stato del pagamento se il pagamento ha successo
                    this.$router.push({ name: 'payment-status' });
                    // Svuota il carrello
                    this.clearCart();

                } else {
                    // Log dell'eventuale messaggio di errore dal backend
                    console.error(response.data.message);
                }

                // Svuota il carrello
                this.clearCart();

            } catch (error) {

                // Gestione degli errori durante il pagamento
                if (error.response && error.response.status === 422) {
                    // Aggiorna gli errori con quelli dal backend
                    this.errors = error.response.data.errors;

                } else {
                    console.error('Error processing payment:', error);
                    const paymentStatus = { paymentSuccess: false, errorMessage: 'Il pagamento non è andato a buon fine, riprova' };

                    // Salva lo stato del pagamento nel localStorage
                    localStorage.setItem('paymentStatus', JSON.stringify(paymentStatus));

                    // Reindirizza alla pagina di stato del pagamento
                    this.$router.push({ name: 'payment-status' });
                }

            } finally {
                this.loading = false;
            }
        },

        // Metodo per richiedere il metodo di pagamento a Braintree Drop-in
        async requestPaymentMethod() {
            return new Promise((resolve, reject) => {
                this.dropinInstance.requestPaymentMethod((err, payload) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(payload);
                    }
                });
            });
        },

        // Metodo per pulire il carrello
        clearCart() {
            this.cart = [];
            this.updateLocalStorage();
        },
    },

    watch: {
        $route(to, from) {
            this.updateLocalStorage();
            this.restaurantId = to.params.id;
            this.loadCart();
            axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`).then(res => {
                this.restaurant = res.data.restaurant;
            });
        }
    }
};

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
<div class="container d-flex justify-content-between gap-4 mt-5 pb-5">

        <!--RIEPILOGO ORDINE CON METODO DI PAGAMENTO-->

        <div class="col-md-5 mb-5">

            <div class="cart bg-transparent">

                <!--RIEPILOGO ORDINE -->

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

                    <!-- PREZZO TOTALE ORDINE -->

                    <div class="d-flex justify-content-between align-items-center mx-4">
                        <h2 class="fs-4 ms-2">Totale</h2>

                        <span class="fs-3 me-1">{{ totalPrice }} €</span>
                    </div>

                </div>

                <!-- METODO DI PAGAMENTO -->

                <div>
                    <h2 class="text-center fs-4 mt-4 pt-4 text-uppercase">MEDOTO DI PAGAMENTO</h2>
                    
                    <!--box del pagamento-->
                    <div class="box-payment" id="dropin-container"></div>

                </div>


            </div>

        </div>

    <!--CONTACT FORM CON DATI PERSONALI-->   
    <form class="col-md-6 form" @submit.prevent="makePayment">

        <h2 class="text-center fs-4 mb-4 pt-4 text-uppercase">Dati personali</h2>

        <!--INDIRIZZO CONSEGNA-->

        <div class="mb-3">
            <div class="d-flex gap-2">
                <i class="fa-solid fa-truck-fast"></i>
            <label for="user_address" class="form-label"><strong>Indirizzo Consegna</strong></label>
            </div>
            <input  v-model="customerAddress" type="text" class="form-control" name="user_address" id="user_address" placeholder="Inserisci Indirizzo" pattern="^[a-zA-Z\s]+\s*,\s*[0-9]+[a-zA-Z]?\s*,\s*[a-zA-Z\s]+$" title="L'indirizzo deve essere nel formato: via/piazza nome, numero civico, città" required>
            <div v-if="errors.customer_address" class="text-danger">{{ errors.customer_address[0] }}</div>
        </div>

        <!--NOME UTENTE-->

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-solid fa-person"></i>
            <label for="user_name" class="form-label"><strong>Nome</strong></label>
            </div>
            <input v-model="customerName"  type="text" class="form-control" name="user_name" id="user_name" placeholder="Inserisci Nome" required>
            <div v-if="errors.customer_name" class="text-danger">{{ errors.customer_name[0] }}</div>

        </div>

        <!--COGNOME UTENTE-->

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-solid fa-person"></i>
            <label for="user_surname" class="form-label"><strong>Cognome</strong></label>
            </div>
            <input v-model="customerSurname"  type="text" class="form-control" name="user_surname" id="user_surname" placeholder="Inserisci Cognome" required>
            <div v-if="errors.customer_surname" class="text-danger">{{ errors.customer_surname[0] }}</div>

        </div>

        <!--TELEFONO UTENTE-->

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-solid fa-phone"></i>
            <label for="phone" class="form-label"><strong>Numero di telefono</strong></label>
            </div>
            <input v-model="customerPhone"  type="text" class="form-control" name="phone" id="phone" placeholder="Numero di telefono" pattern="\+39\s?[0-9]*" minlength="13" maxlength="20" title="Inserisci un numero di telefono valido (es. +393123456789). Deve iniziare con +39" required>
            <div v-if="errors.customer_phone" class="text-danger">{{ errors.customer_phone[0] }}</div>

        </div>

        <!--EMAIL UTENTE-->

        <div class="mb-3">
            <div class="d-flex gap-2">
            <i class="fa-sharp fa-solid fa-envelope"></i>
            <label for="user_mail" class="form-label"><strong>Email</strong></label>
            </div>
            <input v-model="customerEmail"  type="email" class="form-control"  name="user_mail" id="user_mail" aria-describedby="emailHelp" placeholder="justbool@example.com" pattern="^[A-Za-z0-9._-']+@[A-Za-z._-]+\.[A-Za-z]{2,}$" required title="Inserisci una email valida, come justbool@example.com">
            <div v-if="errors.customer_email" class="text-danger">{{ errors.customer_email[0] }}</div>
        </div>
        
        <!--MESSAGGIO UTENTE-->
    
        <div class="mb-3 d-flex flex-column">
            <div class="d-flex gap-2">
                <i class="fa-solid fa-pen"></i>
            <label for="exampleInputEmail1" class="form-label"><strong>Una nota per noi?</strong></label>
            </div>
            <textarea class="p-2" v-model="customerComment" name="exampleInputEmail1" id="exampleInputEmail1" cols="50" rows="5" placeholder="Inserisci un commento o nota"></textarea>
            <span style="color:gray">Opzionale</span>
        </div>


        <!-- BOTTONE PER PAGAMENTO -->

        <div class="d-flex justify-content-center">

            <button id="submit-button" class="btn pay-button" @click="requestPaymentMethod()">Effettua PAGAmento</button>

        </div>


    </form>
    

</div>


<!-- LOADEAR -->
<div v-if="loading" class="loader-box">
    <span class="loader"></span>
</div>

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

.pay-button {

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
