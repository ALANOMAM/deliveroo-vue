<script>

import {store} from '../store.js'

export default {
    
    name:'PaymentStatus',

    data() {
        return {
            paymentStatus: {
                paymentSuccess: store.paymentSuccess,
                transactionId: null,
                errorMessage: null,
                customerEmail: null,
                customerPhone: null,
                customerAddress: null
            },

            store,

            loading: true,
        };
    },

    mounted() {
        // const paymentStatus = JSON.parse(localStorage.getItem('paymentStatus'));
        // if (paymentStatus) {
        //     this.paymentStatus = paymentStatus;
        // }

        this.loading = false;
    },

    // computed: {
    //     paymentSuccess() {
    //         return this.paymentStatus.paymentSuccess;
    //     },
    //     transactionId() {
    //         return this.paymentStatus.transactionId;
    //     },
    //     errorMessage() {
    //         return this.paymentStatus.errorMessage;
    //     },
    //     customerEmail() {
    //         return this.paymentStatus.customerEmail;
    //     },
    //     customerPhone() {
    //         return this.paymentStatus.customerPhone;
    //     },
    //     customerAddress() {
    //         return this.paymentStatus.customerAddress;
    //     }
    // }
};
</script>

<template>
<div class="payment-box">
    <!-- Loader -->
    <div v-if="loading" class="loader-box">
        <span class="loader"></span>
    </div>

    <div v-else>
        <div v-if="paymentStatus.paymentSuccess" class="d-flex flex-column align-items-center justify-content-center payment-success my-5">
            <i class="fa-solid fa-circle-check pb-2"></i>
            <div class="text-center my-5">
                <h1>Pagamento Avvenuto con Successo!</h1>
                <span>Una mail con i dati del tuo ordine è stata inoltrata al tuo indirizzo di posta</span>
            </div>
            <div class="payment-info my-4">
                <h3>Ordine N°: <span>{{ store.paymentDetails?.transactionId }}</span></h3>
                <h3>Email: <span>{{ store.paymentDetails?.email }}</span></h3>
                <h3>Tel: <span>{{ store.paymentDetails?.phone }}</span></h3>
                <h3>Indirizzo: <span>{{ store.paymentDetails?.address }}</span></h3>
            </div>
        </div>

        <div v-else class="d-flex flex-column align-items-center justify-content-center payment-failed my-5">
            <i class="fa-solid fa-circle-x pb-5"></i>
            <h1 class="text-center my-5">Pagamento Fallito</h1>
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.payment-box {
    height: calc(100vh - 456.5px);
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
    
    .payment-success {
        
        h1 {
            color: #1fae24;
            font-weight: 700;
        }

        span {
            font-size: 25px;
            font-weight: 700;
            color: #1fae24;
        }
    
        i {
            color: #1fae24;
            font-size: 90px;
        }
        
        .payment-info {
            h3 {
                font-size: 25px;
                text-transform: uppercase;
                color: #eb6b3e;
                
                span {
                    font-size: 20px;
                    color: black
                }
            }

        }
    }
    
    .payment-failed {
        
        h1 {
            color: #1fae24;
            font-weight: 700;
        }

        span {
            font-size: 25px;
            font-weight: 700;
            color: #1fae24;
        }
    
        i {
            color: #1fae24;
            font-size: 90px;
        }
    }
}
</style>