<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-chencked="isSelect"
        @click.native="btnClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="">合计:{{ totalPirce }}</div>
    <div>去计算:{{ calulate }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  name: "CartBottombar",

  computed: {
    //合计 取2个小数点
    totalPirce() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.realPrice * item.count;
        }, 0)
        .toFixed(2);
      //试验 未成功
      /*   const cartList = this.$store.state.cartList;

      for (let item of cartList) {
        const a = 0;
        if (item.checked) {
          a += item.count * item.realPrice;
          return a;
        }
      }
      return a; */
    },
    //计算：
    calulate() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    //全选
    isSelect() {
      //第一种方案 使用filter
      /*  if (this.$store.state.cartList == 0) {
        return false;
      } else {
        return !this.$store.state.cartList.filter((item) => !item.checked)
          .length;
      } */
      //第二种 使用find函数
      if (this.$store.state.cartList == 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
      //第三种 普通函数遍历
      /*  if (this.$store.state.cartList == 0) return false;
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    }, */
    },
  },
  methods: {
    btnClick() {
      /* 全选 全不选 取反 提交 */
      /*  全选和全不选  */
      /*   if (this.isSelect) {
        for (let item of this.$store.state.cartList) {
          item.checked = false;
        }
      } else {
        for (let item of this.$store.state.cartList) {
          item.checked = true;
        }
      } */
      //高阶函数forEach
      if (this.isSelect) {
        //全部不选中
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        //全部选中
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
      //简化 但是这里并不能简化，会出问题
      /*    this.$store.state.cartList.forEach((item) => (item.checked = true)); */
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 44px;
  background-color: rgb(236, 232, 232);
  position: fixed;
  bottom: 50px;
  left: 0;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 20px;
  margin-right: 5px;
}
</style>