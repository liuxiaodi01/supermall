<template>
  <div class="goods">
    <goodslist-item
      v-for="(item, index) in goods"
      :goodsItem="item"
      :key="index"
    />
  </div>
</template>

<script>
import GoodslistItem from "./GoodslistItem.vue";
export default {
  name: "GoodsList",
  components: { GoodslistItem },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>

