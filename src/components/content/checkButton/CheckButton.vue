<template>
  <div class="check-button" :class="{ check: isChencked }">
    <img src="@/assets/img/cart/cart.svg" alt="商品" />
  </div>
</template>

<script>
export default {
  props: {
    isChencked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.check-button {
  border-radius: 50%;
  border: 2px solid gray;
}
.check {
  border-color: red;

  background-color: red;
}
</style>