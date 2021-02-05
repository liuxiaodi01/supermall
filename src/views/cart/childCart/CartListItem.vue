<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button
        :is-chencked="itemInfo.checked"
        @click.native="checkClick"
      ></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgURL" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ itemInfo.realPrice }}</div>
        <div class="item-price right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  props: {
    itemInfo: {
      type: Object,
    },
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  border-bottom: 1px solid rgb(180, 176, 176);
}
.item-img {
  padding: 4px;
}
.item-img img {
  width: 60px;
  height: 90px;
  border-radius: 5px 5px 5px 5px;
}
.item-info {
  text-align: center;
  overflow: hidden;
}
.item-info div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.item-title {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #000;
}
.item-desc {
  margin-top: 15px;
  font-size: 5px;
  font-weight: 700;
}
.info-bottom {
  margin: 20px 5px;
}
.left {
  color: red;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>