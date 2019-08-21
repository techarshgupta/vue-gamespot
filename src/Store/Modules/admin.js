import Vue from 'vue';
import router from '../../routes'

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyDlfYUsE7xUfsRf_dC1Fwxzk_DEEu0Cj1I";

const admin = {
    namespaced:true,
    state:{
        token: null,
        refresh: null,
        authFailed: false,
        refreshLoading: true,
        addPost: false,
        imageUpload: null,
        adminPosts: null
    },
    getters:{
        isAuth(state){
            if(state.token){
                return true
            }
            return false
        },
        refreshLoading(state) {
            return state.refreshLoading
        },
        addPostStatus(state){
            return state.addPost
        },
        imageUpload(state){
            return state.imageUpload
        },
        getAdminPosts(state){
            return state.adminPosts
        }
    },
    mutations:{
        authUser(state, authData){
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;

            if( authData.type === 'signin'){
                router.push('/dashboard')
            }
        },
        authFailed(state, type){
            if(type === 'reset'){
                state.authFailed = false
            } else {
                state.authFailed = true
            }
        },
        logoutUser(state){
            state.token = null;
            state.token = null;

            localStorage.removeItem("token");
            localStorage.removeItem("refresh");

            router.push('/');
        },
        refreshLoading(state){
            state.refreshLoading = false;
        },
        addPost(state){
            state.addPost = true
        },
        clearAddPost(state){
            state.addPost = false
        },
        imageUpload(state, imageData){
            state.imageUpload = imageData.secure_url
        },
        clearImageUpload(state){
            state.imageUpload = null
        },
        getAdminPosts(state, posts){
            state.adminPosts = posts
        }
    },
    actions:{
        signin({commit}, payload) {
            Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`, {
                ...payload,
                returnSecureToken: true
            })
                .then(response => response.json())
                .then(authData => {
                    commit("authUser", {
                        ...authData,
                        type: 'signin'
                    });
                    localStorage.setItem("token", authData.idToken);
                    localStorage.setItem("refresh", authData.refreshToken);
                })
                .catch( error => {
                    commit("authFailed")
                })
        },
        refreshToken({commit}){
            const refreshToken = localStorage.getItem("refresh");
            if(refreshToken){
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`, {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                .then( response => response.json())
                .then( authData => {
                    commit("authUser",{
                        idToken: authData.id_token,
                        refreshToken: authData.refresh_token,
                        type: 'refresh'
                    });

                    commit("refreshLoading")

                    localStorage.setItem("token", authData.id_token);
                    localStorage.setItem("refresh", authData.refresh_token);
                });
            } else{
                commit("refreshLoading")
            }
        },
        addPost({ commit, state }, payload){
            Vue.http.post(`posts.json?auth=${state.token}`, payload)
                .then( response => response.json())
                .then( response => {
                    commit("addPost")
                    setTimeout(()=>{
                        commit("clearAddPost")
                    },3000)
                })
        },
        imageUpload({commit}, file){
            const Cloudnary_url = 'https://api.cloudinary.com/v1_1/df3zh9wwd/image/upload';
            const Cloudnary_Preset = 'kbopkwpl';

            let formdata = new FormData();

            formdata.append('file', file);
            formdata.append('upload_preset', Cloudnary_Preset);

            Vue.http.post(Cloudnary_url, formdata, {
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                }
            })
                .then( response => response.json())
                .then( response => {
                    commit("imageUpload", response)
                    //console.log(response)
                })
        },
        getAdminPosts({commit}){
            Vue.http.get('posts.json')
                .then( response => response.json())
                .then( response => {
                    const posts = [];
                    for(let key in response){
                        posts.push({
                            ...response[key],
                            id:key
                        })
                    }
                    commit("getAdminPosts", posts.reverse())
                })
        },
        deletePost({commit}, payload){
            Vue.http.delete(`posts/${payload}.json?auth${state.token}`)
                .then( response =>{
                    console.log(response)
                })
        }
    }
};

export default admin;