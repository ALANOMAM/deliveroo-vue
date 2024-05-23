<script>
import axios from 'axios';
import {store} from '../store.js';

export default {
    
    name:'PaymentStatus',

    data() {
        return {
            loading: true,
            paymentSuccess: null,
            transactionId: null,
            errorMessage: ''
        };
    },

    mounted() {
        this.processPayment();
    },

    methods: {
        processPayment() {
            this.paymentSuccess = this.$route.params.paymentSuccess;
            this.transactionId = this.$route.params.transactionId;
            this.errorMessage = this.$route.params.errorMessage;
            this.loading = false;
        }
    },
};
</script>

<template>
<div>
    <div v-if="loading" class="loader">Processing payment...</div>

    <div v-else>
        <div v-if="paymentSuccess">
            <h2>Payment successful!</h2>
            <p>Transaction ID: {{ transactionId }}</p>
        </div>

        <div v-else>
            <h2>Payment failed</h2>
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  font-size: 1.5rem;
  color: #000;
}
</style>