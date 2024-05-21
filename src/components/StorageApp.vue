<template>

  <div>

    <h2 class="text-center fs-2 my-4 text-uppercase">Carrello</h2>

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
      cart: []
    };
  },

  created() {
    this.loadCart();
  },

  methods: {

    loadCart() {
      const savedCart = localStorage.getItem('cart');
      this.cart = savedCart ? JSON.parse(savedCart) : [];
    },

    addToCart(item) {
      this.cart.push(item);
      this.updateLocalStorage();
    },

    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateLocalStorage();
    },

    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

  }

};
</script>


<style lang="scss" scoped>

h1 {
  color: #F17228;
}

</style>