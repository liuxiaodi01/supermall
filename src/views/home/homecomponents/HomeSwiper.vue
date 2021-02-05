<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "../../../components/common/swiper/Swiper.vue";
import SwiperItem from "../../../components/common/swiper/SwiperItem.vue";

export default {
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isccc: false,
    };
  },
  components: {
    SwiperItem,
    Swiper,
  },
  methods: {
    imageLoad() {
      if (!this.isccc) {
        this.$emit("imageLoad");
        this.isccc = true;
      }
    },
  },
};
</script>

<style>
</style>