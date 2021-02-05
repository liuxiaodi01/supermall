<template>
  <div class="rate" v-if="Object.keys(rate).length !== 0">
    <div class="rate-item">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="user">
      <img :src="rate[0].user.avatar" alt="" />
      <span>{{ rate[0].user.uname }}</span>
    </div>
    <div class="style">
      <p>
        <span> {{ rate[0].content }}</span>
      </p>
      <div>
        <span>{{ rate[0].created | showDate }}</span>
        <span>{{ rate[0].style }}</span>
      </div>
    </div>
    <div class="list-img">
      <img
        v-for="(img, index) in rate[0].images"
        :src="img"
        alt=""
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../common/utils";
export default {
  props: {
    rate: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    showDate(value) {
      //1.将时间戳转成date对象
      const date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.rate {
  padding: 20px;
  border-bottom: 5px solid gray;
}
.rate-item {
  display: flex;
  justify-content: flex-end;
}
.rate-item span {
  margin: auto;
}
.user {
  display: flex;
  align-items: center;
  padding: 5px;
}
.user img {
  width: 40px;
  height: 40px;
}
.style {
  color: gray;
  font-size: 13px;
  width: 90%;
}
.style p,
span {
  margin: 5px;
}
.list-img img {
  width: 40px;
  height: 40px;
}
</style>