<template>
  <div class="wrapper">
    <div class="content">
      <p class="title">
        {{sport.name}}活动</p>
      <p class="desc">
        2017年是行业转型发展的攻坚之年，也是全面落实“十三五”规划的关键之年。一年来，在总公司董事会、党委经理部的领导下，全行业围绕转型发展核心使命，凝心聚力、砥砺前行，奋力推进各项工作迈上新台阶，取得了一系列令人振奋的成绩。
      </p>
      <p class="desc">
        为全面展示2017年行业发展的新变化、新成就、新风尚，进一步激发广大干部职工的荣誉感和使命感，激励全行业上下同心、携手奋进实现“中钞梦”，总公司决定开展2017年行业“十件大事”评选活动。
      </p>
      <div class="margin-top-20 time">
        活动时间：{{year}}年{{sport.timeRange}}
      </div>
      <div class="btn-wrapper margin-top-60">
        <div class="weui-btn weui-btn_default" @click="jump('home')">开始评价</div>
      </div>
    </div>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
    <div class="canvas" id="home"></div>
    <x-footer color="#f3d713" />
  </div>
</template>
<script>
import particles from "particles.js";
import particlesSetting from "../js/particlesSetting";

import XFooter from "./Footer";
import { XButton, Toast } from "vux";
import { mapState } from "vuex";

export default {
  components: {
    XButton,
    Toast,
    XFooter
  },
  data() {
    return {
      toast: {
        show: false,
        msg: ""
      }
    };
  },
  computed: {
    ...mapState(["cdnUrl"]),
    year() {
      let date = new Date();
      return date.getFullYear();
    },
    sport: {
      get() {
        return this.$store.state.sport;
      },
      set(val) {
        this.$store.commit("setSport", val);
      }
    }
  },
  methods: {
    jump(router) {
      var video = document.querySelector("#mainvideo");
      // video.play();
      // video.pause();
      this.$router.push(router);
    }
  },
  mounted() {
    particlesJS("home", particlesSetting);
    document.title = this.sport.name;
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #e33e3e;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 13pt;
  color: #fff;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
  .title {
    font-size: 20pt;
    text-align: center;
    margin-top: 20px;
  }
  .desc {
    padding: 15px;
    text-indent: 2em;
  }
  .time {
    font-size: 11pt;
  }
  .btn-wrapper {
    width: 80%;
    font-size: 10pt;
    p {
      padding-bottom: 10px;
    }
  }
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.weui-btn_default {
  background: transparent;
  color: #fafafa;
}

.weui-btn:after {
  border-color: rgba(255, 255, 255, 0.5);
}

.slogan {
  padding-top: 15px;
  font-size: 15pt;
  color: #f3d713;
}
</style>
