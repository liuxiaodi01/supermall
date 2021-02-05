<template>
  <div class="Cart">
    <!-- 导航 -->
    <navbar class="nav">
      <div slot="center" class="nav-text">购物车({{ leght }})</div>
    </navbar>
    <!-- 汇总 -->
    <scroll class="context" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottombar></cart-bottombar>
  </div>
</template>

<script>
import Navbar from "../../components/common/navbar/Navbar.vue";
import { mapGetters } from "vuex";
import CartList from "./childCart/CartList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import CartBottombar from "./childCart/CartBottombar.vue";

export default {
  components: { Navbar, CartList, Scroll, CartBottombar },
  name: "Cart",
  computed: {
    //2种
    /*   ...mapGetters([" cartList", "cartCount"]), */
    ...mapGetters({
      leght: "cartCount",
      cartList: "cartList",
    }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.nav {
  background-color: pink;
  color: white;
}
.Cart {
  height: 100vh;
}
.context {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>