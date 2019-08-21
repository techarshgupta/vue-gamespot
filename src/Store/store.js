import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import admin from './Modules/admin'
import posts from './Modules/posts'

export default new Vuex.Store({
    modules:{
        admin,
        posts,
    }
})