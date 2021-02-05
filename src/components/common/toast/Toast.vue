<template>
  <div class="toast" v-show="show">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, durcuit) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, durcuit);
    },
  },
};
</script>

<style scoped>
.toast {
  background-color: rgba(0, 0, 0, 0.75);
  font-size: 15px;
  transform: translate(-50%);
  color: aliceblue;
  position: fixed;
  top: 50%;
  left: 50%;

  z-index: 9;
}
</style>