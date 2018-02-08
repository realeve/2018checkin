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
  mounted() {
    let url = this.$store.state.cdnUrl;
    let params = {
      s: "/addon/Api/Api/checkinCount"
    };
    this.$http
      .jsonp(url, {
        params
      })
      .then(res => {
        const data = res.data;
        this.checkCount = data[0].nums;
      });
  }
};
</script>
