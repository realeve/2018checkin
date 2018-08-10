// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/index";

import store from "./store";

import {
    WechatPlugin,
    ToastPlugin
} from "vux";
Vue.use(WechatPlugin);

Vue.use(ToastPlugin);

// let VueTouch = require("vue-touch");
// Vue.use(VueTouch, { name: "v-touch" });

router.beforeEach(function(to, from, next) {
    store.commit("updateLoadingStatus", {
        isLoading: true
    });
    next();
});

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

import util from "./js/common";
import * as db from './js/db';

Vue.config.errorHandler = function(e, vm, info) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    const state = vm.$store.state;

    let err = util.handleErr(e);
    err = Object.assign(err, {
        hook: info,
        remark: JSON.stringify(state)
    });

    if (err.err_url.indexOf("localhost") > -1) {
        throw (e)
        return;
    }
    const params = Object.assign({}, err, {
        network_type: state.network_type,
        ip: ''
    });
    console.log(params);
    db.addCommonErrorLog(params);
    throw (e)
};

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app-box");