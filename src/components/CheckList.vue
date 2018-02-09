<template>
  <div class="main">
    <div class="title">
      <h1>中国印钞造币每日微信签到用户列表</h1>
      <h3>当前签到总人数:{{totalItem}}<br>(数据缓存：5分钟)</h3>
      <div class="search-box">
        <el-input style="width:200px;" clearable size="medium" placeholder="昵称搜索" prefix-icon="el-icon-search" v-model="filterName"/>
      </div>
    </div>
    <el-table :data="userList" style="width: 100%" stripe height="80vh" v-loading="loading">
      <el-table-column prop="idx" label="序号">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称">
      </el-table-column>
      <el-table-column prop="headimgurl" label="头像" width="120">
        <template slot-scope="scope">
          <div class="header-wrapper">
            <img class="header" :src="scope.row.headimgurl" :alt="scope.row.nickname">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="province" label="省">
      </el-table-column>
      <el-table-column prop="city" label="市">
      </el-table-column>
      <el-table-column prop="check_count" label="签到次数">
      </el-table-column>
      <el-table-column prop="rec_date" label="签到时间">
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="handleCurrentChange" :current-page.sync="curPage" layout="prev, pager, next" :total="totalItem" :page-size="500" class="margin-top-20 margin-bottom-20">
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
      userList: [],
      filterName: ""
    };
  },
  watch:{
    filterName(){
      this.searchUser()
    }
  },
  computed: {
    ...mapState(["cdnUrl", "sport"])
  },
  methods: {
    init() {
      let url = this.cdnUrl;
      let params = {
        s: "/addon/Api/Api/checkinList",
        sid: this.sport.id,
        page: this.curPage
      };
      this.loading = true;
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          this.totalItem = res.data.length;
          this.checkinList = res.data.map((item, idx) => {
            item.sex = item.sex == 0 ? "未知" : item.sex == 1 ? "男" : "女";
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
    searchUser(){
      if(this.filterName.length>0){
        this.userList = this.checkinList.filter(item=>item.nickname.includes(this.filterName));
      }else{
        this.handleCurrentChange();
      }      
    },
    handleCurrentChange() {
      const start = 500 * (this.curPage - 1);
      this.userList = this.checkinList.slice(start, start + 500);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
@headerSize: 80px;

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  .header-wrapper {
    position: relative;
    width: @headerSize+6;
    height: @headerSize+6;
    padding: 6px;
    background: #fff;
    background: rgba(43, 41, 41, 0.2);
    border-radius: 50%;
  }
  .header {
    width: @headerSize;
    height: @headerSize;
    border-radius: 50%;
    margin: -3px 0 0 -3px;
  }
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
  .search-box {
    float: right;
    margin-top: -40px;
  }
  background: #fff;
}
</style>
