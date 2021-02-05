<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="tabContrShow"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="moreLore"
    >
      <home-swiper :banner="banner" @imageLoad="imageLoad"></home-swiper>
      <home-recommend-view :recommend="recommend" />
      <featrue-view />
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="backTop"
        ref="tabControl"
      />
      <goods-list :goods="show"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>

<script>
//组件相关

import HomeSwiper from "./homecomponents/HomeSwiper.vue";
import HomeRecommendView from "./homecomponents/HomeRecommendView.vue";
import FeatrueView from "./homecomponents/FeatrueView.vue";

import Navbar from "../../components/common/navbar/Navbar.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";
//混入mixin
import { itemListenerMixin, backtopMixin } from "../../common/mixin";
//网络相关
import { getHomeMultidata, getHomeGoods } from "network/home";
import GoodsList from "../../components/content/goods/GoodsList";
export default {
  components: {
    Navbar,
    HomeSwiper,
    HomeRecommendView,
    FeatrueView,
    TabControl,
    Scroll,
    BackTop,
    GoodsList,
  },
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      /*  抽离isShow: false, */
      tabControloffset: 0,
      tabContrShow: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin, backtopMixin],
  //创建前调用
  created() {
    //请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听图片goodsitem里加载完
    //重新计算图标高度
    //哇，我一直以为是我代码问题，原来是/* 要重新计算图片高度啊，计算机要等图片加载完在计算高度
    //使用混入mixin
    /*  const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    this.ItemImgLister = () => {
      refresh();
    };
    this.$bus.$on("itemimageLoad", this.ItemImgLister);  */
  },
  //计算属性
  computed: {
    show() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    imageLoad() {
      this.tabControloffset = this.$refs.tabControl.$el.offsetTop;
    },
    /*
  方法相关
*/
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },

    /**
     * 回到顶部，backtop组件监听事件要加.native
     */
    /* 抽离 */
    /* backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }, */
    contentScroll(position) {
      //判读backtop
      this.isShow = -position.y > 1000;
      this.tabContrShow = -position.y > this.tabControloffset;
    },
    moreLore() {
      this.getHomeGoods(this.currentType);
    },
    activated() {
      //分类挑战到首页时回到原位
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.scroll.y;
      //取消全局事件监听
      this.$bus.$off("itemimageLoad", this.ItemImgLister);
    },
    /*
      网络相关
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成上拉加载更多 封装函数finishPullup到scroll里
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 原生js的滚动的定位 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
