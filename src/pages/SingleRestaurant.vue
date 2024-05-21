
<script>
import axios from 'axios';
import StorageApp from '../components/StorageApp.vue';

export default {
    name: 'SingleRestaurant',
    components:{
        StorageApp,
    },
    data() {
        return {
            restaurantId: null,
            restaurant: {},   
            baseApiUrl: 'http://127.0.0.1:8000/api',
            quantity: 1,
        }
    },

    mounted() {
    
        this.restaurantId = this.$route.params.id;
        
        axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`).then(res => {
            this.restaurant = res.data.restaurant;
        })
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
        }
    },
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

    <div class="page">
        <div class="container">
            
            <h2 class="text-center fs-2 my-4 text-uppercase">Menù</h2>

            <div class="dishes" v-for="dish in restaurant.dishes" :key="dish.id">
                <div class="dish" type="button" data-bs-toggle="modal" data-bs-target="#addDish">

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
                            <h2 class="text-center mb-4">{{ dish.dish_name }}</h2>
                            <span class="mb-5 fs-5 fw-bold">{{ dish.dish_price }} €</span>

                            <div class="counter">
                                <span class="minus" @click="decrement" :disabled="quantity === 1">-</span>
                                <span class="px-3 fs-3">{{ quantity }}</span>
                                <span class="plus" @click="increment">+</span>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button type="button" class="btn button">Aggiungi al carrello</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <StorageApp></StorageApp>
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
</style>
