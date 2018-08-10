<template>
  <footer :style="{color}">
    <p v-show="checkCount">当前共签到{{checkCount}}次.</p> {{year}} &copy; 中国印钞造币总公司
  </footer>
</template>
<style lang="less" scoped>
footer {
  padding-bottom: 10px;
  font-size: 14px;
  text-align: center;
}
</style>
<script>
import * as db from "../js/db";
export default {
  data() {
    return {
      checkCount: 0
    };
  },
  computed: {
    year() {
      let date = new Date();
      return date.getFullYear();
    }
  },
  props: {
    color: {
      default: "#999"
    }
  },
  mounted: async function() {
    let { data } = await db.getCbpmCheckin();
    this.checkCount = data[0].nums;
  }
};
</script>
