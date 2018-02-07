import Vue from "vue";
import Router from "vue-router";
import Info from "@/components/Info";
import Message from "@/components/Message";
Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            component: Message
        },
        {
            path: "/info",
            component: Info
        }
    ]
});