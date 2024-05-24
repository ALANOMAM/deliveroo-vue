<script>

export default {
    
    name:'PaymentStatus',

    data() {
        return {
            paymentStatus: {
                paymentSuccess: null,
                transactionId: null,
                errorMessage: null,
                customerEmail: null,
                customerPhone: null,
                customerAddress: null
            },

            loading: true,
        };
    },

    mounted() {
        const paymentStatus = JSON.parse(localStorage.getItem('paymentStatus'));
        if (paymentStatus) {
            this.paymentStatus = paymentStatus;
        }

        this.loading = false;
    },

    computed: {
        paymentSuccess() {
            return this.paymentStatus.paymentSuccess;
        },
        transactionId() {
            return this.paymentStatus.transactionId;
        },
        errorMessage() {
            return this.paymentStatus.errorMessage;
        },
        customerEmail() {
            return this.paymentStatus.customerEmail;
        },
        customerPhone() {
            return this.paymentStatus.customerPhone;
        },
        customerAddress() {
            return this.paymentStatus.customerAddress;
        }
    }
};
</script>

<template>
<div>
    <!-- Loader -->
    <div v-if="loading" class="loader-box">
        <span class="loader"></span>
    </div>

    <div v-else>
        <div v-if="paymentSuccess" class="d-flex flex-column align-items-center justify-content-center payment-success my-5">
            <h1 class="text-center my-5">Pagamento Avvenuto con Successo!</h1>
            <i class="fa-solid fa-circle-exclamation pb-5"></i>
            <div>
                <span>Ordine N°: {{ transactionId }}</span>
                <span>Email: {{ customerEmail }} </span>
                <span>Tel: {{ customerPhone }}</span>
                <span>Indirizzo: {{ customerAddress }}</span>
            </div>
        </div>

        <div v-else class="d-flex flex-column align-items-center justify-content-center payment-reject my-5">
            <h1 class="text-center my-5">Pagamento Fallito</h1>
            <i class="fa-solid fa-circle-exclamation pb-5"></i>
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
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

    i {
        color: #1fae24;
        font-size: 90px;
    }
}
</style>