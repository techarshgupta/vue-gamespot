<template>
    <header>
        <div class="container header_container">
            <div class="logo">
                <router-link to="/">
                    Gamespot
                </router-link>
            </div>
            <div class="login" v-if="!isAuth">
                <router-link to="/signin">
                    <img :src="require('../../assets/images/login.png')" alt="login logo">
                </router-link>
            </div>
            <div v-if="isAuth">
                <ul>
                    <li><span @click="logoutUser">logout</span></li>
                    <li><router-link to="/dashboard">Dashboard</router-link></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
        computed:{
            isAuth(){
                return this.$store.getters['admin/isAuth']
            }
        },
        methods:{
            logoutUser(){
                this.$store.commit('admin/logoutUser')
            }
        }
    }
</script>

<style scoped>

</style>