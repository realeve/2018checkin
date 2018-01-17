<template>
  <div class="header">
    <img class="logo" src="../assets/header2.jpg">
    <div class="title">
      <h3>{{$store.state.sport.name}}评比</h3>
      <h4 class="subtitle">感谢您的参与</h4>
    </div>
  </div>
</template>

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
