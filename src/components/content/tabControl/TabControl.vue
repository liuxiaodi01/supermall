<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in title"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="tabClick(index)"
      :key="index"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control span {
  padding: 5px;
}

.active {
  color: red;
}
.active span {
  border-bottom: red 3px solid;
}
</style>