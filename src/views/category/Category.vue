<template>
  <div class="wrapper" ref="aaa">
    <ul>
      <button @click="btnClick">点击事件</button>
      <li>代码1</li>
      <li>代码2</li>
      <li>代码3</li>
      <li>代码4</li>
      <li>代码5</li>
      <li>代码6</li>
      <li>代码7</li>
      <li>代码8</li>
      <li>代码9</li>
      <li>代码10</li>
      <li>代码11</li>
      <li>代码12</li>
      <li>代码13</li>
      <li>代码14</li>
      <li>代码15</li>
      <li>代码16</li>
      <li>代码17</li>
      <li>代码18</li>
      <li>代码19</li>
      <li>代码20</li>
      <li>代码21</li>
      <li>代码22</li>
      <li>代码23</li>
      <li>代码24</li>
      <li>代码25</li>
      <li>代码26</li>
      <li>代码27</li>
      <li>代码28</li>
      <li>代码29</li>
      <li>代码30</li>
      <li>代码31</li>
      <li>代码32</li>
      <li>代码33</li>
      <li>代码34</li>
      <li>代码35</li>
      <li>代码36</li>
      <li>代码37</li>
      <li>代码38</li>
      <li>代码39</li>
      <li>代码40</li>
      <li>代码41</li>
      <li>代码42</li>
      <li>代码43</li>
      <li>代码44</li>
      <li>代码45</li>
      <li>代码46</li>
      <li>代码47</li>
      <li>代码48</li>
      <li>代码49</li>
      <li>代码50</li>
      <li>代码51</li>
      <li>代码52</li>
      <li>代码53</li>
      <li>代码54</li>
      <li>代码55</li>
      <li>代码56</li>
      <li>代码57</li>
      <li>代码58</li>
      <li>代码59</li>
      <li>代码60</li>
      <li>代码61</li>
      <li>代码62</li>
      <li>代码63</li>
      <li>代码64</li>
      <li>代码65</li>
      <li>代码66</li>
      <li>代码67</li>
      <li>代码68</li>
      <li>代码69</li>
      <li>代码70</li>
      <li>代码71</li>
      <li>代码72</li>
      <li>代码73</li>
      <li>代码74</li>
      <li>代码75</li>
      <li>代码76</li>
      <li>代码77</li>
      <li>代码78</li>
      <li>代码79</li>
      <li>代码80</li>
      <li>代码81</li>
      <li>代码82</li>
      <li>代码83</li>
      <li>代码84</li>
      <li>代码85</li>
      <li>代码86</li>
      <li>代码87</li>
      <li>代码88</li>
      <li>代码89</li>
      <li>代码90</li>
      <li>代码91</li>
      <li>代码92</li>
      <li>代码93</li>
      <li>代码94</li>
      <li>代码95</li>
      <li>代码96</li>
      <li>代码97</li>
      <li>代码98</li>
      <li>代码99</li>
      <li>代码100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      sroce: null,
    };
  },
  mounted() {
    console.log(this.$refs.aaa);
    this.sroce = new BScroll(this.$refs.aaa, {
      probeType: 3,
      pullUpLoad: true,
    });
    this.sroce.on("scroll", (position) => {
      /*  console.log(position); */
    });
    this.sroce.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
  /* created() {
    new BScroll(".content", {});
  }, */
  methods: {
    btnClick() {
      console.log("点击一下就特别棒");
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  /*  overflow-y: scroll; */
}
</style>