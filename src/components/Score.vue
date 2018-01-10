<template>
  <div>
    <x-header></x-header>
    <div class="content">
      <p class="info"> 票数汇总 </p>
      <p class="desc"> 你所投的{{voteNum.length}}位{{sport.name}}截止目前总票数如下 </p>
      <p class="desc" v-if="isAdmin">信息填写:{{countInfo.address}}/{{countInfo.alls}}</p>
      <p class="desc" v-if="isAdmin">投票情况:{{prizeInfo.four}}人选对{{sport.allTickets-1}}题，{{prizeInfo.five}}人选对{{sport.allTickets}}题</p>
    </div>
    <group>
      <cell v-for="(user,i) in voteNum" :title="user.name" :value="user.voteNums+' 票'" :key="i"></cell>
    </group>

    <div class="content">
      <p class="info"> 各地区票数汇总 </p>
    </div>
    <group>
      <cell v-for="(item,i) in provInfo" :title="item.prov" :value="item.num+' 票'" :key="i"></cell>
    </group>
  </div>
</template>

<script>
import XHeader from "./Header";
import { Cell, Group, Toast } from "vux";
import util from "../js/common";

import { mapState } from "vuex";
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Toast
  },
  data() {
    return {
      voteNum: [],
      countInfo: {
        alls: "",
        address: ""
      },
      prizeInfo: {
        four: "",
        five: ""
      },
      provInfo: ""
    };
  },
  computed: {
    ...mapState(["cdnUrl", "sport"]),
    openid() {
      return util.getUrlParam("openid");
    },
    token() {
      return util.getUrlParam("token");
    },
    from() {
      return util.getUrlParam("from");
    },
    isAdmin() {
      return (
        this.openid == "o2es2uCcXn8RupbwkTGXOZqJapvE" ||
        this.openid == "oB_zQvjolaubMIMoUYO26DuJosWo" ||
        this.openid == "oB_zQvk2XR52x8-tlVjFn569HQ-M" ||
        this.openid == "o2es2uLlgRNjVmE7NFUYXKutN5vw"
      );
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
    getVoteNums() {
      let url = this.cdnUrl;

      let params = {
        token: this.token,
        openid: this.openid,
        s: "/addon/GoodVoice/GoodVoice/getArtisanVotes"
      };
      if (this.isAdmin) {
        params = {};
      }
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          if (!res.ok) {
            this.showToast({
              text: "票数获取失败",
              type: "warn"
            });
            return;
          }
          this.voteNum = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCountInfo() {
      let url = this.cdnUrl + "?s=/addon/GoodVoice/GoodVoice/countVoteInfo";

      this.$http
        .jsonp(url)
        .then(res => {
          this.countInfo = res.data[0];
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPrizeInfo() {
      let url = this.cdnUrl + "?s=/addon/GoodVoice/GoodVoice/countPrizeInfo";

      this.$http
        .jsonp(url)
        .then(res => {
          this.prizeInfo = res.data[0];
        })
        .catch(e => {
          console.log(e);
        });
    },
    getVoteByProv() {
      let url = this.cdnUrl + "?s=/addon/GoodVoice/GoodVoice/countVoteByProv";

      this.$http
        .jsonp(url)
        .then(res => {
          this.provInfo = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    if (this.token == null || this.openid == null || this.from != null) {
      this.$router.push("/follow");
      return;
    }
    this.getVoteNums();
    if (this.isAdmin) {
      this.getCountInfo();
      this.getPrizeInfo();
      this.getVoteByProv();
    }
  }
};
</script>

<style scoped lang="less">
.content {
  padding: 15px;
  padding-top: 10px;
  .info {
    display: flex;
    justify-content: center;
    font-size: 20px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
  }
  .desc {
    padding-top: 5px;
    color: #636563;
    font-size: 14px;
  }
}
</style>
