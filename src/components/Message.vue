<template>
  <div class="main">
    <div class="content">
      <msg v-if="isSuccess" :title="title" :description="desc" icon="success"></msg>
      <msg v-else :title="title" :description="errInfo" icon="warn"></msg>
      <div>
        <label>测试信息：{{url}}</label>
      </div>
    </div>
    <x-footer/>
  </div>
</template>

<script>
import util from "../js/common";
import { Msg } from "vux";
import XFooter from "./Footer";

import { mapState } from "vuex";

export default {
  components: {
    Msg,
    XFooter
  },
  data() {
    return {
      day: "1",
      startDay: "2018年2月7日",
      url: "",
      title: "签到成功",
      isSuccess: true,
      errInfo: ""
    };
  },
  computed: {
    desc() {
      return `自${this.startDay}起，你已成功签到${this.day}天。`;
    },
    ...mapState(["userInfo", "cdnUrl", "sport"])
  },
  methods: {
    checkIn() {
      let url = this.cdnUrl;
      let params = {
        s: "/addon/Api/Api/checkIn",
        sid: this.sport.id,
        openid: this.userInfo.openid,
        nickname: this.userInfo.nickname,
        sex: this.userInfo.sex,
        city: this.userInfo.city,
        province: this.userInfo.province,
        country: this.userInfo.country,
        headimgurl: this.userInfo.headimgurl
      };
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          const data = res.data;
          this.day = data.check_count;
          this.title = data.msg;
          if (data.status == -1) {
            this.isSuccess = false;
            this.errInfo =
              `今日已签到，共签到${this.day}天，请明天再来。`;
          } else if (data.status == 0) {
            this.isSuccess = false;
            this.errInfo = "签到失败，请稍后重试";
          }
        })
        .catch(e => {
          this.title = "签到失败";
          this.errInfo = "签到失败，请稍后重试";
          this.isSuccess = false;
        });
    }
  },
  mounted() {
    this.checkIn();
    this.url = window.location.href;
  }
};
</script>

<style lang="less">
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  .content {
    .weui-msg__text-area {
      .weui-msg__title {
        color: #c1b39a;
        font-weight: bold;
        font-size: 17pt;
      }
      .weui-msg__desc {
        color: #c1b39a;
        font-size: 12pt;
      }
    }
    flex: 1;
  }
}
</style>
