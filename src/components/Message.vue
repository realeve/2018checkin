<template>
  <div class="main">
    <div class="content">
      <div v-if="showScribe">
        <msg title="中国印钞造币" description="请先长按二维码关注公众号后参加活动。" icon="warn"></msg>
        <img src="../assets/qrcode.jpg" style="width:100%;display:block;">
      </div>
      <template v-else>
        <msg v-if="hideMessage&&hide" title="获取身份中" description="正在获取用户唯一身份信息，请稍后。" icon="waiting"></msg>
        <template v-else>
          <msg v-if="isSuccess" :title="title" :description="desc" icon="success"></msg>
          <msg v-else :title="title" :description="errInfo" icon="warn"></msg>
        </template>
      </template>
    </div>
    <x-footer/>
  </div>
</template>

<script>
import util from "../js/common";
import * as db from "../js/db";

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
      startDay: "2018年4月17日",
      title: "签到成功",
      isSuccess: true,
      errInfo: "",
      isShareLink: window.location.href.indexOf("from=") > -1,
      showScribe: false,
      hide: true
    };
  },
  computed: {
    desc() {
      return `自${this.startDay}起你已签到${
        this.day
      }次，今日已成功签到，谢谢你的坚持。`;
    },
    ...mapState(["userInfo", "cdnUrl", "sport"]),
    hideMessage() {
      const status =
        typeof this.userInfo.openid == "undefined" ||
        this.userInfo.openid == "";
      return status;
    }
  },
  watch: {
    "userInfo.openid"(val) {
      this.checkIn();
    }
  },
  methods: {
    isScribe: async function() {
      if (this.hideMessage) {
        return;
      }
      let res = await db.getUnId(this.userInfo.openid);
      const data = res.data;
      if (!data.subscribe == 1) {
        this.showScribe = true;
        return;
      }
      this.checkIn();
    },
    checkIn: async function() {
      let ip = await db.getIP();
      if (this.hideMessage) {
        return;
      }
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
        headimgurl: this.userInfo.headimgurl,
        ip
      };
      let { data } = await db.isNeedCheckin(this.userInfo.openid).catch(e => {
        this.title = "签到失败";
        this.errInfo = "签到失败，请稍后重试";
        this.isSuccess = false;
      });

      if (data.length == 0) {
        // insert;
        params.check_count = 1;
        params.rec_date = util.getNow();
        db.addCbpmCheckin(params);
        this.title = "签到成功";
        this.day = 1;
        return;
      }

      let { needvote, check_count } = data[0];
      if (needvote == 0) {
        this.title = "今日已签到";
        this.day = check_count;
        return;
      }
      db.setCbpmCheckin({
        ip,
        rec_date: util.getNow(),
        check_count: check_count + 1,
        openid: this.userInfo.openid
      });
      this.day = check_count + 1;
      this.title = "签到成功";
    },
    updating() {
      this.hide = false;
      this.isSuccess = false;
      this.title = "升级中...";
      this.errInfo = "系统升级中，预计于9:40分完成，请稍后重试";
    }
  },
  mounted() {
    // this.updating();
    // return;
    if (this.isShareLink) {
      this.isScribe();
    } else {
      this.checkIn();
    }
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
