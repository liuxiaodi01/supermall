<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in cartList"
      :itemInfo="item"
      :key="index"
    ></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  components: { CartListItem },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
</style>