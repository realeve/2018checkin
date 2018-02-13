import Vue from "vue";
import Router from "vue-router";
import Info from "@/components/Info";
import Message from "@/components/Message";
import CheckList from "@/components/CheckList";
import ErrList from "@/components/ErrList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Message
    },
    {
      path: "/info",
      component: Info
    },
    {
      path: "/list",
      component: CheckList
    },
    {
      path: "/listerr",
      component: ErrList
    }
  ]
});
