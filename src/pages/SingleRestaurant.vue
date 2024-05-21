<script>
import axios from 'axios';


export default {
    name: 'SingleRestaurant',
    components:{
       
    },
    data() {
        return {
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
    <div class="header-page">
        <div class="container">
            <div class="restaurant">
                <div class="image-box">
                    <div class="image" v-if="restaurant.image === null">
                        <img  src="/img/restaurant_placeholder.jpg" class="card-img-top" alt="...">
                    </div>
                    <div class="image" v-else-if="restaurant && restaurant.image && restaurant.image.startsWith('images/')">
                        <img  :src="'http://localhost:8000/storage/' + restaurant.image" class="card-img-top" alt="...">
                    </div>
                    <div class="image" v-else>
                        <img :src="restaurant.image" class="card-img-top" alt="...">
                    </div>
                </div>

                <div class="info">
                    <h2 class="fs-3">{{ restaurant.restaurant_name }}</h2>

                    <div class="category list-group-item d-flex mt-3 gap-1 flex-wrap w-75">
                        <span v-for="category in restaurant.categories" :key="category.id" class="badge rounded-pill">
                            {{ category.category_name }}
                        </span>
                    </div>

                    <p class="mt-3">{{ restaurant.description }}</p>
                </div>

                <div class="contacts d-flex flex-column gap-2">
                    <span class="phone"><i class="fa-solid fa-phone me-2"></i> <a href="tel:{{ restaurant.phone }}" class="text-decoration-none">{{ restaurant.phone }}</a></span>
                    <span class="address"><i class="fa-solid fa-location-dot me-2 mb-3"></i> <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(restaurant.address)" target="_blank" class="text-decoration-none">{{ restaurant.address }}</a>.</span>
                    <span class="vat">VAT: {{ restaurant.vat }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="page py-5">
        <div class="container">

            <div class="row">

                <div class="col-md-8">

                    <h2 class="text-center fs-2 my-4 text-uppercase">Menù</h2>

                    <div class="dishes" v-for="dish in restaurant.dishes" :key="dish.id">
                        <div class="dish" type="button" data-bs-toggle="modal" data-bs-target="#addDish" @click="openModal(dish)">

                            <!-- Immagine Piatto -->
                            <div class="img-dish d-flex align-items-center">
                                <div class="image me-2">
                                    <img :src="getImageUrl(dish.dish_image)" :alt="dish.dish_name"/>
                                </div>
                            </div>

                            <div class="info-dish d-flex flex-column justify-content-center">
                                <!-- Nome piatto -->
                                <div class="title-dish">
                                    <div class="fw-bold"> {{ dish.dish_name }} </div>
                                </div>
            
                                <!-- Prezzo piatto -->
                                <div class="price-dish">
                                    <div class="fw-normal"> {{ dish.dish_price }} € </div>
                                </div>
            
                                <!-- Ingredienti piatto -->
                                <div class="ingedients-dish">
                                    <div class="fw-normal"> {{ dish.ingredients || 'Nessun Ingrediente inserito' }} </div>
                                </div>

                            </div>
                        </div>
                        <hr>

                        <!-- Modal -->
                        <div class="modal fade" id="addDish" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content py-2 px-5">
                                    <div class="modal-body d-flex flex-column align-items-center">
                                        <h2 class="text-center mb-4">{{ currentDish ? currentDish.dish_name : '' }}</h2>
                                        <span class="mb-5 fs-5 fw-bold">{{ currentDish ? currentDish.dish_price * quantity : '' }} €</span>

                                        <div class="counter">
                                            <span class="minus" @click="decrement" :disabled="quantity === 1">-</span>
                                            <span class="px-3 fs-3">{{ quantity }}</span>
                                            <span class="plus" @click="increment">+</span>
                                        </div>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-center">
                                        <button type="button" class="btn button" @click="addToCart" data-bs-dismiss="modal">Aggiungi al carrello</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>

                <!--carello inizio-->
                <div class="col-md-4">
                    <div class="cart">
                        <h2 class="text-center fs-2 mb-5 pt-4 text-uppercase">Carrello</h2>
                        <ul>
                            <li v-for="(cartItem, index) in cart" :key="index" class="d-flex justify-content-between mb-4">
                                <div class="d-flex flex-column">
                                    <span>{{ cartItem.name }}</span>
                                    <span class="price">€ {{ cartItem.price }}</span>
                                </div>

                                <div>
                                    <span>{{ cartItem.quantity }}</span>
                                    <span @click="removeFromCart(index)" class="remove-item"><i class="fa-solid fa-x ms-4 me-2"></i></span>
                                </div>
                            </li>
                        </ul>
                        
                        <hr class="mx-4">

                        <div class="d-flex justify-content-between align-items-center mx-4">
                            <h2 class="fs-4 ms-2">Totale</h2>

                            <span class="fs-3 me-1">{{ totalPrice }} €</span>
                        </div>
                    </div>
                </div>
                <!--carello fine-->

            </div>
            
        </div>
    </div>




</template>

<style lang="scss" scoped>
.header-page {
    background-color: #202020;
    cursor: default;
    
    .restaurant {
        margin: 0 90px;
        padding: 15px 0;
        display: flex;
        align-items: center;
        color: #A0A0A0;

        .image-box .image img {
            width: 300px;
            border-radius: 8%;
        }

        .info {
            padding:0 50px;

            .category span {
                font-size: 11px;
                color: #403f3f;
                background: linear-gradient(to right, #ebb45b 0%, #c68434 100%);
                box-shadow: 0px 1px 6px rgba(242, 173, 60, 0.5);
            }

            p {
                max-width: 350px;
                font-size: 14px;
            }
        }

        .contacts {
            padding-left: 50px;

            .phone, .address {
                font-size: 13px;
                transition: 0.2s;
                &:hover {
                    transform: scale(115%);
                }

                a {
                    color: #A0A0A0;
                }
            }

            .vat {
                font-size: 13px;
            }
            
        }
    }
}

.page {
    .dish {
        display: flex;

        .image img {
            width: 110px;
            height: 65px;
            border-radius: 8px;
        }
    }
}

.modal {
    .counter {
        .minus, .plus {
            font-size: 25px;
            padding: 10px;
            cursor: pointer;
        }

        input {
            border: none;
        }
    }

    .button {
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
