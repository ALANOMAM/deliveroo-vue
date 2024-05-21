<template>
    <div>
      <h1>Carrello</h1>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.name }} - {{ item.quantity }}
          <button @click="removeFromCart(index)">Rimuovi</button>
        </li>
      </ul>
      <button @click="addToCart({ name: 'Prodotto 1', quantity: 1 })">Aggiungi Prodotto 1</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cart: this.localStorage.get('cart', [])
      };
    },
    methods: {
      addToCart(item) {
        this.cart.push(item);
        this.updateLocalStorage();
      },
      removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateLocalStorage();
      },
      updateLocalStorage() {
        this.localStorage.set('cart', this.cart);
      }
    }
  };
  </script>
