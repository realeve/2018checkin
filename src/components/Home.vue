<template>
  <div>
    <x-header></x-header>
    <toast v-model="toast.show" :type="toast.type">{{ toast.text }}</toast>
    <div class="vote" v-for="(item,i) in checkList" :key="item.id">
      <sticky :check-sticky-support="true">
        <p class="title">{{item.id}}.{{item.title}}</p>
      </sticky>

      <card>
        <div slot="content" class="card-content">
          <p class="desc">{{item.content}}
          </p>
          <x-switch :inline-desc="maxnum+'/'+ sport.maxTickets" :title="'投它一票'" v-model="valueList[i]" @on-change="checkMaxVotes(i)"></x-switch>
        </div>
      </card>
    </div>

    <div class="submit">
      <x-button :disabled="maxnum!=sport.maxTickets" @click.native="submit" type="primary">提交数据</x-button>
    </div>
  </div>

</template>

<script>
import {
  Sticky,
  Group,
  Cell,
  Card,
  Divider,
  XSwitch,
  Toast,
  XButton
} from "vux";

import XHeader from "./Header";
import checkList from "../js/checkList";
import util from "../js/common";

import { mapState } from "vuex";
export default {
  components: {
    Sticky,
    Group,
    Cell,
    Divider,
    Card,
    XSwitch,
    Toast,
    XButton,
    XHeader
  },
  data() {
    return {
      valueList: [],
      toast: {
        show: false,
        text: "",
        type: ""
      },
      voteNum: [],
      checkList
    };
  },
  computed: {
    ...mapState(["cdnUrl", "sport"]),
    maxnum() {
      let count = this.valueList.filter(item => item);
      return count.length;
    },
    openid() {
      return util.getUrlParam("openid");
    },
    token() {
      return util.getUrlParam("token");
    },
    signature() {
      return util.getUrlParam("signature");
    },
    time() {
      return util.getUrlParam("timestamp");
    },
    from() {
      return util.getUrlParam("from");
    },
    curTimeStamp() {
      return (new Date().getTime() / 1000).toFixed(0);
    }
  },
  methods: {
    showToast(settings) {
      this.toast.text = settings.text;
      this.toast.type = settings.type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, 1500);
    },
    checkMaxVotes(i) {
      if (this.maxnum > this.sport.maxTickets) {
        this.showToast({
          text: "请勿超过" + this.sport.maxTickets + "票",
          type: "warn"
        });
      }
    },
    submit() {
      let artisanList = [];
      let now = util.getNow();
      let addStr = [];
      this.valueList.forEach((item, i) => {
        if (item) {
          artisanList.push(`('${this.token}','${this.openid}',${i},'${now}')`);
          addStr.push(i);
        }
      });

      let params = {
        openid: this.openid,
        token: this.token,
        valstr: artisanList.join(","),
        addstr: addStr.join(","),
        timestamp: this.time,
        signature: this.signature,
        s: "/addon/GoodVoice/GoodVoice/addArtisanInfo"
      };

      let url = this.cdnUrl;
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          if (!res.ok) {
            this.showToast({
              text: "数据提交失败",
              type: "warn"
            });
            return;
          }
          var data = res.data;
          if (data.status > "0") {
            this.showToast({
              text: data.title,
              type: "success"
            });
            // 跳转提交用户信息
            setTimeout(() => {
              this.$router.push("/info");
            }, 500);
          } else {
            this.showToast({
              text: data.title,
              type: "warn"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getStep() {
      let url = this.cdnUrl;
      let params = {
        s: "/addon/GoodVoice/GoodVoice/isSetUserInfo",
        openid: this.openid,
        token: this.token
      };
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          var data = res.data;
          if (data.status >= 1) {
            this.$router.push("/info");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    auth() {
      if (
        this.curTimeStamp - this.time > 600 ||
        this.curTimeStamp == null ||
        this.signature == null
      ) {
        this.checkList = [];
        this.$router.push("/message");
        return false;
      }
      //
      if (
        this.token == null ||
        this.openid == null ||
        !util.isWeiXin() ||
        this.from != null
      ) {
        this.$router.push("/follow");
        return false;
      }
      return true;
    },
    init() {
      if (!this.$store.state.isDebug) {
        let passed = this.auth();
        if (!passed) {
          return;
        }
      }
      this.getStep();
      this.valueList = checkList.map(item => false);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.title {
  color: #444;
  font-size: 22px;
  font-weight: 500;
  text-align: left;
  padding: 0 15px;
}
.vux-sticky {
  .title {
    background: rgba(255, 255, 255, 0.9);
    border-bottom: 8px solid #fdfdfd;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  }
}
.card-content {
  margin: 10px 15px 20px 15px;
  .desc {
    padding-top: 15px;
    font-size: 18px;
    line-height: 1.5em;
    text-indent: 2.3em;
    letter-spacing: 0.15em;
    text-align: left;
  }
}

.vote {
  margin-bottom: 25px;
  // .vux-divider {
  //   font-size: 24px;
  //   color: #333;
  //   line-height: 0;
  //   background: rgba(248, 248, 248, 0.9);
  //   height: 30px;
  //   display: flex;
  //   align-items: center;
  // }
}

.submit {
  margin: 10px 15px 25px 15px;
}
</style>
