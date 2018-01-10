<template>
  <div class="header">
    <img class="logo" src="../assets/header2.jpg">
    <div class="title">
      <h3>{{ msg }}</h3>
      <h4 class="subtitle">{{ company }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "2017年行业“十件大事”评比候选事件",
      company: "(排名不分先后)"
    };
  }
};
</script>
<style scoped lang="less">
.header {
  text-align: center;
  margin-bottom: 70px;
  .title {
    h3,
    h4 {
      font-weight: 200;
    }
    margin-top: -120px;
    color: #fff;
    margin-bottom: 40px;
    .subtitle {
      padding-top: 10px;
    }
  }
  .logo {
    width: 100%;
    height: 100%;
  }
}
</style>
