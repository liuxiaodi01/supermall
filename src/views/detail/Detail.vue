<template>
  <div id="detail">
    <detail-navbar
      class="detail-nav"
      @tabClick="tabClick"
      ref="nav"
    ></detail-navbar>
    <scroll class="content" ref="scroll" @scroll="contentSrocll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-size :itemParams="itemParams" ref="params"></detail-size>
      <detail-rate :rate="rate" ref="comment"></detail-rate>
      <detail-goods :recommend="recommend" ref="recommend"></detail-goods>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll.vue";
import {
  getDetail,
  getRecommend,
  goods,
  goodsShop,
  itemParams,
  recommend,
} from "../../network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailNavbar from "./childComps/DetailNavbar.vue";
import DetailRate from "./childComps/DetailRate.vue";
import DetailShop from "./childComps/DetailShop.vue";
import DetailSize from "./childComps/DetailSize.vue";
import DetailSwiper from "./childComps/detailSwiper.vue";
import { itemListenerMixin, backtopMixin } from "../../common/mixin";
import DetailGoods from "./childComps/DetailGoods.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
/* mixin抽离 */
import BackTop from "../../components/content/backTop/BackTop.vue";
//映射
import { mapActions } from "vuex";

export default {
  name: "Detail",

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      rate: [],
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: "",
      show: "",
    };
  },
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailSize,
    DetailRate,
    DetailGoods,
    DetailBottomBar,
    BackTop,
  },
  mixins: [itemListenerMixin, backtopMixin],

  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      /* console.log(data); */
      this.topImages = data.itemInfo.topImages;
      this.goods = new goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new goodsShop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = new itemParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      this.rate = data.rate.list;
    });
    //值不对
    /*  this.$nextTick(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    }); */
    //请求推荐页信息
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });
    this.getThemeTopY = this.debounce((res) => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      console.log(this.themeTopYs);
    });
  },

  methods: {
    //映射 需要导入才行
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    debounce(func, delay = 200) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    tabClick(index) {
      console.log(index);

      /* console.log(this.getThemeTopY); */
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    //设置列表滚动到位置展示列表
    contentSrocll(position) {
      const contentY = -position.y;
      /*  console.log(contentY); */
      //contentY 在0到2586之间 index= 0
      //contentY 在2586到3610之间 index=1
      //contentY 在3610到3762之间 index=2
      //contentY 超过3610 index=3
      let length = this.themeTopYs.length;
      /*   for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            contentY >= this.themeTopYs[i] &&
            contentY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && contentY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      } */
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          contentY > +this.themeTopYs[i] &&
          contentY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //判断backTop的显示和隐藏 false 和true
      this.isShow = contentY > 1000;
    },
    /*   backTop() {
      //返回顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    }, */
    addToCart() {
      //获取购物车需要展示的信息商品的信息
      const product = {};
      // 2.对象信息
      product.iid = this.iid;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice;
      // 3.将商品添加到购物车中 使用vuex
      //映射addCart 和下面的this.$store.dispatch做一样的操作
      this.addCart(product).then((res) => {
        /*  console.log(res);
        this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1000); */
        console.log(res);
        this.$toast.show(res, 2000);
      });
      //将store里异步actions传来这里，
      /*  this.$store.dispatch("addCart", product).then((res) => {
        console.log(res);
      }); */
    },
  },
  mounted() {
    //图片加载完再计算高度
    const refresh = this.debounce(this.$refs.scroll.refresh, 20000);
    this.ItemImgLister = () => {
      refresh();
    };
    this.$bus.$on("itemLoad", this.ItemImgLister);
  },
  destroyed() {
    this.$bus.$off("itemload", this.ItemImgLister);
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
</style>