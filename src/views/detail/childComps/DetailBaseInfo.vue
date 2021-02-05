<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="preferential-price">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[0].name }}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
    },
  },
};
</script>

<style>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #dde3e9;
  position: relative;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 24px;
  color: red;
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .preferential-price {
  font-size: 14px;
  background-color: red;
  color: white;
  border-radius: 5px 5px 5px 5px;
  padding: 2px;
  margin-left: 5px;
  margin-bottom: 15px;
  position: absolute;
}
.info-other {
  margin-top: 10px;
  font-size: 12px;
  text-align: center;

  display: flex;
  justify-content: flex-end;
}
.info-other span {
  margin: auto;
}
.info-service {
  font-size: 12px;
  color: #000;
  margin: 10px;
  display: flex;
  justify-content: flex-end;
}
.info-service span {
  margin: auto;
}
.info-service img {
  height: 12px;
  width: 12px;
}
</style>