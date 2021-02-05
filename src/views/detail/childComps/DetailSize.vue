<template>
  <div class="size" v-if="Object.keys(itemParams).length !== 0">
    <div class="info-size">
      <table v-for="(table, index) in itemParams.size" :key="index">
        <tr v-for="(tr, indez) in table" :key="indez">
          <td v-for="(td, indec) in tr" :key="indec">{{ td }}</td>
        </tr>
      </table>
      <table class="info-param">
        <tr v-for="(info, index) in itemParams.set" :key="index">
          <td class="info-param-key">{{ info.key }}</td>
          <td class="info-param-value">{{ info.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.size {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.info-size table {
  width: 100%;
  border-collapse: collapse;
}
.info-size table tr {
  height: 42px;
}
.info-size table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}
.info-param {
  border-top: 1px solid rgb(46, 28, 28);
}
.info-param-value {
  color: #eb4868;
}
</style>