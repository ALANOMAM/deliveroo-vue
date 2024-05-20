<script>

import axios from 'axios';

export default {
    name: 'SingleRestaurant',
    data() {
        return {
            restaurantId: null,
            restaurant: {},   
            baseApiUrl: 'http://127.0.0.1:8000/api',
        }
    },

    mounted() {
    
        this.restaurantId = this.$route.params.id;
        
        axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`)
            .then(res => {
                this.restaurant = res.data.restaurant;
                console.log(this.restaurant)
            })
           
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

                    <div class="category list-group-item d-flex mt-3 gap-1">
                        <span v-for="category in restaurant.categories" :key="category.id" class="badge rounded-pill">
                            {{ category.category_name }}
                        </span>
                    </div>

                    <p class="mt-3">{{ restaurant.description }}</p>
                </div>

                <div class="contacts d-flex flex-column gap-2">
                    <span><i class="fa-solid fa-phone me-2"></i> <a href="tel:{{ restaurant.phone }}" class="text-decoration-none">{{ restaurant.phone }}</a></span>
                    <span><i class="fa-solid fa-location-dot me-2 mb-3"></i> <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(restaurant.address)" target="_blank" class="text-decoration-none">{{ restaurant.address }}</a>.</span>
                    <span>VAT: {{ restaurant.vat }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="page">

    </div>
</template>

<style lang="scss" scoped>
.header-page {
    background-color: #202020;
    cursor: default;
    
    .restaurant {
        margin: 0 150px;
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #A0A0A0;

        .image-box .image img {
            width: 300px;
            border-radius: 8%;
        }

        .info {
            padding-left: 20px;

            .category span{
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

            span {
                font-size: 13px;
                transition: 0.2s;
                &:hover {
                    transform: scale(115%);
                }

                a {
                    color: #A0A0A0;
                }
            }
            
        }
    }
}
</style>
