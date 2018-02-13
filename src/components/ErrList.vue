<template>
  <div class="main">
    <div class="title">
      <h1>错误信息统计调试</h1>
    </div>
    <el-table :data="errList" style="width: 100%" stripe height="80vh" v-loading="loading">
      <el-table-column prop="idx" align="left" label="序号">
      </el-table-column>
      <el-table-column prop="err_url" align="left" label="链接">
      </el-table-column>
      <el-table-column label="错误描述" align="left" width="500">
        <template slot-scope="scope">
          <div v-html="scope.row.err_desc"></div>
        </template>
      </el-table-column>
      <el-table-column prop="network_type" align="left" label="网络类型">
      </el-table-column>
      <el-table-column prop="device_platform" align="left" label="手机类型">
      </el-table-column>
      <el-table-column prop="device_user_agent" align="left" label="浏览器版本">
      </el-table-column>
      <el-table-column prop="device_app_version" align="left" label="微信版本信息">
      </el-table-column>
      <el-table-column prop="rec_time" align="left" label="记录时间">
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="handleCurrentChange" :current-page.sync="curPage" layout="prev, pager, next" :total="totalItem" :page-size="30" class="margin-top-20 margin-bottom-20">
    </el-pagination>
    <x-footer/>
  </div>
</template>

<script>
import util from "../js/common";
import XFooter from "./Footer";

import { mapState } from "vuex";

export default {
  components: {
    XFooter
  },
  data() {
    return {
      checkinList: [],
      curPage: 1,
      totalItem: 0,
      loading: true,
      errList: []
    };
  },
  computed: {
    ...mapState(["cdnUrl"])
  },
  methods: {
    init() {
      let url = this.cdnUrl;
      let params = {
        s: "/addon/Api/Api/err_list"
      };
      this.loading = true;
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          this.totalItem = res.data.length;
          this.checkinList = res.data.map((item, idx) => {
            item.idx = idx + 1;
            return item;
          });
          this.handleCurrentChange();
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    handleCurrentChange() {
      const start = 30 * (this.curPage - 1);
      this.errList = this.checkinList.slice(start, start + 30);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .margin-bottom-20 {
    margin-bottom: 20px;
  }
  .margin-top-20 {
    margin-top: 20px;
  }
  background: #fff;
}
</style>
