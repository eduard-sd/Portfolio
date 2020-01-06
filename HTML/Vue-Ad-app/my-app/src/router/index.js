import Vue from 'vue'
import VueRouter  from 'vue-router'
import Home from '@/components/Home.vue'
import Ad from '@/components/Ads/Ad.vue'
import AdList from '@/components/Ads/AdList.vue'
import NewAd from './../components/Ads/NewAd.vue'
import Login from './../components/Auth/Login'
import Registration from './../components/Auth/Registration.vue'
import Orders from './../components/User/Orders.vue'

Vue.use(VueRouter );

export default new VueRouter ({
    routes: [
        {
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/ad/:id',
            name: 'ad',
            component: Ad
        },
        {
            path: '/list',
            name: 'list',
            component: AdList
        },
        {
            path: '/new',
            name: 'newAd',
            component: NewAd
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders
        },
    ],
    mode: 'history'
})