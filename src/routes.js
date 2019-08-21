import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/index';
import Signin from './components/Signin/index'
import Dashboard from './components/Dashboard/index'
import MainDashboard from './components/Dashboard/main'
import AddPosts from './components/Dashboard/addPosts'
import PostsList from './components/Dashboard/listPosts'
import Post from './components/Post/post'

import store from './Store/store'
Vue.use(VueRouter);

const authGuard = {
    beforeEnter:(to, from, next) => {

        const redirect = () => {
            if(store.state.admin.token){
                if (to.path === '/signin') {
                    next('/dashboard')
                } else {
                    next()
                }
            } else {
                if (to.path === '/signin') {
                    next()
                } else{
                    next('/')
                }
            }
        }

        if(store.state.admin.refreshLoading){
            store.watch((state, getters) => getters['admin/refreshLoading'], ()=>{
                redirect();
            })
        } else {
            redirect();
        }
    }
}

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path:'/signin',
        component: Signin,
        ...authGuard
    },
    {
        path:'/dashboard',
        component: Dashboard,
        children:[
            {
                path: '/',
                component: MainDashboard,
            },
            {
                path: 'add_posts',
                component: AddPosts,
            },
            {
                path: 'list_posts',
                component: PostsList,
            },
        ],
        ...authGuard
    },
    {
        path: '/post/:id',
        component: Post,
    },
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return{
            x:0,
            y:0
        }
    }
})