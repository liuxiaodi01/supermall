<template>
  <div>
    <navbar>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          class="titleItem"
          :class="{ Active: index == currentIndex }"
          @click="navbarClick(index)"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="" />
      </div>
    </navbar>
  </div>
</template>

<script>
import Navbar from "../../../components/common/navbar/Navbar.vue";
export default {
  name: "DetailNavbar",
  components: { Navbar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    navbarClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
}
.titleItem {
  flex: 1;
}
.Active {
  color: red;
}
.back {
  margin-top: 7px;
}
</style>