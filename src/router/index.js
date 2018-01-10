import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Info from '@/components/Info'
import Follow from '@/components/Follow'
import Score from '@/components/Score'
import Message from '@/components/Message'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Home
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/info',
        component: Info
    }, {
        path: '/follow',
        component: Follow
    }, {
        path: '/score',
        component: Score
    }, {
        path: '/message',
        component: Message
    }]
})