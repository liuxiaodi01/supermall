<template>
  <div class="goods">
    <div class="goods-item">
      <img :src="goods.image" alt="" @load="imageLoad" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemLoad");
    },
  },
};
</script>

<style scoped>
.goods {
  width: 48%;
}
.goods img {
  width: 100%;
  border-radius: 5px;
}
</style>