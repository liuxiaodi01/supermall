<template>
  <div class="detail-goods">
    <detail-goods-item
      v-for="(item, index) in recommend"
      :goods="item"
    ></detail-goods-item>
  </div>
</template>

<script>
import DetailGoodsItem from "./DetailGoodsItem.vue";
export default {
  components: { DetailGoodsItem },
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>