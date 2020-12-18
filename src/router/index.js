import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Scraper from '../components/Scraper'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate)

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: HelloWorld,
        props: true
    },
    {
        path: '/scraper',
        component: Scraper,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router