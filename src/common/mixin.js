export const itemListenerMixin ={
        debounce(func, delay) {
            let timer = null;
            return function (...args) {
              if (timer) clearTimeout(timer);
              timer = setTimeout(() => {
                func.apply(this, args);
              }, delay);
            };
          },
          data(){
            return {
                ItemImgLister: null,
            }
          },
    
    mounted(){
        const refresh = this.debounce(this.$refs.scroll.refresh, 200);
        this.ItemImgLister = () => {
          refresh();
        };
        this.$bus.$on("itemimageLoad", this.ItemImgLister);
       /*  console.log("我是混入中的内容"); */
    }
}
export const backtopMixin ={
    data(){
      return{
        isShow:false
      }
    },
    methods:{
     
      backTop(){
        this.$refs.scroll.scrollTo(0, 0, 500);
      }
      
    }
}